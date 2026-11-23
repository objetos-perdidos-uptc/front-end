export type Role = 'STUDENT' | 'ADMIN'

export type Id = string | number

export interface User {
  userId: Id
  email: string
  role: Role
}

/** Error normalizado que devuelve el cliente API (nunca un AxiosError crudo). */
export interface AppError {
  message: string
  code: string
  status: number
}

export interface ApiErrorBody {
  message?: string
  code?: string
}
