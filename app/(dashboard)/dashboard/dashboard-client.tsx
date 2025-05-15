'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './page.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardClientProps {
  metricEvaluationStatus: {
    percentage_evaluation_completed: number;
    percentage_evaluation_not_completed: number;
  };
}

export default function DashboardClient({
  metricEvaluationStatus
}: DashboardClientProps) {
  // Data for the chart
  const data = {
    labels: ['Complete evaluation', 'Non-complete evaluation'],
    datasets: [
      {
        data: [
          metricEvaluationStatus.percentage_evaluation_completed,
          metricEvaluationStatus.percentage_evaluation_not_completed
        ],
        backgroundColor: ['#4CAF50', '#F44336'], // Colors for the chart
        hoverBackgroundColor: ['#45A049', '#E53935']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false // Permite ajustar el tamaño del gráfico
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>% of calls with complete evaluation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.chartContainer}>
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}