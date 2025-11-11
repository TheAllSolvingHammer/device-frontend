import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl(path: string) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    if (!baseUrl) {
        throw new Error('VITE_API_BASE_URL is not defined')
    }
    return `${baseUrl}${path}`
}
