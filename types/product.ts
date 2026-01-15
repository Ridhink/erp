export interface Product {
  id: string
  name: string
  sku: string
  description?: string
  price: number
  quantity: number
  category?: string
  imageUrl?: string
  status: 'active' | 'inactive' | 'out_of_stock'
  createdAt: string
  updatedAt: string
}

export interface ProductFormData {
  name: string
  sku: string
  description?: string
  price: number
  quantity: number
  category?: string
  imageUrl?: string
  status: 'active' | 'inactive' | 'out_of_stock'
}

export interface ProductFilters {
  search?: string
  category?: string
  status?: Product['status']
  minPrice?: number
  maxPrice?: number
}

export interface ProductTableParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ProductFilters
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}
