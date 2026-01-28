
async function handleResponse<T>(response: Response): Promise<T> {
  // Handle successful but empty responses (e.g., from a DELETE request)
  if (response.status === 204) {
    return Promise.resolve(null as T);
  }

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.detail || 'An unknown API error occurred.');
    (error as any).data = data; // Attach the full error data for more specific handling
    throw error;
  }
  return data as T;
}

export { handleResponse };
