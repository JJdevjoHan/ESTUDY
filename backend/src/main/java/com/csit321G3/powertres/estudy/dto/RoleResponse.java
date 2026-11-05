package com.csit321g3.powertres.estudy.dto;

/** One row of GET /api/admin/roles. */
public record RoleResponse(Long roleId, String roleName, long userCount) {
}
