'use server';

export interface MetricEvaluationStatus {
  percentage_evaluation_completed: number;
  percentage_evaluation_not_completed: number;
}

export async function getMetricEvaluationStatus(): Promise<MetricEvaluationStatus> {
  const endpoint = `${process.env.BACKEND_HOST}/api/metrics/evaluation_status`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch evaluation status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Fetched metric evaluation status:', data);

  return {
    percentage_evaluation_completed: data.percentage_evaluation_completed,
    percentage_evaluation_not_completed: data.percentage_evaluation_not_completed,
  };
}