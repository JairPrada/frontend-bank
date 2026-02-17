import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000";

const CORRELATION_ID_KEY = "x-correlation-id";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const correlationId = sessionStorage.getItem(CORRELATION_ID_KEY);
    if (correlationId) {
      config.headers[CORRELATION_ID_KEY] = correlationId;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const correlationId =
      response.headers[CORRELATION_ID_KEY] ||
      response.data?.correlationId;

    if (correlationId && typeof window !== "undefined") {
      sessionStorage.setItem(CORRELATION_ID_KEY, correlationId);
    }

    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || "Connection error";
    console.error(`[API Error]: ${message}`);
    return Promise.reject(error);
  },
);

export async function post<T>(endpoint: string, body: object): Promise<T> {
  return api.post(endpoint, body);
}

export async function get<T>(endpoint: string): Promise<T> {
  return api.get(endpoint);
}

export async function put<T>(endpoint: string, body: object): Promise<T> {
  return api.put(endpoint, body);
}

export async function del<T>(endpoint: string): Promise<T> {
  return api.delete(endpoint);
}

export default api;
