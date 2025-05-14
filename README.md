# Solum Challenge: Call Evaluation Dashboard

This project is a web application designed to help QA teams evaluate and track call performance. It integrates a **Next.js frontend** with a **FastAPI backend** to provide a seamless experience for managing and analyzing call data.

## Features

1. **Call Display**:
   - Clean and intuitive interface to display call details.
   - Includes key information such as call duration, start time, and recording URL.

2. **Call Evaluation**:
   - Allows QA teams to listen to calls and provide evaluations.
   - Displays LLM (Large Language Model) evaluations alongside human evaluations (if available).

3. **Performance Dashboard**:
   - A dashboard to track agent performance over time.
   - Metrics can be broken down by agent, company, or other relevant categories.

4. **Custom Metrics**:
   - Proposes and tracks key metrics to measure performance and quality, such as:
     - Average call duration.
     - QA evaluation scores.
     - LLM vs. human evaluation agreement rate.
     - Number of calls handled per agent.

---

## Getting Started

### Prerequisites

- **Node.js** (v20 or later)
- **Python** (v3.12 or later)
- **pnpm** (or npm/yarn)
- **virtualenv** (for Python environment management)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/solum-challenge.git
   cd solum-challenge
   ```

2. Set the required environment variables:
   - Create a `.env.local` file in the root directory for the frontend:
   - Create a `.env` file in the backend directory for any required backend environment variables.

3. Install frontend dependencies:
   ```bash
   pnpm install
   ```

4. Set up the Python backend:
   ```bash
   virtualenv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

---

### Running the Application Locally

1. Start the FastAPI backend:
   ```bash
   pnpm fastapi:dev
   ```

2. Start the Next.js frontend:
   ```bash
   pnpm next:dev
   ```

3. Run both frontend and backend simultaneously:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

### Deployment

1. **Frontend**:
   - Deploy the Next.js application to [Vercel](https://vercel.com/).

2. **Backend**:
   - Deploy the FastAPI backend to a cloud provider (e.g., Vercel, AWS, or Heroku).
   - Ensure all required environment variables are configured.

---

## Key Metrics

The following metrics are tracked to measure performance and quality:

1. **Average Call Duration**:
   - Tracks the average length of calls to identify trends.

2. **QA Evaluation Scores**:
   - Measures the quality of calls based on QA feedback.

3. **LLM vs. Human Evaluation Agreement**:
   - Compares LLM evaluations with human evaluations to assess alignment.

4. **Calls Handled per Agent**:
   - Tracks the number of calls handled by each agent over time.

5. **Call Resolution Rate**:
   - Measures the percentage of calls successfully resolved.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Vercel Documentation](https://vercel.com/docs)

Feel free to contribute or raise issues to improve the project!