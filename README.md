# EStudy

**A Personalized Tracking for Student Diagnostic and Performance**

Group: **PowerTres**

## Summary

EStudy is a cross-platform, web and Android-based application that bridges student learning gaps through personalized diagnostic testing and real-time performance tracking. It converts assessment scores into continuous trend graphs and gives automated early warnings, so students and teachers can intervene before final examinations.

## Problem

Students often discover their weak topics only after major exams, when it is too late to act. Scores are scattered across quizzes, activities, and exams, and there is no single view that shows trends or points to the specific sub-topics a student is struggling with.

## Users

- **Students**: take diagnostic tests, view their performance, review suggested materials, request score re-checks.
- **Teachers / Instructors**: monitor class and student trends, review re-check requests, approve or adjust scores.

## Features

1. **Personalized Diagnostic Test**: tailored baseline tests per enrolled subject and sub-topic to map strengths and weaknesses; periodic retakes measure improvement.
2. **Dashboard Diagnostic of Performance**: combines scores from all assessment components into continuous trend graphs per subject and flags downward trends or low scores as learning gaps.
3. **Suggestive Learning Materials**: recommends study materials matched to flagged weak sub-topics; students mark resources as reviewed while score improvements are tracked.
4. **Data Re-checking**: students submit score re-check requests with supporting evidence; instructor approval or adjustment automatically updates dashboards, trends, and gap flags.
5. **AI Feedback**: personalized, constructive feedback and next steps based on score history and trends, for both students and teachers.

## Tech Stack

> To be confirmed by the team. Fill in once decided.

| Layer | Choice |
|-------|--------|
| Web frontend | TBD |
| Android app | TBD |
| Backend / API | TBD |
| Database | TBD |
| AI feedback | TBD |

## Team

| Member | Role |
|--------|------|
| Johan M. Borinaga | See `docs/team-roles.md` |
| Careza P. Tiro | See `docs/team-roles.md` |
| Eleonora Sayson | See `docs/team-roles.md` |
| Charles Brayden P. Sanchez | See `docs/team-roles.md` |

## Setup Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd estudy

# 2. Copy the environment template and fill in your own values
cp .env.example .env

# 3. Install dependencies (update once the stack is chosen)
# e.g. npm install

# 4. Run the project (update once the stack is chosen)
# e.g. npm run dev
```

Never commit your real `.env` file. See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow rules.

## Task Board

Task board: [PowerTres task board](https://app.clickup.com/1300440000010244/v/s/1300440000049393)

## Project Structure

```
README.md
CONTRIBUTING.md
.env.example
.gitignore
docs/
  requirements.md
  architecture.md
  team-roles.md
src/
tests/
```
