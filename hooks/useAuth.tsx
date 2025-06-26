"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { apiClient, type User } from "../lib/api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token")
      if (token) {
        try {
          const profile = await apiClient.getProfile()
          setUser(profile)
        } catch (error) {
          console.error("Failed to get profile:", error)
          localStorage.removeItem("auth_token")
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password)
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      // Clear local state even if API call fails
      setUser(null)
      apiClient.clearToken()
    }
  }

  const register = async (userData: any) => {
    try {
      await apiClient.register(userData)
    } catch (error) {
      throw error
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
