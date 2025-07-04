
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  allowedRoles: ('admin' | 'user' | 'manager')[];
  color: string;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  id: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
  submitButtonText: string;
}
