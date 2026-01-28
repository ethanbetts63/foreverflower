
import { handleResponse } from './helpers';
import type { AppConfig } from "@/types";

export async function getAppConfig(): Promise<AppConfig> {
  const response = await fetch('/api/products/single-event-price/');
  return handleResponse(response);
}
