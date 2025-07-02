# Call Confirmation GenAI Copy

This repository contains a Python application with a backend and a frontend, designed for deployment on Google Cloud Run.

## Deployment to Google Cloud Run

This project can be deployed to Google Cloud Run using Google Cloud Build. A `cloudbuild.yaml` file has been provided in the root of this repository to automate the build and deployment process for both the backend and frontend services.

### Prerequisites

Before you begin, ensure you have the following:

1.  **Google Cloud Project**: A Google Cloud project with billing enabled.
2.  **Google Cloud SDK**: Installed and configured on your local machine. Ensure you are authenticated and have set your project.
    ```bash
    gcloud auth login
    gcloud config set project YOUR_PROJECT_ID
    ```
3.  **Cloud Build API Enabled**: Ensure the Cloud Build API is enabled in your Google Cloud Project.
4.  **Cloud Run API Enabled**: Ensure the Cloud Run API is enabled in your Google Cloud Project.

### Deployment Steps

To deploy the application to Google Cloud Run, follow these steps:

1.  **Navigate to the repository root**:
    ```bash
    cd CallConfirmation_GenAICopy
    ```

2.  **Submit the build to Cloud Build**:
    From the root of this repository, execute the following command:
    ```bash
    gcloud builds submit --config cloudbuild.yaml .
    ```

    This command will:
    *   Build the Docker image for the `voiceconfirm-backend` service.
    *   Push the backend image to Google Container Registry (GCR).
    *   Deploy the `voiceconfirm-backend` service to Google Cloud Run.
    *   Build the Docker image for the `voiceconfirm-frontend` service.
    *   Push the frontend image to Google Container Registry (GCR).
    *   Deploy the `voiceconfirm-frontend` service to Google Cloud Run.

### Post-Deployment

After successful deployment, Google Cloud Build will provide URLs for both your backend and frontend services. You can access your deployed applications via these URLs.

**Note**: The `--allow-unauthenticated` flag is used in the `cloudbuild.yaml` for simplicity, making the services publicly accessible. For production environments, consider more restrictive access controls.
