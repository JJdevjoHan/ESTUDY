# Requirements

## Purpose
EStudy helps students and teachers detect learning gaps early through personalized diagnostic tests and real-time performance tracking.

## Users
- Student
- Teacher / Instructor

## Functional Requirements

### FR1. Personalized Diagnostic Test
- Deliver baseline tests based on the student's enrolled subjects and sub-topics.
- Map strengths and weaknesses per sub-topic.
- Allow periodic retakes to measure improvement.

### FR2. Dashboard Diagnostic of Performance
- Aggregate scores from all assessment components per subject.
- Display continuous trend graphs.
- Automatically flag downward trends or low scores as specific learning gaps.

### FR3. Suggestive Learning Materials
- Recommend study materials matched to flagged weak sub-topics.
- Let students mark materials as reviewed.
- Track score changes after review.

### FR4. Data Re-checking
- Students submit re-check requests with supporting evidence.
- Instructors review and approve or adjust scores.
- Dashboards, trends, and gap flags update automatically after the decision.

### FR5. AI Feedback
- Generate personalized, constructive feedback and next steps from score history and trends.
- Provide guidance for both students and teachers.

## Non-Functional Requirements
- Web application, usable on modern desktop and mobile browsers.
- Dashboards update in near real time after new scores.
- Student data is private and accessible only to the student and their instructors.
- No secrets in source control.

## Open Questions
- Source of assessment scores (manual entry, import, or LMS integration)?
- Definition of "low score" and "downward trend" thresholds.
- Where learning materials come from (teacher-uploaded, curated, external links)?
