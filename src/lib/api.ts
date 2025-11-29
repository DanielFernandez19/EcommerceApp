const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function apiGet(path: string) {
  const url = `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  const response = await fetch(url, { cache: "no-store" });
  return response.json();
}

export async function apiPost<TResponse, TBody>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  const url = `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      status: response.status,
      message: data?.message ?? "Error desconocido",
      body: data,
    };
  }

  return data as TResponse;
}
