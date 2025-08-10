export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const apiUrl = (path: string) => `${API_BASE}${path}`;
