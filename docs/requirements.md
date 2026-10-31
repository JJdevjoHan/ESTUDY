# EStudy Project Documentation

## Purpose
EStudy helps students and teachers detect learning gaps early through personalized diagnostic tests, automated score calculations, and real-time performance tracking.

## Users & Roles
- **Student:** Takes diagnostic tests, views performance dashboards, accesses suggestive learning materials, submits grade re-check requests, and tracks personal study progress.
- **Teacher / Instructor:** Monitors student performance, reviews and resolves re-check requests, and manages learning resources.
- **Administrator:** Manages system configurations, user accounts, and overall role-based access control (RBAC).

---

## Functional Requirements (MoSCoW Prioritization)

### Must-Have Requirements

#### 1. Personalized Diagnostic Test
- Deliver tailored baseline assessments mapped to enrolled subjects and sub-topics.
- Accurately identify individual student strengths and initial knowledge gaps.
- Allow periodic retakes to measure improvement.

#### 2. Dashboard Diagnostic of Performance
- Provide a centralized visual interface combining scores from all assessment components.
- Display continuous trend graphs per subject.
- Automatically flag downward trends or low scores as specific learning gaps in real time.

#### 3. User Account and Role-Based Access
- Support secure login and registration.
- Provide segregated navigation and operational privileges for students, teachers, and administrators.

#### 4. Automatic Score Calculation
- Utilize an automated backend engine that computes raw scores.
- Convert raw scores into standardized percentage metrics across quizzes, activities, and major exams.

---

### Should-Have Requirements

#### 1. Suggestive Learning Materials
- Provide an automated recommendation feature linking curated study resources directly to flagged weak sub-topics.
- Let students mark materials as reviewed.
- Track score changes after review.

#### 2. Submit Re-Check Request
- Enable students to formally submit grade review requests accompanied by explanations and supporting evidence.

#### 3. Instructor Review Re-Check
- Provide a teacher portal for evaluating student re-check submissions to approve, adjust, or reject scores with comments.
- Automatically update student dashboards, trends, and gap flags after decisions.

#### 4. Generate Actionable Study Plan
- Automatically compile weak sub-topic data and exam dates into a structured, priority-based weekly study timeline for students.

#### 5. Resource Review Tracking & Progress Monitoring
- Record when students mark study materials as reviewed and monitor subsequent score improvements.

---

### Nice-Have Requirements

#### 1. AI Feedback
- Generate intelligent generative feedback analyzing individual score histories and trajectories.
- Provide personalized guidance and actionable next steps for both students and teachers.

#### 2. Learning Streak Badge
- Implement a gamified milestone and reward system recognizing consistent study habits, engagement, and platform usage.

#### 3. Automated Learning Gap Detection & Early Warning Flags
- Proactively detect downward performance trends or low scores to flag specific sub-topics as learning gaps in real time.

---

## Non-Functional Requirements
- **Platform:** Web application, fully usable on modern desktop and mobile browsers.
- **Performance:** Dashboards update in near real time after new scores are processed.
- **Security & Privacy:** Student data is private and accessible only to the student and their authorized instructors. No credentials or secrets in source control.

## Open Questions
- Source of assessment scores (manual entry, import, or LMS integration)?
- Definition of specific thresholds for "low score" and "downward trend"?
- Where learning materials originate (teacher-uploaded, curated internal resources, or external links)?