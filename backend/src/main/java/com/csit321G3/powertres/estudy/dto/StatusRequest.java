package com.csit321G3.powertres.estudy.dto;

import jakarta.validation.constraints.NotNull;

/** PUT /api/admin/users/{id}/status: enable or disable an account. */
public record StatusRequest(@NotNull Boolean enabled) {
}
