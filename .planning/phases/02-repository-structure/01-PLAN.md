---
wave: 1
depends_on: []
files_modified:
  - k8s/.gitkeep
  - terraform/.gitkeep
  - docker/.gitkeep
  - security/zap/.gitkeep
  - security/semgrep/.gitkeep
  - .github/workflows/.gitkeep
autonomous: true
---

# Phase 02: Repository Structure Plan

## Verification Criteria
- [ ] `k8s/.gitkeep` file exists.
- [ ] `terraform/.gitkeep` file exists.
- [ ] `docker/.gitkeep` file exists.
- [ ] `security/zap/.gitkeep` file exists.
- [ ] `security/semgrep/.gitkeep` file exists.
- [ ] `.github/workflows/.gitkeep` file exists.

## Must Haves
- Create required directory structure for DevSecOps pipeline and infrastructure.
- Use `.gitkeep` files so that Git tracks these empty directories.
- Strictly structural plumbing: no configuration files or manifests should be implemented yet.

## Tasks

```xml
<task>
  <read_first>
    - .planning/phases/02-repository-structure/CONTEXT.md
  </read_first>
  <action>
    Create the necessary empty directories (`k8s`, `terraform`, `docker`, `security/zap`, `security/semgrep`, `.github/workflows`) and place a `.gitkeep` file in each to ensure they are tracked by Git. Use standard filesystem operations (e.g. `mkdir -p` and `touch`).
  </action>
  <acceptance_criteria>
    - `ls -l k8s/.gitkeep` shows the file exists.
    - `ls -l terraform/.gitkeep` shows the file exists.
    - `ls -l docker/.gitkeep` shows the file exists.
    - `ls -l security/zap/.gitkeep` shows the file exists.
    - `ls -l security/semgrep/.gitkeep` shows the file exists.
    - `ls -l .github/workflows/.gitkeep` shows the file exists.
  </acceptance_criteria>
</task>
```
