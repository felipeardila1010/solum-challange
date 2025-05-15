import DashboardClient from './dashboard-client';
import { getMetricEvaluationStatus } from 'app/api/metrics/metrics-api';

export default async function DashboardPage() {
  // Fetch data on the server
  const metricEvaluationStatus = await getMetricEvaluationStatus();

  return <DashboardClient metricEvaluationStatus={metricEvaluationStatus} />;
}