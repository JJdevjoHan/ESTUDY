# EStudy Backend: User Account and Role-Based Access

Spring Boot 3.5, Java 17+, Spring Security + JWT, JPA (H2 by default, MySQL optional).
Implements the **User Account and Role-Based Access** must-have from the project documentation:
register, log in, log out, view/update own profile, and for admins: manage accounts, assign roles, view roles.

## Database (matches the documentation ERD)

| Table | ERD entity | Columns |
|---|---|---|
| `roles` | Role | role_id, role_name (STUDENT / TEACHER / ADMIN) |
| `user_profiles` | UserProfile | user_id, username (= school ID), email, password_hash, role_id, enabled, created_at, updated_at |
| `students` | Student | student_id, user_id, first_name, last_name, year_level, section |
| `teachers` | Teacher | teacher_id, user_id, first_name, last_name, department |
| `administrators` | Administrator | admin_id, user_id, first_name, last_name, access_level |

Every account is one `user_profiles` row plus one row in the table of its role. Teammates should point their foreign keys at `Student` / `Teacher` (for example `@ManyToOne Student student`).

## Folder structure (`com.csit321g3.powertres.estudy`)

```
config/       CorsConfig, PasswordConfig (BCrypt)
security/     JwtService, JwtAuthenticationFilter, SecurityConfig (the URL rules), AuthUser
model/        Role, RoleNames, UserProfile, Student, Teacher, Administrator
repository/   one per entity
dto/          request and response JSON shapes
service/      AccountService (all account rules), AuthService, DataInitializer (seeds roles + first admin)
controller/   AuthController, UserController, AdminUserController, RoleHomeController
exception/    errors turned into { "message": ... } with the right HTTP status
```

## How login and role checks work

1. `POST /api/auth/login` checks the password (BCrypt) and returns `{ user, token, tokenType, expiresInSeconds }`.
2. The frontend sends `Authorization: Bearer <token>` on every later request.
3. `JwtAuthenticationFilter` reads the token, loads the user from the database and sets their role. Role changes and disabled accounts therefore apply immediately, even to tokens already issued.
4. `SecurityConfig` decides who may enter: `/api/admin/**` = ADMIN, `/api/teacher/**` = TEACHER, `/api/student/**` = STUDENT, `/api/auth/register|login` = public, everything else = any logged-in user. Wrong role = **403**, no/invalid token = **401**.

**For teammates:** put your feature's controllers under `/api/student/...`, `/api/teacher/...` or `/api/admin/...` and they are protected automatically. To find out who is calling, add `@AuthenticationPrincipal AuthUser me` to a controller method (`me.id()` is the `user_profiles.user_id`, `me.role()` is `STUDENT`/`TEACHER`/`ADMIN`).

## Endpoints

| Method | URL | Who | What |
|---|---|---|---|
| POST | `/api/auth/register` | public | Register (role `student` or `teacher`) |
| POST | `/api/auth/login` | public | Log in with email **or** school ID |
| POST | `/api/auth/logout` | logged in | Client discards the token |
| GET / PUT | `/api/users/me` | logged in | View / update own profile |
| PUT | `/api/users/me/password` | logged in | Change own password |
| GET | `/api/student/home`, `/api/teacher/home`, `/api/admin/home` | that role only | Role-specific landing check |
| GET | `/api/admin/users?role=` | admin | List accounts |
| GET | `/api/admin/users/{id}` | admin | One account |
| POST | `/api/admin/users` | admin | Create any account, including admins |
| PUT | `/api/admin/users/{id}` | admin | Edit an account |
| PUT | `/api/admin/users/{id}/role` | admin | Assign role |
| PUT | `/api/admin/users/{id}/status` | admin | Enable / disable |
| PUT | `/api/admin/users/{id}/password` | admin | Reset password |
| DELETE | `/api/admin/users/{id}` | admin | Delete (disable instead once other features reference the account) |
| GET | `/api/admin/roles` | admin | Roles with user counts |

Examples for every call: `api-requests.http` (VS Code "REST Client" extension).

Safety rules: an admin cannot disable, delete or change the role of their own account; emails and school IDs are unique; passwords are 8+ characters with a letter and a number and are stored as BCrypt hashes; the password hash is never returned.

When the role changes, the first/last name carry over and role-specific fields (section, department...) start empty.

## First admin

Nobody can register as admin, so on first start the app creates one (only if no admin exists):
**email `admin@estudy.local`, school ID `ADMIN-001`, password `Admin12345`** (see `app.seed-admin.*` in `application.properties`). Change it before deploying.

## Run it

```bash
cd backend
./mvnw spring-boot:run        # Windows: mvnw spring-boot:run
```
(or **Run** above `main` in `EstudyApplication.java` in VS Code). Tests: `./mvnw test`.

**Important after pulling this version:** the database layout changed. Delete the `backend/data/` folder once so it is recreated.

## Settings (`application.properties`)

- `app.jwt.secret`: base64 secret, 32+ bytes. The default is for development only; set the `JWT_SECRET` environment variable for anything real.
- `app.jwt.expiration-minutes` (60) and `app.jwt.remember-me-days` (7).
- `app.cors.allowed-origins`: the React address.
- The H2 web console is off (it conflicts with the security rules). MySQL: run with profile `mysql`.

## Not done yet

- Logout does not invalidate the token on the server (it simply expires). A blacklist can be added later.
- "Forgot password" by email is not included; admins can reset passwords.
- No custom roles: the three roles are fixed because each has its own profile table.
