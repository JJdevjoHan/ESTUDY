package com.csit321G3.powertres.estudy.controller;

import com.csit321G3.powertres.estudy.dto.AssignRoleRequest;
import com.csit321G3.powertres.estudy.dto.CreateAccountRequest;
import com.csit321G3.powertres.estudy.dto.ResetPasswordRequest;
import com.csit321G3.powertres.estudy.dto.RoleResponse;
import com.csit321G3.powertres.estudy.dto.StatusRequest;
import com.csit321G3.powertres.estudy.dto.UpdateAccountRequest;
import com.csit321G3.powertres.estudy.dto.UserResponse;
import com.csit321G3.powertres.estudy.model.UserProfile;
import com.csit321G3.powertres.estudy.security.AuthUser;
import com.csit321G3.powertres.estudy.service.AccountService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** "Manage user accounts", "Assign role" and "Manage roles". Admin only (see SecurityConfig: /api/admin/**). */
@RestController
@RequestMapping("/api/admin")
public class AdminUserController {

    private final AccountService accountService;

    public AdminUserController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/users")
    public List<UserResponse> list(@RequestParam(required = false) String role) {
        return accountService.list(role);
    }

    @GetMapping("/users/{id}")
    public UserResponse get(@PathVariable Long id) {
        return accountService.get(id);
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(@Valid @RequestBody CreateAccountRequest request) {
        UserProfile created = accountService.create(request.role(), request.fName(), request.lName(),
                request.email(), request.username(), request.password());
        return accountService.toResponse(created);
    }

    @PutMapping("/users/{id}")
    public UserResponse update(@PathVariable Long id, @Valid @RequestBody UpdateAccountRequest request) {
        return accountService.updateProfile(id, request, true);
    }

    @PutMapping("/users/{id}/role")
    public UserResponse assignRole(@PathVariable Long id, @Valid @RequestBody AssignRoleRequest request,
                                   @AuthenticationPrincipal AuthUser me) {
        return accountService.assignRole(id, request.role(), me.id());
    }

    @PutMapping("/users/{id}/status")
    public UserResponse setStatus(@PathVariable Long id, @Valid @RequestBody StatusRequest request,
                                  @AuthenticationPrincipal AuthUser me) {
        return accountService.setEnabled(id, request.enabled(), me.id());
    }

    @PutMapping("/users/{id}/password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void resetPassword(@PathVariable Long id, @Valid @RequestBody ResetPasswordRequest request) {
        accountService.resetPassword(id, request.newPassword());
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, @AuthenticationPrincipal AuthUser me) {
        accountService.delete(id, me.id());
    }

    @GetMapping("/roles")
    public List<RoleResponse> roles() {
        return accountService.listRoles();
    }
}
