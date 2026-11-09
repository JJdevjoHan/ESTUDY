package com.csit321G3.powertres.role.user.student.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.UserRepository;
import com.csit321G3.powertres.role.user.student.dto.StudentRequest;
import com.csit321G3.powertres.role.user.student.dto.StudentResponse;
import com.csit321G3.powertres.role.user.student.entity.StudentEntity;
import com.csit321G3.powertres.role.user.student.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository students;
    private final UserRepository users;

    public StudentService(StudentRepository students, UserRepository users) {
        this.students = students;
        this.users = users;
    }

    public List<StudentResponse> list() {
        return students.findAll().stream().map(this::toResponse).toList();
    }

    public StudentResponse get(Long studentId) {
        return toResponse(findStudent(studentId));
    }

    public StudentResponse getByUserId(Long userId) {
        UserProfile user = findUser(userId);
        StudentEntity student = students.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found for this user"));
        return toResponse(student);
    }

    public StudentResponse create(StudentRequest request) {
        if (request == null || request.userId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId is required");
        }
        validateStudentFields(request);

        UserProfile user = findUser(request.userId());
        if (students.findByUser(user).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This user is already a student");
        }

        StudentEntity student = new StudentEntity(user);
        applyFields(student, request);
        return toResponse(students.save(student));
    }

    public StudentResponse update(Long studentId, StudentRequest request) {
        StudentEntity student = findStudent(studentId);
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
        }
        validateProvidedFields(request);
        applyFields(student, request);
        return toResponse(students.save(student));
    }

    public void delete(Long studentId) {
        students.delete(findStudent(studentId));
    }

    private StudentEntity findStudent(Long studentId) {
        return students.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
    }

    private UserProfile findUser(Long userId) {
        return users.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private void validateStudentFields(StudentRequest request) {
        requireText(request.firstName(), "firstName");
        requireText(request.lastName(), "lastName");
        if (request.yearLevel() == null || request.yearLevel() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "yearLevel must be greater than zero");
        }
        requireText(request.section(), "section");
    }

    private void validateProvidedFields(StudentRequest request) {
        if (request.firstName() != null) {
            requireText(request.firstName(), "firstName");
        }
        if (request.lastName() != null) {
            requireText(request.lastName(), "lastName");
        }
        if (request.yearLevel() != null && request.yearLevel() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "yearLevel must be greater than zero");
        }
        if (request.section() != null) {
            requireText(request.section(), "section");
        }
    }

    private void applyFields(StudentEntity student, StudentRequest request) {
        if (request.firstName() != null) {
            student.setFirstName(request.firstName().trim());
        }
        if (request.lastName() != null) {
            student.setLastName(request.lastName().trim());
        }
        if (request.yearLevel() != null) {
            student.setYearLevel(request.yearLevel());
        }
        if (request.section() != null) {
            student.setSection(request.section().trim());
        }
    }

    private void requireText(String text, String field) {
        if (text == null || text.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " is required");
        }
    }

    private StudentResponse toResponse(StudentEntity student) {
        return new StudentResponse(
                student.getStudentId(),
                student.getUser().getUserID(),
                student.getFirstName(),
                student.getLastName(),
                student.getYearLevel(),
                student.getSection());
    }
}
