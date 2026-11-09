# User Accounts and Roles: simplest CRUD

Feature-based layout (one folder per feature):

```
com/csit321G3/powertres/
├── common/   CorsConfig
├── role/     Role, RoleRepository, RoleService, RoleController
└── user/     UserProfile, Student, Teacher, Administrator (+ 4 repositories),
              UserRequest, UserService, UserController
```
Flow: controller (URLs, JSON) -> service (rules) -> repository (database).
Another feature (e.g. diagnostic) gets its own sibling folder with its own entity, repository and controller.

## Install
1. Copy `backend/src` over your `backend/src` (it only adds files).
2. Add the dependency from `pom.xml.ADD` to `backend/pom.xml`.
3. Add the line from `application.properties.ADD` to `application.properties`.
4. Delete `backend/data` if it exists, then run `mvnw clean test` and `mvnw spring-boot:run`.

## Endpoints
| Method | URL | What |
|---|---|---|
| POST | /api/users | Create an account (this is also "register") |
| GET | /api/users, /api/users/{id} | List (optional `?role=`) / get one |
| PUT | /api/users/{id} | Update |
| DELETE | /api/users/{id} | Delete |
| POST | /api/users/login | Login by email or school ID, returns `{ user }` |
| GET, POST | /api/roles | List / create |
| GET, PUT, DELETE | /api/roles/{id} | Get / rename / delete |

STUDENT, TEACHER and ADMIN roles are created automatically the first time an account uses them.
Passwords are saved as BCrypt hashes and are never returned.
No login protection yet: that is the next step (Spring Security).
