export const authenticatedRole = {
    id: 1,
    name: "Authenticated",
    description: "Default role given to authenticated user.",
    type: "authenticated"
}

export const publicRole = {
    id: 2,
    name: "Public",
    description: "Default role given to unauthenticated user.",
    type: "public"
}

export const testRoles = [authenticatedRole, publicRole];