# Phase 7: IaC Security - Context

## Approach
- Populate the `terraform/` directory with Infrastructure as Code (IaC) using Terraform.
- Create `terraform/main.tf` to define an AWS VPC, an EC2 instance, and a Security Group.
- Incorporate intentional security misconfigurations in the Terraform code (e.g., a Security Group allowing ingress from `0.0.0.0/0` on all ports, or unencrypted EBS volumes) to demonstrate the effectiveness of the DevSecOps IaC scanning tool.
- Update `.github/workflows/security-pipeline.yml` to integrate Checkov to scan the Terraform files.

## Decisions
- **Infrastructure Scope:** A basic AWS VPC, EC2 instance, and Security Group. This provides a realistic target for Checkov without overcomplicating the portfolio project with full EKS provisioning.
- **Checkov Action:** Use the official `bridgecrewio/checkov-action` to scan the `terraform/` directory.
- **Failure Handling:** Since the Terraform code will deliberately contain insecure configurations, we will configure the Checkov action with `soft_fail: true` (or equivalent) so that it detects the issues and generates a report, but does not block the pipeline from completing successfully.
- **Scope:** The Terraform code will only be checked by Checkov; it will not be actually applied (`terraform apply`) in the pipeline, which avoids AWS credential requirements and costs.
