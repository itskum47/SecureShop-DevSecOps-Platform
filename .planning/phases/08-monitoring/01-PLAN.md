---
wave: 1
depends_on: []
files_modified:
  - backend/package.json
  - backend/server.js
  - k8s/prometheus-configmap.yaml
  - k8s/prometheus-deployment.yaml
  - k8s/prometheus-service.yaml
  - k8s/grafana-datasource-configmap.yaml
  - k8s/grafana-dashboard-configmap.yaml
  - k8s/grafana-deployment.yaml
  - k8s/grafana-service.yaml
  - .github/workflows/security-pipeline.yml
autonomous: true
---

# Phase 08: Monitoring

## Verification Criteria
- `backend/package.json` includes `prom-client` and `express-prom-bundle`.
- `backend/server.js` exposes the `/metrics` endpoint and tracks response times.
- Kubernetes manifests for Prometheus and Grafana are created in the `k8s/` directory.
- Prometheus configuration targets the backend service and kube-state-metrics.
- Grafana automatically provisions the Prometheus data source and a dashboard for CPU, Memory, Pod Restarts, and Response Time.
- `.github/workflows/security-pipeline.yml` handles deployment of `kube-state-metrics` and the monitoring components.

## Must Haves
- The backend application must expose Prometheus metrics including HTTP response times.
- Prometheus must scrape metrics from the backend service and `kube-state-metrics`.
- Grafana must be deployed with pre-configured dashboards visualizing the required metrics.
- The pipeline must deploy the monitoring stack along with the application.

## Tasks

```xml
<task>
  <id>1</id>
  <title>Instrument Backend with express-prom-bundle</title>
  <read_first>backend/package.json, backend/server.js</read_first>
  <action>
    Modify `backend/package.json` to add `"prom-client": "^15.0.0"` and `"express-prom-bundle": "^7.0.0"` to dependencies. 
    Modify `backend/server.js` to use `express-prom-bundle` middleware which automatically tracks HTTP response times and exposes the `/metrics` route. Ensure `promClient.collectDefaultMetrics()` is also active if needed.
  </action>
  <acceptance_criteria>
    grep -q "express-prom-bundle" backend/package.json && grep -q "prom-bundle" backend/server.js
  </acceptance_criteria>
</task>

<task>
  <id>2</id>
  <title>Create Prometheus Manifests</title>
  <read_first>k8s/backend-service.yaml</read_first>
  <action>
    Create `k8s/prometheus-configmap.yaml` to define a ConfigMap with a `prometheus.yml` file that sets up scrape_configs for `backend-service:5000` and `kube-state-metrics.kube-system.svc.cluster.local:8080` (for pod restarts and cluster metrics).
    Create `k8s/prometheus-deployment.yaml` with a Deployment using the `prom/prometheus` image and mounting the ConfigMap.
    Create `k8s/prometheus-service.yaml` exposing the Prometheus deployment on port 9090.
  </action>
  <acceptance_criteria>
    ls k8s/prometheus-configmap.yaml k8s/prometheus-deployment.yaml k8s/prometheus-service.yaml && grep -q "backend-service" k8s/prometheus-configmap.yaml
  </acceptance_criteria>
</task>

<task>
  <id>3</id>
  <title>Create Grafana Dashboards and Provisioning</title>
  <read_first>k8s/prometheus-service.yaml</read_first>
  <action>
    Create `k8s/grafana-datasource-configmap.yaml` to auto-provision Prometheus as a data source.
    Create `k8s/grafana-dashboard-configmap.yaml` containing a basic dashboard JSON that visualizes CPU, Memory, Pod Restarts, and Response Time.
    Create `k8s/grafana-deployment.yaml` using the `grafana/grafana` Docker image, ensuring it mounts the provisioning ConfigMaps so the dashboard loads automatically.
    Create `k8s/grafana-service.yaml` exposing the Grafana deployment on port 3000.
  </action>
  <acceptance_criteria>
    ls k8s/grafana-datasource-configmap.yaml k8s/grafana-dashboard-configmap.yaml k8s/grafana-deployment.yaml k8s/grafana-service.yaml
  </acceptance_criteria>
</task>

<task>
  <id>4</id>
  <title>Update Security Pipeline for Monitoring Stack</title>
  <read_first>.github/workflows/security-pipeline.yml</read_first>
  <action>
    Modify `.github/workflows/security-pipeline.yml`. In the `deploy-kind` job, add a step to deploy `kube-state-metrics` (e.g., `kubectl apply -f https://github.com/kubernetes/kube-state-metrics/releases/download/v2.10.0/standard/`) before applying the `k8s/` directory. Increase the timeout of the `kubectl wait` command to `--timeout=300s` to account for the additional images.
  </action>
  <acceptance_criteria>
    grep -q "kube-state-metrics" .github/workflows/security-pipeline.yml && grep -q "timeout=300s" .github/workflows/security-pipeline.yml
  </acceptance_criteria>
</task>
```
