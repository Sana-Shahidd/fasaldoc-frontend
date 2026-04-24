export interface ChemicalTreatment {
  name: string
  dosage: string
  frequency: string
}

export interface TreatmentInfo {
  label_key: string
  disease_name: string
  urdu_name: string
  crop: string
  cause: string
  severity_indicators: string[]
  symptoms: string[]
  organic_treatment: string[]
  chemical_treatment: ChemicalTreatment[]
  prevention: string[]
}

export interface Prediction {
  label_key: string
  disease_name: string
  confidence: number
  rank: number
}

export interface PredictResponse {
  top_prediction: Prediction
  top_3: Prediction[]
  severity: 'high' | 'moderate' | 'low' | null
  no_plant_detected: boolean
  treatment: TreatmentInfo | null
  gradcam_url: string | null
}

export interface GradCAMResponse {
  label_key: string
  gradcam_image: string
}

export interface Shop {
  name: string
  address: string
  distance_m: number | null
  rating: number | null
  place_id: string
  maps_url: string
  stocks_medicine: string | null
}

export interface ShopsResponse {
  shops: Shop[]
  cached: boolean
  searched_medicines: string[]
  actual_radius?: number
}

export interface ScanRecord {
  scan_id: string
  user_id: string
  timestamp: string
  label_key: string
  disease_name: string
  confidence: number
  lat: number | null
  lng: number | null
  image_thumbnail_url: string | null
}

export interface HistoryResponse {
  user_id: string
  scans: ScanRecord[]
}

export interface ProductResult {
  platform: string
  platform_id: string
  name: string
  price: string | null
  original_price: string | null
  url: string
  image: string | null
  rating: string | null
  reviews: number | null
  seller: string | null
  medicine_matched: string
  in_stock: boolean
  cash_on_delivery: boolean
  delivery_days: string | null
}

export interface ProductSearchResponse {
  products: ProductResult[]
  searched_medicines: string[]
  platforms_searched: string[]
  cached: boolean
}
