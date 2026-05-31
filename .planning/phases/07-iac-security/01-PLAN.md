---
wave: 1
depends_on: []
files_modified:
  - terraform/main.tf
  - .github/workflows/security-pipeline.yml
autonomous: true
---

# Phase 07: IaC Security

## Goal
Populate the `terraform/` directory with Infrastructure as Code (IaC) using Terraform. Create `terraform/main.tf` to define an AWS VPC, an EC2 instance, and a Security Group with intentional security misconfigurations. Update `.github/workflows/security-pipeline.yml` to integrate Checkov to scan the Terraform files.

## Tasks

```xml
<task>
  <id>01-create-terraform-main</id>
  <title>Create Terraform main.tf with intentional misconfigurations</title>
  <description>Create terraform/main.tf to define an AWS VPC, an EC2 instance, and a Security Group. Ensure the Security Group allows ingress from 0.0.0.0/0 on all ports and leave EBS volumes unencrypted to trigger Checkov alerts.</description>
  <read_first>
    - .planning/phases/07-iac-security/CONTEXT.md
  </read_first>
  <action>Create terraform/main.tf with AWS provider, VPC, EC2 instance, and insecure Security Group</action>
  <acceptance_criteria>
    - file terraform/main.tf exists
    - terraform/main.tf contains 'ingress' with 'cidr_blocks = ["0.0.0.0/0"]'
  </acceptance_criteria>
</task>

<task>
  <id>02-update-pipeline-checkov</id>
  <title>Integrate Checkov into the GitHub Actions pipeline</title>
  <description>Update .github/workflows/security-pipeline.yml to add a step that runs the bridgecrewio/checkov-action against the terraform/ directory. Configure it with soft_fail: true so it doesn't block the pipeline.</description>
  <read_first>
    - .planning/phases/07-iac-security/CONTEXT.md
    - .github/workflows/security-pipeline.yml
  </read_first>
  <action>Edit .github/workflows/security-pipeline.yml to add Checkov step</action>
  <acceptance_criteria>
    - grep -q 'bridgecrewio/checkov-action' .github/workflows/security-pipeline.yml
    - grep -q 'soft_fail' .github/workflows/security-pipeline.yml
  </acceptance_criteria>
</task>
```

## Verification
- Terraform file `terraform/main.tf` is created with an intentionally vulnerable security group and unencrypted EBS.
- `.github/workflows/security-pipeline.yml` has the Checkov action configured correctly.
- Must-haves: `terraform/main.tf`, checkov step in `.github/workflows/security-pipeline.yml`.
