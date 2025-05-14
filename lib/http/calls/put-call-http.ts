export interface PutCall {
    call_id: string;
    qa_check: string;
    feedback_qa: string;
    evaluation: string;
}

export async function putCall(data: PutCall): Promise<Response> {
try {
    console.log("hello:", process.env.NEXT_PUBLIC_API_URL, process.env.NODE_ENV);
    const response = await fetch(`/api/calls/${data.call_id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });

    return response; // Return the raw response for further handling
} catch (error) {
    console.error("Error in putCall:", error);
    throw new Error("Failed to update call");
}
}