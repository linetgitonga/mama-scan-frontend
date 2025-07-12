const BASE_URL = "http://127.0.0.1:8000/api"

// Types based on your API documentation
export interface User {
  id: number
  email: string
  username: string
  user_type: "CHV" | "CLINICIAN" | "ADMIN" | "PATIENT" | "SPECIALIST"
  phone_number?: string
  county?: string
  sub_county?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string

}

export interface Patient {
  id: number
  first_name: string
  last_name: string
  national_id: string
  phone_number: string
  email?: string
  date_of_birth: string
  county: string
  sub_county: string
  marital_status?: string
  registered_by: number
  created_at: string
  updated_at: string
}

export interface ScreeningRecord {
  id: number
  patient: number
  screened_by: number
  screening_date: string
  age: number
  age_at_first_intercourse?: number
  number_of_sexual_partners?: number
  parity?: number
  hiv_status: "POSITIVE" | "NEGATIVE" | "UNKNOWN"
  hpv_vaccination_status: "VACCINATED" | "NOT_VACCINATED" | "UNKNOWN"
  contraceptive_use: "NONE" | "ORAL_PILLS" | "INJECTION" | "IUD" | "BARRIER" | "OTHER"
  smoking_status: "NEVER" | "FORMER" | "CURRENT"
  family_history_cervical_cancer: boolean
  previous_abnormal_pap: boolean
  via_result?: "NEGATIVE" | "POSITIVE" | "SUSPICIOUS"
  bethesda_category?: "NILM" | "ASCUS" | "LSIL" | "HSIL" | "AGC" | "CANCER"
  risk_level?: string
  ai_risk_score?: number
  ai_confidence?: number
  referral_needed?: boolean
  clinical_notes?: string
  created_at: string
  updated_at: string
}

export interface RiskPrediction {
  risk_score: number
  risk_level: string
  confidence: number
  recommended_action: string
  follow_up_months: number
  referral_needed: boolean
  explanation: string[]
}

export interface ScreeningFollowUp {
  id: number
  screening_record: number
  follow_up_date: string
  status: "SCHEDULED" | "COMPLETED" | "MISSED" | "CANCELLED"
  contacted_by?: number
  contact_method?: "PHONE" | "SMS" | "IN_PERSON" | "EMAIL"
  notes?: string
  created_at: string
  updated_at: string
}

// Payment types
export interface PaymentRequest {
  amount: number
  service_id: number
  phone_number: string
}

export interface PaymentResponse {
  success: boolean
  payment_link: string
  transaction_id: string
}

export interface PaymentStatus {
  transaction_id: string
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED"
  amount: number
  service: string
  created_at?: string
  updated_at?: string
}

export interface PaymentCallback {
  transaction_id: string
  status: "COMPLETED" | "FAILED"
  amount: number
  signature: string
}

// Chatbot types
export interface ChatRequest {
  query: string
}

export interface ChatResponse {
  answer: string
}

// API Client class
class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  // Auth endpoints
  // async login(email: string, password: string) {
  //   const response = await this.request<{ access: string; refresh: string; user: User }>("/auth/login/", {
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //   })
  //   this.setToken(response.access)
  //   return response
  // }

  async login(email: string, password: string) {
  try {
    // Create a clean request without any existing auth headers
    const response = await fetch(`${this.baseURL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || data.message || "Login failed");
    }

    if (!data.tokens?.access) {
      throw new Error("No access token received");
    }

    // Only set token after successful login
    this.setToken(data.tokens.access);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}


  async register(userData: {
    email: string
    username: string
    password: string
    user_type: string
    phone_number?: string
    county?: string
    sub_county?: string
  }) {
    return this.request<User>("/auth/register/", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    await this.request("/auth/logout/", { method: "POST" })
    this.clearToken()
  }

  async getProfile() {
    return this.request<User>("/auth/profile/")
  }
// ...existing code...

  async updateProfile(userData: Partial<User>) {
    return this.request<User>("/auth/profile/update/", {
      method: "PATCH",
      body: JSON.stringify(userData),
    })
  }

  // Fetch specialists (users with user_type "SPECIALIST")
async getSpecialists() {
  return this.request<{ results: User[] }>("/auth/specialists/")
}

  // Patient endpoints
  async getPatients(search?: string) {
    const params = search ? `?search=${encodeURIComponent(search)}` : ""
    return this.request<{ results: Patient[] }>(`/screening/patients/${params}`)
  }

  async getPatient(id: number) {
    return this.request<Patient>(`/screening/patients/${id}/`)
  }

  async createPatient(patientData: Omit<Patient, "id" | "created_at" | "updated_at" | "registered_by">) {
    return this.request<Patient>("/screening/patients/", {
      method: "POST",
      body: JSON.stringify(patientData),
    })
  }

  async updatePatient(id: number, patientData: Partial<Patient>) {
    return this.request<Patient>(`/screening/patients/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(patientData),
    })
  }

  async deletePatient(id: number) {
    return this.request(`/screening/patients/${id}/`, { method: "DELETE" })
  }

  // Screening endpoints
  async getScreenings(patientId?: number) {
    const params = patientId ? `?patient_id=${patientId}` : ""
    return this.request<{ results: ScreeningRecord[] }>(`/screening/screenings/${params}`)
  }

  async getScreening(id: number) {
    return this.request<ScreeningRecord>(`/screening/screenings/${id}/`)
  }

  async createScreening(screeningData: Omit<ScreeningRecord, "id" | "created_at" | "updated_at" | "screened_by">) {
    return this.request<ScreeningRecord>("/screening/screenings/", {
      method: "POST",
      body: JSON.stringify(screeningData),
    })
  }

  async updateScreening(id: number, screeningData: Partial<ScreeningRecord>) {
    return this.request<ScreeningRecord>(`/screening/screenings/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(screeningData),
    })
  }

  // Risk prediction
  async predictRisk(riskData: {
    age: number
    age_at_first_intercourse?: number
    number_of_sexual_partners?: number
    parity?: number
    hiv_status: string
    hpv_vaccination_status: string
    contraceptive_use: string
    smoking_status: string
    family_history_cervical_cancer: boolean
    previous_abnormal_pap: boolean
    via_result?: string
    bethesda_category?: string
  }) {
    return this.request<RiskPrediction>("/screening/predict-risk/", {
      method: "POST",
      body: JSON.stringify(riskData),
    })
  }

  // Follow-up endpoints
  async getFollowUps(screeningId?: number) {
    const params = screeningId ? `?screening_record=${screeningId}` : ""
    return this.request<{ results: ScreeningFollowUp[] }>(`/screening/followups/${params}`)
  }

  async createFollowUp(followUpData: Omit<ScreeningFollowUp, "id" | "created_at" | "updated_at">) {
    return this.request<ScreeningFollowUp>("/screening/followups/", {
      method: "POST",
      body: JSON.stringify(followUpData),
    })
  }

  // Payment endpoints
  async initiatePayment(paymentData: PaymentRequest) {
    return this.request<PaymentResponse>("/payments/initiate-payment/", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  async getPaymentStatus(transactionId: string) {
    return this.request<PaymentStatus>(`/payments/payment-status/${transactionId}/`)
  }

  async handlePaymentCallback(callbackData: PaymentCallback) {
    return this.request<{ success: boolean; message: string }>("/payments/payment-callback/", {
      method: "POST",
      body: JSON.stringify(callbackData),
    })
  }

  // Chatbot endpoint
  async sendChatMessage(query: string) {
    return this.request<ChatResponse>("/chatbot/chat/", {
      method: "POST",
      body: JSON.stringify({ query }),
    })
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request("/analytics/")
  }

  async getRevenueAnalytics() {
    return this.request("/analytics/revenue/")
  }

  async getStaffAnalytics() {
    return this.request("/analytics/staff/")
  }

  async getClientAnalytics() {
    return this.request("/analytics/clients/")
  }

  async getFeedbackAnalytics() {
    return this.request("/analytics/feedback/")
  }

  async exportAnalytics() {
    return this.request("/analytics/export/")
  }
}



// ...existing code...

export const apiClient = new ApiClient(BASE_URL)
