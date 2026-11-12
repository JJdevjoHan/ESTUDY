# CRUD for the rest of the ERD

Same layout as the user/role feature: one folder per feature, `Entity + Repository + Service + Controller`.
The request JSON is a `Request` record inside each Service.

```
common/      Rules (shared 400/404/409 checks)
subject/     Subject (id = subjectCode), Subtopic
diagnostic/  DiagnosticTest
assessment/  AssessmentAttempt, AssessmentDetail
material/    LearningMaterial, StudentMaterialLog
recheck/     RecheckRequest
feedback/    AIFeedback
user/        Student.java and Teacher.java REPLACE yours (only adds getStudentId/getTeacherId/getUser)
```

## Install
1. Copy `backend/src` over your `backend/src`.
2. Run `mvnw clean test`, then `mvnw spring-boot:run`. Tables are created from the entities.
3. Try `backend/api-requests-crud.http`.

| URL | List filters |
|---|---|
| /api/students | userId |
| /api/subjects | |
| /api/subtopics | subjectCode |
| /api/diagnostic-tests | subjectCode |
| /api/attempts | studentId, subjectCode, testId |
| /api/attempt-details | attemptId, subtopicId |
| /api/materials | subtopicId |
| /api/material-logs | studentId, materialId |
| /api/rechecks | studentId, attemptId, teacherId |
| /api/ai-feedback | studentId, attemptId |

## Rules
- Create requires the fields marked required in the entity; PUT only changes the fields you send.
- Related records are sent as IDs (`studentId`, `subjectCode`, ...). Unknown ID -> 404.
- Allowed values: attempt `status` COMPLETED/INCOMPLETE; recheck `status` PENDING/APPROVED/REJECTED; material `contentType` VIDEO/DOCUMENT/QUIZ.
- Dates default to now when omitted. Deleting a record that others still reference returns 409.
- Still open: login protection (Spring Security), and the recheck "approve updates the score" logic.
