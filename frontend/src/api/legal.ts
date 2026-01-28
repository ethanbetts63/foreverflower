
import { handleResponse } from './helpers';
import type { TermsAndConditions } from "@/types";

export async function getLatestTermsAndConditions(): Promise<TermsAndConditions> {
    const response = await fetch('/api/data/terms/latest/');
    return handleResponse(response);
}
