package com.csit321G3.powertres.role.user.teacher.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.csit321G3.powertres.role.user.UserProfile;
import com.csit321G3.powertres.role.user.UserRepository;
import com.csit321G3.powertres.role.user.teacher.dto.TeacherRequest;
import com.csit321G3.powertres.role.user.teacher.dto.TeacherResponse;
import com.csit321G3.powertres.role.user.teacher.entity.TeacherEntity;
import com.csit321G3.powertres.role.user.teacher.repository.TeacherRepository;

@Service
public class TeacherService {

    private final TeacherRepository teachers;
    private final UserRepository users;

    public TeacherService(TeacherRepository teachers, UserRepository users) {
        this.teachers = teachers;
        this.users = users;
    }

    // R - Read
    public List<TeacherResponse> list() {
        return teachers.findAll().stream().map(this::toResponse).toList();
    }

    public TeacherResponse get(Long teacherId) {
        return toResponse(findTeacher(teacherId));
    }

    public TeacherResponse getByUserId(Long userId) {
        UserProfile user = findUser(userId);
        TeacherEntity teacher = teachers.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Teacher not found for this user"));
        return toResponse(teacher);
    }

    // C - Create
    public TeacherResponse create(TeacherRequest request) {
        if (request == null || request.userId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId is required");
        }

        UserProfile user = findUser(request.userId());

        if (teachers.findByUser(user).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This user is already a teacher");
        }

        TeacherEntity teacher = new TeacherEntity(user);
        teacher.setDepartment(clean(request.department()));
        return toResponse(teachers.save(teacher));
    }

    // U - Update
    public TeacherResponse update(Long teacherId, TeacherRequest request) {
        TeacherEntity teacher = findTeacher(teacherId);
        teacher.setDepartment(clean(request == null ? null : request.department()));
        return toResponse(teachers.save(teacher));
    }

    // D - Delete
    public void delete(Long teacherId) {
        teachers.delete(findTeacher(teacherId));
    }

    // Helpers
    private TeacherEntity findTeacher(Long teacherId) {
        return teachers.findById(teacherId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Teacher not found"));
    }

    private UserProfile findUser(Long userId) {
        return users.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private String clean(String text) {
        if (text == null || text.isBlank()) {
            return null;
        }
        return text.trim();
    }

    private TeacherResponse toResponse(TeacherEntity teacher) {
        return new TeacherResponse(
                teacher.getTeacherId(),
                teacher.getUser().getUserID(),
                teacher.getDepartment());
    }
}