// file: types/index.ts
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

// Component size variants
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Component color variants - matching our theme system
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'outline'

// Additional specific variants
export type BadgeVariant = ComponentVariant | 'default' | 'destructive'

// Base props interface
export interface BaseComponentProps {
  class?: string
  id?: string
}
