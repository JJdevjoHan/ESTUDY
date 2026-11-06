package com.csit321G3.powertres.estudy.controller;

import com.csit321G3.powertres.estudy.dto.ChangePasswordRequest;
import com.csit321G3.powertres.estudy.dto.UpdateAccountRequest;
import com.csit321G3.powertres.estudy.dto.UserResponse;
import com.csit321G3.powertres.estudy.security.AuthUser;
import com.csit321G3.powertres.estudy.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** "View/update own profile": any logged-in user, always about themselves (the id comes from the token). */
@RestController
@RequestMapping("/api/users/me")
public class UserController {

    private final AccountService accountService;

    public UserController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public UserResponse me(@AuthenticationPrincipal AuthUser me) {
        return accountService.get(me.id());
    }

    @PutMapping
    public UserResponse update(@AuthenticationPrincipal AuthUser me, @Valid @RequestBody UpdateAccountRequest request) {
        return accountService.updateProfile(me.id(), request, false);
    }

    @PutMapping("/password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@AuthenticationPrincipal AuthUser me, @Valid @RequestBody ChangePasswordRequest request) {
        accountService.changePassword(me.id(), request);
    }
}
