---
wave: 1
depends_on: []
files_modified:
  - helm/falco-values.yaml
  - .github/workflows/security-pipeline.yml
autonomous: true
---

# Phase 09: Runtime Security

## Tasks

<task>
<read_first>
- .planning/phases/09-runtime-security/CONTEXT.md
</read_first>
<action>
Create `helm/falco-values.yaml` to configure the Falco Helm deployment.
Define custom Falco rules within this file using the `customRules` key.
The rules must detect:
1. Shell execution in a container
2. Privilege escalation
3. Suspicious processes
Make sure the YAML structure correctly matches the Falco Helm chart values format for custom rules.
</action>
<acceptance_criteria>
- `helm/falco-values.yaml` is created.
- The file contains a `customRules` section with rules for shell execution, privilege escalation, and suspicious processes.
- The YAML syntax is valid.
</acceptance_criteria>
</task>

<task>
<read_first>
- .github/workflows/security-pipeline.yml
- helm/falco-values.yaml
</read_first>
<action>
Update the Kubernetes deployment job in `.github/workflows/security-pipeline.yml` to deploy Falco.
Add steps to:
1. Add the Falco Helm repository: `helm repo add falcosecurity https://falcosecurity.github.io/charts` and `helm repo update`.
2. Install Falco using Helm: `helm install falco falcosecurity/falco -f helm/falco-values.yaml --namespace falco --create-namespace`.
Place these steps after the `kind` cluster is set up and the application is deployed.
</action>
<acceptance_criteria>
- `.github/workflows/security-pipeline.yml` contains a step to add the `falcosecurity` Helm repo.
- `.github/workflows/security-pipeline.yml` contains a step to install Falco with the `helm/falco-values.yaml` values file in the `falco` namespace.
</acceptance_criteria>
</task>

## Verification
- Review `helm/falco-values.yaml` to ensure the required custom rules are present.
- Review `.github/workflows/security-pipeline.yml` to verify the Helm installation steps for Falco are correctly integrated into the pipeline.

## must_haves
- [ ] `helm/falco-values.yaml` exists with the defined custom rules.
- [ ] `.github/workflows/security-pipeline.yml` is updated to deploy Falco via Helm.
