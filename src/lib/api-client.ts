import type { ApiErrorBody } from '../types/api'

const API_BASE = '/api'

export class ApiError extends Error {
  readonly status: number
  readonly error: string
  readonly details?: Record<string, string>

  constructor(status: number, body: ApiErrorBody) {
    super(body.error)
    this.name = 'ApiError'
    this.status = status
    this.error = body.error
    this.details = body.details
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let body: ApiErrorBody = { error: response.statusText || 'Request failed' }
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      try {
        const json = (await response.json()) as ApiErrorBody
        if (typeof json.error === 'string') {
          body = json
        }
      } catch {
        // keep default body
      }
    }
    throw new ApiError(response.status, body)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

function buildUrl(path: string, searchParams?: URLSearchParams): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const query = searchParams?.toString()
  return query ? `${API_BASE}${normalizedPath}?${query}` : `${API_BASE}${normalizedPath}`
}

export async function apiGet<T>(path: string, searchParams?: URLSearchParams): Promise<T> {
  const response = await fetch(buildUrl(path, searchParams))
  return parseResponse<T>(response)
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseResponse<T>(response)
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseResponse<T>(response)
}
