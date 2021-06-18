export const HOST = "http://localhost:8000"
export const USER_ROUTES = {
    CREATE: "api/users",
    LIST: "api/users",
    UPDATE: (id) => `api/users/${id}`,
    DELETE: (id) => `api/users/${id}`,
    SHOW: (id) => `api/users/${id}`
}