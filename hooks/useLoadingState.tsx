"use client"

import { useState, useCallback } from 'react'

export function useLoadingState<T>(initialState: T) {
  const [data, setData] = useState<T>(initialState)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const setDataSafely = useCallback((newData: T) => {
    try {
      setData(newData)
      setIsLoading(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setIsLoading(false)
    }
  }, [])

  const setErrorState = useCallback((err: Error) => {
    setError(err)
    setIsLoading(false)
  }, [])

  const resetLoading = useCallback(() => {
    setIsLoading(true)
    setError(null)
  }, [])

  return {
    data,
    setData: setDataSafely,
    isLoading,
    setIsLoading,
    error,
    setError: setErrorState,
    resetLoading
  }
}
