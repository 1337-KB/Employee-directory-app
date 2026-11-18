# Upgrade Plan: employee-api (Java 17 → 21)

- **Generated**: 2026-11-03 10:06:58
- **HEAD Branch**: N/A (git not available)
- **HEAD Commit ID**: N/A (git not available)

## Available Tools

**JDKs**
- JDK 17: (current project JDK, used for baseline)
- JDK 21: **<TO_BE_INSTALLED>** (required for upgrade target)

**Build Tools**
- Maven Wrapper: 3.10.0 (compatible with Java 21, no upgrade needed)

## Guidelines

> Note: Upgrade Java runtime from 17 to 21 (latest stable LTS). Spring Boot 4.1.2 already supports Java 21. Auto-execution mode enabled for hands-off operation.

## Options

- Working branch: appmod/java-upgrade-<SESSION_ID>
- Run tests before and after the upgrade: true

## Upgrade Goals

- Upgrade Java runtime from 17 to 21 (latest stable LTS)

## Technology Stack

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| -------------------- | ------- | -------------- | --------------- |
| Java | 17 | 21 | User requested |
| Spring Boot | 4.1.2 | 4.1.2 | Already at latest; supports Java 21 |
| Maven (wrapper) | 3.10.0 | 3.9.0+ | Compatible; no upgrade needed |
| JUnit 5 | 5.10.x | 5.10.x | Already compatible with Java 21 |

## Derived Upgrades

- **Java 21 target**: No additional framework upgrades required. Spring Boot 4.1.2 is modern (2024 release) and fully compatible with Java 21.

## Impact Analysis

### Dependency Changes

| File | Dependency | Current | Action | Target | Reason |
| ---- | ---------- | ------- | ------ | ------ | ------ |
| pom.xml | java.version property | 17 | upgrade | 21 | User target |

### Source Code Changes

No source code changes required. The project uses only standard Spring Boot APIs compatible with Java 21.

| File | Location | Current | Required Change | Reason |
| ---- | -------- | ------- | --------------- | ------ |
| (none) | - | - | - | No breaking API changes between Java 17 and 21 |

### Configuration Changes

No configuration changes required. Spring Boot 4.1.2 has no deprecated properties affecting Java 21.

### CI/CD Changes

No CI/CD files detected in this project (no Dockerfile, workflows, or pipelines).

### Risks & Warnings

- **Low risk**: Spring Boot 4.1.2 is a recent release (2024) designed for modern Java versions. Java 21 is a stable LTS released in September 2023. No known compatibility issues.
- **Minimal codebase**: Project has only 2 Java source files (main application class and test class), both using standard Spring Boot annotations with no internal APIs or reflection into java.base.

## Upgrade Steps

- **Step 1: Setup Environment**
  - **Rationale**: Install JDK 21 required for the upgrade target
  - **Changes to Make**: Install JDK 21
  - **Verification**: `#appmod-list-jdks` shows JDK 21 available

- **Step 2: Setup Baseline**
  - **Rationale**: Capture baseline metrics on current Java 17 before upgrading
  - **Changes to Make**: Compile and test with current JDK 17
  - **Verification**: `mvn clean compile test-compile` and `mvn clean test` on Java 17

- **Step 3: Upgrade Java Version in pom.xml**
  - **Rationale**: Update the `java.version` property from 17 to 21
  - **Changes to Make**: Edit pom.xml `<java.version>` property from 17 to 21
  - **Verification**: `mvn clean test-compile -q` with JDK 21 — expect SUCCESS

- **Step 4: Final Validation**
  - **Rationale**: Verify all goals met, resolve any issues, run full test suite
  - **Changes to Make**: Full compilation and test suite execution
  - **Verification**: `mvn clean test` — expect 100% pass rate or baseline pass rate match

