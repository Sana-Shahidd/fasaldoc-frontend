import { create } from 'zustand'
import type { PredictResponse } from '../types/api'

interface AppState {
  lastResult: PredictResponse | null
  lastFile: File | null
  lastLocation: { lat: number; lng: number } | null
  setResult: (result: PredictResponse, file: File) => void
  setLocation: (lat: number, lng: number) => void
  clearResult: () => void
}

export const useStore = create<AppState>((set) => ({
  lastResult: null,
  lastFile: null,
  lastLocation: null,
  setResult: (result, file) => set({ lastResult: result, lastFile: file }),
  setLocation: (lat, lng) => set({ lastLocation: { lat, lng } }),
  clearResult: () => set({ lastResult: null, lastFile: null }),
}))
