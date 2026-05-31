# Plan 01 Summary

## Completed Tasks
- Created `terraform/main.tf` with AWS provider, VPC, EC2 instance, and an insecure Security Group with `0.0.0.0/0` ingress rules, as well as an unencrypted EBS volume.
- Integrated `bridgecrewio/checkov-action` into `.github/workflows/security-pipeline.yml` configured with `soft_fail: true` against the `terraform/` directory.

## Decisions Made
- Added the Checkov action to the existing `sast` job in the security pipeline instead of creating a new job to minimize pipeline complexity while still fulfilling the requirement.

## Next Steps
- Validate that Checkov correctly scans the terraform definitions and surfaces alerts for the intentional misconfigurations in the next CI pipeline run.
