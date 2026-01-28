
async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return Promise.resolve(null as T);
  }

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.detail || 'An unknown API error occurred.');
    (error as any).data = data; 
    throw error;
  }
  return data as T;
}

export { handleResponse };
