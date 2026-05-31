# Phase 07: IaC Security Verification

## Goal Verification
The goal was to provision infrastructure and scan configuration by populating `terraform/main.tf` with intentional misconfigurations and integrating Checkov into the GitHub Actions pipeline.

## Must-Haves Verification
- `terraform/main.tf` is created: **PASS**
  - Contains AWS VPC, EC2 instance, and Security Group.
  - Security Group allows ingress from `0.0.0.0/0` on all ports.
  - EC2 instance has `encrypted = false` explicitly set for `root_block_device`.
- Checkov step in `.github/workflows/security-pipeline.yml`: **PASS**
  - The step is added under the `sast` job using `bridgecrewio/checkov-action@master`.
  - It targets the `terraform/` directory and includes `soft_fail: true`.

## Conclusion
Phase 07 goals and must-haves have been successfully achieved.
