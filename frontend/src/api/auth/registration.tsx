import type { RegisterPayload, RegisterResult, RegistrationSuccessResponse } from "../../interfaces/forms";
export const register = async (
payload: RegisterPayload
): Promise<RegisterResult> => {
const baseUrl = import.meta.env.VITE_API_URL;
if (!baseUrl) {
return {
error: "VITE_API_URL не задано в .env",
};
}
try {
const res = await fetch(`${baseUrl}/api/auth/registration`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(payload),
});
let json: unknown = null;
try {
json = await res.json();
} catch {
json = null;
}
if (res.status === 201 || res.status === 200) {
const data = json as Partial<RegistrationSuccessResponse> | null;
return {
data: {
message: data?.message || "Користувача успішно створено",
},
};
}
const errJson = json as { message?: string; detail?: string } | null;
const backendMsg = errJson?.message || errJson?.detail;
if (res.status === 400) {
return {
status: res.status,
error: backendMsg || "Невірні дані для реєстрації (400)",
};
}
if (res.status === 409) {
return {
status: res.status,
error: backendMsg || "Користувач з таким username вже існує (409)",
};
}
if (res.status === 401 || res.status === 403) {
return {
status: res.status,
error: backendMsg || "Немає доступу до операції реєстрації",
};
}
if (res.status >= 500) {
return {
status: res.status,
error: backendMsg || "Внутрішня помилка сервера при реєстрації",
};
}
return {
status: res.status,
error:
backendMsg ||
`Неочікуваний статус від /api/auth/registration: HTTP ${res.status}`,
};
} catch (e) {
const message =
e instanceof Error ? e.message : "Невідома помилка при реєстрації";
return {
error: message,
};
}
};