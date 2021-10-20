import { RoleTypeEnum } from "@ng-strapi-auth/ng-strapi-auth";

export const authenticatedRole = {
    id: 1,
    name: "Authenticated",
    description: "Default role given to authenticated user.",
    type: RoleTypeEnum.AUTHENTICATED
}

export const publicRole = {
    id: 2,
    name: "Public",
    description: "Default role given to unauthenticated user.",
    type: RoleTypeEnum.PUBLIC
}

export const testRoles = [authenticatedRole, publicRole];