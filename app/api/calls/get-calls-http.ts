import 'server-only';

export const statusEnum = ['active', 'inactive', 'archived'] as const;
export type StatusEnum = typeof statusEnum[number];

export interface SelectCall {
  call_id: string;
  ended_reason: string;
  assistant: string;
  customer_phone_number: number;
  call_start_time: string;
  duration: number;
  call_ended_time: string;
  summary: string;
  recording_url: string;
  reviewer: string;
  evaluation: string;
  qa_check: string;
  feedback_qa: string;
  status_feedback_engineer: string;
  comments_engineer: string;
}

export async function getCalls(
  search: string,
  offset: number
): Promise<{
  calls: SelectCall[];
  newOffset: number | null;
  totalCalls: number;
}> {
  if (offset === null && search === '') {
    return { calls: [], newOffset: null, totalCalls: 0 };
  }

  const endpoint = `${process.env.BACKEND_HOST}/api/calls?offset=${encodeURIComponent(
    offset.toString()
  )}&search=${encodeURIComponent(search)}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch calls: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Fetched calls:', data);
  return {
    calls: data.calls,
    newOffset: data.newOffset,
    totalCalls: data.totalCalls,
  };
}
