import axios from 'axios'
import type { PredictResponse, GradCAMResponse, ShopsResponse, HistoryResponse, ProductSearchResponse } from '../types/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
})

export async function predict(
  file: File,
  userId: string,
  lat?: number,
  lng?: number,
): Promise<PredictResponse> {
  const form = new FormData()
  form.append('file', file)
  const params: Record<string, string | number> = { user_id: userId }
  if (lat != null) params.lat = lat
  if (lng != null) params.lng = lng

  const { data } = await api.post<PredictResponse>('/predict', form, {
    params,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function fetchGradCAM(file: File): Promise<GradCAMResponse> {
  const form = new FormData()
  form.append('file', file)
  const { data } = await api.post<GradCAMResponse>('/predict/gradcam', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function fetchShops(
  lat: number,
  lng: number,
  medicines: string[],
  radius = 5000,
): Promise<ShopsResponse> {
  const params = new URLSearchParams()
  params.append('lat', String(lat))
  params.append('lng', String(lng))
  params.append('radius', String(radius))
  medicines.forEach(m => params.append('medicines', m))
  const { data } = await api.get<ShopsResponse>('/shops', { params })
  return data
}

export async function fetchHistory(userId: string): Promise<HistoryResponse> {
  const { data } = await api.get<HistoryResponse>('/history', {
    params: { user_id: userId },
  })
  return data
}

export async function fetchProducts(medicines: string[]): Promise<ProductSearchResponse> {
  const params = new URLSearchParams()
  medicines.forEach(m => params.append('medicines', m))
  const { data } = await api.get<ProductSearchResponse>('/products/search', { params })
  return data
}

export async function checkHealth(): Promise<boolean> {
  try {
    await api.get('/health', { timeout: 5000 })
    return true
  } catch {
    return false
  }
}
