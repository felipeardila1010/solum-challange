'use server';

export interface PutCall {
  call_id: string;
  qa_check: string;
  feedback_qa: string;
  evaluation: string;
}

export async function handleServerSubmit(formData: FormData): Promise<boolean> {
  const updatedData: PutCall = {
    call_id: formData.get('call_id') as string,
    qa_check: formData.get('qaCheck') as string,
    feedback_qa: formData.get('feedbackQa') as string,
    evaluation: formData.get('evaluation') as string
  };
  const url = `${process.env.BACKEND_HOST}/api/calls/${updatedData.call_id}`;
  console.log('put-call-http:', url);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    return response.ok;
  } catch (error) {
    console.error('Error in putCall:', error);
    throw new Error('Failed to update call');
  }
}
