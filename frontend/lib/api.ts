import type { Brief } from "@/types/brief";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Error ${res.status}`);
  }
  return res.json();
}

export async function scrapeProfile(username: string): Promise<void> {
  const res = await fetch(`${API}/instagram/scrape`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  await handleResponse(res);
}

export async function generateBrief(username: string): Promise<Brief> {
  const res = await fetch(`${API}/analysis/${username}`, { method: "POST" });
  return handleResponse<Brief>(res);
}

export async function getWebPrompt(username: string): Promise<string> {
  const res = await fetch(`${API}/analysis/${username}/web-prompt`);
  const data = await handleResponse<{ prompt: string }>(res);
  return data.prompt;
}
