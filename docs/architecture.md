# Architecture

> Draft. Update as the team finalizes the stack.

## Overview

EStudy is a web application. Students and teachers use it through a browser, which talks to a backend API connected to a database and an AI feedback service.

```
[ Web App (Browser) ]
          |
   [ Backend API ]
     /     |      \
[Database] [Gap Detection] [AI Feedback Service]
```

## Components

| Component | Responsibility |
|-----------|----------------|
| Web client | Student and teacher interface in the browser (dashboards, tests, re-check requests) |
| Backend API | Authentication, subjects, tests, scores, re-check requests |
| Database | Users, subjects, sub-topics, tests, scores, materials, re-checks |
| Gap detection | Computes trends per subject and flags low scores or downward trends |
| Recommendation | Matches learning materials to flagged sub-topics |
| AI feedback service | Generates feedback from score history and trends |

## Core Data Entities (draft)

- User (role: student / teacher)
- Subject, SubTopic
- Enrollment
- DiagnosticTest, Question, Attempt
- Score (assessment component, value, date)
- LearningGap (sub-topic, reason, status)
- LearningMaterial, MaterialReview
- RecheckRequest (evidence, status, instructor decision)
- Feedback

## Key Flows

1. **Diagnostic test**: student takes test, scores saved, strengths and weaknesses mapped.
2. **Gap flagging**: new score triggers trend calculation, gaps flagged, materials recommended.
3. **Re-check**: student submits request, instructor decides, scores updated, dashboard and gaps recalculated.
4. **AI feedback**: score history sent to the AI service, feedback stored and shown.

## Decisions to Make
- Frontend framework and backend language
- Database
- AI provider
- Hosting
