import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '~/components/auth/AuthProvider'
import type { FetchMethod } from '~/models/fetch.models'
export default function useFetch<TData = unknown>() {
    const abortControllerRef = useRef<AbortController | null>(null)
    const isLoadingRef = useRef(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [response, setResponse] = useState<TData | null>(null)
    const { token } = useAuth()

    const internalFetch = useCallback(
        async (
            input: URL | RequestInfo,
            method: FetchMethod = 'GET',
            body?: Record<string, unknown>,
            init?: RequestInit | undefined
        ) => {
            isLoadingRef.current = true
            setIsLoading(true)
            setError(null)
            setResponse(null)
            abortControllerRef.current = new AbortController()
            try {
                const internalInit: RequestInit = {
                    ...(init ?? {}),
                    signal: abortControllerRef.current?.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                        ...(init?.headers ?? {}),
                    },
                    method,
                }
                if (body) {
                    internalInit.body = JSON.stringify(body)
                }
                const response = await fetch(input, internalInit)
// Handle success
                const data = (await response.json()) as TData
                if (response.ok) {
                    setResponse(data)
                }
                return data
            } catch (error) {
                setError(error as Error)
                throw error
            } finally {
                isLoadingRef.current = false
                setIsLoading(false)
                abortControllerRef.current = null
            }
        },
        [token]
    )
    useEffect(function componentDidMount() {
        return function componentWillUnmount() {
            abortControllerRef.current?.abort?.()
        }
    }, [])

    return { fetch: internalFetch, isLoading, isLoadingRef, error,
        response }
}
