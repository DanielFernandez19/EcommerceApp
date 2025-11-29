// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * GET genérico
 */
export async function apiGet<T>(path: string): Promise<T> {
  const url = `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    // intentar leer body JSON del error (si lo tiene)
    const body = await res.json().catch(() => null);
    throw {
      status: res.status,
      message: body?.message ?? `HTTP ${res.status}`,
      body,
    };
  }
  return (await res.json()) as T;
}

/**
 * POST genérico
 */
export async function apiPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  const url = `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw {
      status: res.status,
      message: data?.message ?? `HTTP ${res.status}`,
      body: data,
    };
  }

  return data as TResponse;
}
