# Phase 8: Monitoring - Context

## Approach
- Deploy Prometheus and Grafana to the Kubernetes cluster to fulfill the observability requirement.
- Create Kubernetes manifests for Prometheus and Grafana in the `k8s/` directory.
- Update the Node.js backend to expose a `/metrics` endpoint using `prom-client` so Prometheus can scrape CPU, memory, and HTTP response metrics.
- Update `.github/workflows/security-pipeline.yml` to deploy the monitoring components to the Kind cluster alongside the main application.

## Decisions
- **Monitoring Stack:** We will deploy Prometheus and Grafana using basic Kubernetes manifests. For this portfolio project, this is sufficient to demonstrate observability and DevOps best practices without the complexity of a full Helm chart deployment.
- **Backend Instrumentation:** We will add the `prom-client` library to the `backend/` application to provide standard Node.js metrics automatically, exposing them on the `/metrics` route.
- **Grafana Configuration:** We will set up a basic Grafana deployment with a NodePort service so it's accessible.
- **Prometheus Scrape Config:** We will configure Prometheus to scrape the backend service.
