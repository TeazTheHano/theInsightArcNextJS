import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * Lính gác cổng (Port) cho mọi thao tác HTTP.
 * Đảm bảo Dependency Inversion: Application layer chỉ biết IHttpClient.
 */
export interface IHttpClient {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
}

/**
 * TokenManager giả lập cho tương lai.
 * Access Token lưu ở Memory (Closure).
 */
class TokenManager {
  private static accessToken: string | null = null;

  static getToken(): string | null {
    return this.accessToken;
  }

  static setToken(token: string) {
    this.accessToken = token;
  }

  static clearToken() {
    this.accessToken = null;
  }
}

/**
 * Implementation cụ thể sử dụng Axios.
 * Bao gồm cơ chế Interceptor để đính kèm Token và Silent Refresh (khi lỗi 401).
 */
export class AxiosHttpClient implements IHttpClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      withCredentials: true, // Cho phép gửi HttpOnly Cookie chứa Refresh Token
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 1. Request Interceptor: Đính kèm Access Token vào Header
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = TokenManager.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 2. Response Interceptor: Xử lý Silent Refresh khi gặp 401
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(this.client(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Giả lập endpoint refresh token (Backend sẽ đọc HttpOnly Cookie)
            // const { data } = await axios.post<{ accessToken: string }>(`${this.client.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true });
            
            // TODO: Bỏ comment khi có API thật. Hiện tại giả lập thất bại để logout.
            throw new Error("No refresh token logic implemented yet");

            /*
            const newToken = data.accessToken;
            TokenManager.setToken(newToken);
            
            this.refreshSubscribers.forEach((cb) => cb(newToken));
            this.refreshSubscribers = [];
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
            */
          } catch (refreshError) {
            TokenManager.clearToken();
            this.refreshSubscribers = [];
            // Redirect to login or trigger global event
            // window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

// Global Singleton Instance cho toàn bộ app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.theinsightarc.com/api";
export const httpClient = new AxiosHttpClient(API_BASE_URL);
