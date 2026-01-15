'use server'

import { revalidatePath } from 'next/cache'
import { UserFormData } from '@/types/user'
import { apiClient } from '@/lib/api/client'

/**
 * Server Actions for User operations
 * These run on the server and can be called directly from Server/Client Components
 */

export async function createUser(data: UserFormData) {
  try {
    // In production, this would call your API
    const response = await apiClient.post('/users', data)
    
    // Revalidate the users page to show new data
    revalidatePath('/users')
    
    return { success: true, data: response }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    }
  }
}

export async function updateUser(id: string, data: Partial<UserFormData>) {
  try {
    const response = await apiClient.put(`/users/${id}`, data)
    revalidatePath('/users')
    revalidatePath(`/users/${id}`)
    
    return { success: true, data: response }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update user',
    }
  }
}

export async function deleteUser(id: string) {
  try {
    await apiClient.delete(`/users/${id}`)
    revalidatePath('/users')
    
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete user',
    }
  }
}
