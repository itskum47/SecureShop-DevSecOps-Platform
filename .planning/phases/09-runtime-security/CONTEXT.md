# Phase 9: Runtime Security - Context

## Approach
- Deploy Falco (a cloud-native runtime security tool) to the Kubernetes cluster to fulfill the runtime protection requirement.
- Configure custom detection rules for shell execution in a container, privilege escalation, and suspicious processes.
- We will deploy Falco using its official Helm chart during the CI pipeline (`.github/workflows/security-pipeline.yml`).

## Decisions
- **Deployment Method:** Instead of managing raw Falco DaemonSet manifests manually, we will add a step to the GitHub Actions pipeline to install Falco via Helm. This is the industry-standard approach for deploying Falco and is easier to maintain.
- **Custom Rules:** We will create a `k8s/falco-custom-rules-configmap.yaml` (or pass a values file to Helm) containing our specific rules for shell execution and privilege escalation. To keep things clean, we will create a `helm/falco-values.yaml` file to configure the Helm deployment and inject our custom rules.
- **Scope:** The pipeline will deploy Falco to the `kind` cluster and apply the custom rules. We won't set up complex external alerting (like Slack or PagerDuty); logging to stdout is sufficient for this portfolio project.
- **Pipeline Updates:** We will need to install Helm in the GitHub Actions runner (or ensure it's available) and run `helm repo add` and `helm install` for Falco.
