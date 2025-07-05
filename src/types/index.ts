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
  category: string;
  icon: string;
  allowedRoles: ('admin' | 'user' | 'manager')[];
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

// Inventory specific types
export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'color' | 'boolean';
  required: boolean;
}

export interface AttributeValue {
  id: string;
  attributeId: string;
  value: string;
  displayName?: string;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  managerId?: string;
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  price: number;
  stock: number;
  attributes: { attributeId: string; valueId: string }[];
  warehouseStock: { warehouseId: string; quantity: number }[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  brandId?: string;
  type: 'standard' | 'multi-variant';
  basePrice: number;
  variants: ProductVariant[];
  images?: string[];
  isActive: boolean;
}
