// Core application types
export interface User {
  id: string
  email: string
  username?: string
}

export interface Project {
  id: string
  title: string
  description?: string
  created_at: string
  updated_at: string
}