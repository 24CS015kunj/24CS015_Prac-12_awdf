# Practical 12: CI/CD Pipeline with GitHub Actions

[![CI Pipeline](https://github.com/username/practical-12-cicd/actions/workflows/ci.yml/badge.svg)](https://github.com/username/practical-12-cicd/actions/workflows/ci.yml)

> **Course:** Advanced Web Development Frameworks (ITUE301)  
> **Institution:** Charotar University of Science and Technology (CHARUSAT)  
> **Faculty:** Faculty of Technology and Engineering (DEPSTAR / CSPIT)  
> **Department:** B.Tech (IT/CE/CSE/AIML)  
> **CO/PO Mapping:** CO5 / PO3, PO5

---

## 🎯 Objective
To automate testing and deployment of the application using a CI/CD pipeline built with **GitHub Actions**.

---

## 🏗️ Architecture & CI Workflow Diagram

```
       git push origin main
                │
                ▼
  GitHub Actions Trigger (`on: push`)
                │
                ▼
      Job: `build-and-test`
      ├── 1. Checkout repository code (actions/checkout@v4)
      ├── 2. Setup Node.js v18 (actions/setup-node@v4)
      ├── 3. Install dependencies (`npm install`)
      ├── 4. Run automated tests (`npm test`)
      └── 5. Report pass / fail status
                │
         ┌──────┴──────┐
         ▼             ▼
   Green Check (✓)   Red X (✗)
     [Passed]         [Failed]
```

---

## 🛠️ Tech Stack & Prerequisites
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Testing Frameworks:** Jest & Supertest
- **CI/CD Platform:** GitHub Actions
- **Version Control:** Git & GitHub

---

## 📁 Repository Structure
```
Practical-12/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow definition
├── docs/
│   ├── PRACTICAL_12_MANUAL.md # Detailed laboratory manual & Viva reference
│   └── screenshots/           # Lab journal screenshots
│       └── README.md
├── tests/
│   └── tasks.test.js          # Automated endpoint tests (Jest + Supertest)
├── .gitignore                 # Excludes node_modules and logs
├── app.js                     # Express application & API endpoints
├── package.json               # Dependencies and test scripts
├── server.js                  # HTTP server entry point
└── README.md                  # Project documentation & CI badge
```

---

## 🚀 Step-by-Step Implementation Guide

### 1. Install Dependencies Locally
```bash
npm install
```

### 2. Run Tests Locally
```bash
npm test
```
*Expected Output:*
```text
PASS tests/tasks.test.js
  Task API Endpoints
    ✓ GET /tasks returns 200
    ✓ POST /tasks creates a new task with 201
    ✓ POST /tasks fails with 400 when title is missing

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

### 3. Initialize Git & Push to GitHub
```bash
git init -b main
git add .
git commit -m "feat: setup Task API and GitHub Actions CI workflow"
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/practical-12-cicd.git
git push -u origin main
```

---

## 🧪 Demonstrating Pipeline Failure & Fix

### Step A: Deliberately Break the Test
1. Open `tests/tasks.test.js`.
2. Modify the expected status code in the first test:
   ```javascript
   // Change from 200 to 404:
   expect(res.statusCode).toBe(404);
   ```
3. Commit and push the broken test:
   ```bash
   git add tests/tasks.test.js
   git commit -m "test: deliberate failure to test CI pipeline"
   git push origin main
   ```
4. **Observe GitHub Actions**:
   - Navigate to the **Actions** tab on your GitHub repository.
   - The workflow will fail with a **Red X (✗)**.
   - Click the workflow run and expand the `Run Automated Tests` step to see the Jest assertion error (`Expected: 404, Received: 200`).

### Step B: Fix the Test and Restore Green Status
1. Revert `tests/tasks.test.js` back to the expected status code:
   ```javascript
   expect(res.statusCode).toBe(200);
   ```
2. Commit and push the fix:
   ```bash
   git add tests/tasks.test.js
   git commit -m "fix: correct status code assertion back to 200"
   git push origin main
   ```
3. **Observe GitHub Actions**:
   - The workflow runs again and completes successfully with a **Green Checkmark (✓)**.
   - The status badge on the README updates to **passing**.

---

## 📸 Screenshots Required for Lab Journal / Evaluation

Save the following screenshots inside `docs/screenshots/` and attach them to your lab journal:

| Sr. | Screenshot Name | Required View / Content |
|---|---|---|
| **1** | **Local Test Execution** | Terminal screenshot showing `npm test` passing with 3 tests passed. |
| **2** | **Workflow Configuration** | VS Code showing `.github/workflows/ci.yml`. |
| **3** | **Actions Tab Overview** | GitHub Actions dashboard showing registered CI Pipeline workflows. |
| **4** | **Deliberate Failure Code** | VS Code showing `expect(res.statusCode).toBe(404)` in `tasks.test.js`. |
| **5** | **Failed Pipeline Run** | GitHub Actions UI showing workflow with **Red X** icon. |
| **6** | **Failed Step Logs** | Expanded logs under `Run Automated Tests` showing Jest assertion failure. |
| **7** | **Passed Pipeline Run** | GitHub Actions UI showing workflow with **Green Checkmark (✓)** icon. |
| **8** | **Passed Step Logs** | Expanded logs showing all steps succeeded (`Checkout`, `Setup Node.js`, `npm install`, `npm test`). |
| **9** | **Live Status Badge** | GitHub repository home page showing `CI Pipeline | passing` badge. |

---

## 💡 Key Analysis & Viva Questions

### Q1: What is the difference between Continuous Integration (CI) and Continuous Deployment (CD), and which one does this practical demonstrate?
- **Continuous Integration (CI):** Automates the integration of code changes from multiple contributors into a single repository. Triggers automated builds and tests on every commit/PR to detect bugs early.
- **Continuous Deployment (CD):** Automatically deploys every validated build directly to production environments without human intervention.
- **Demonstration:** This practical demonstrates **Continuous Integration (CI)** because it automatically builds the code, installs dependencies, and runs automated tests to validate software quality, but does not deploy the application to a cloud server.

### Q2: Why does running tests automatically on every push catch problems earlier than testing manually before a release?
1. **Immediate Feedback:** Developers receive test results within minutes of pushing code while the mental model of their changes is fresh.
2. **Isolation of Faults:** Since commits are small, diagnosing which commit or line caused the failure is straightforward.
3. **Eliminates Human Error & Fatigue:** CI tests run consistently across all defined test suites, avoiding skipped tests or manual oversight.
4. **Protects Main Branch:** Prevents regression bugs from polluting the primary codebase.

### Q3: What would happen if the test file path were incorrect? Would the workflow fail at the same step as a genuine test failure?
- **Yes**, the pipeline would fail at the same step (`Run Automated Tests` / `npm test`) because the process exits with a non-zero exit code (`code 1`).
- **Difference in error output:** 
  - A **genuine test failure** displays test assertion errors (`Expected: 404, Received: 200`) with stack traces.
  - An **incorrect path / missing test file** triggers a test runner error (e.g., `No tests found matching pattern` or `Cannot find module`), showing a configuration error rather than assertion failure.

---

## 🌟 Supplementary Solutions

### 1. Adding an ESLint Linter Job Before the Test Job
```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npx eslint .

  build-and-test:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm test
```

### 2. Configure Workflow Only on Pull Requests targeting `main`
```yaml
on:
  pull_request:
    branches: [main]
```

### 3. README Status Badge Markdown Format
```markdown
[![CI Pipeline](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)
```
*(Replace `<OWNER>` and `<REPO>` with your actual GitHub username and repository name).*
