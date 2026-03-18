# Secrets, GitHub Setup & Publishing Guide

> Complete setup guide for CI/CD, npm publishing, and branch protection.
> Do this once — then everything is automated.

---

## 1. npm Account & Token (Required for Publishing)

### Step 1 — Create/verify your npm account

1. Go to [npmjs.com](https://www.npmjs.com)
2. Sign in or create account
3. Your username becomes your scope — for `@aravindhan/ui` you need username `aravindhan`
   - If your npm username is different, the publish will fail
   - Check: `npm whoami` in terminal after `npm login`

### Step 2 — Create an npm Access Token

1. On npmjs.com → click your avatar → **Access Tokens**
2. Click **Generate New Token** → choose **Granular Access Token**
3. Settings:
   - Token name: `aravindhan-ui-ci`
   - Expiration: 365 days (or no expiry)
   - Packages and scopes: **Read and write**
   - Select package: `@aravindhan/ui` (or "All packages")
4. Click **Generate Token**
5. **Copy the token immediately** — you won't see it again

> Token format: `npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 2. GitHub Actions Secrets

These go in your **GitHub repo**, not in code.

### How to add secrets:

1. Go to [github.com/AravindS-Wick/aravindhan-ui](https://github.com/AravindS-Wick/aravindhan-ui)
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### Required Secrets

| Secret Name | Value | Purpose |
| --- | --- | --- |
| `NPM_TOKEN` | Your npm access token (`npm_xxx...`) | Auto-publish to npm on release |

That's the only required secret. `GITHUB_TOKEN` is **automatically provided** by GitHub Actions — you don't add it.

### Optional Secrets (nice to have)

| Secret Name | Value | Purpose |
| --- | --- | --- |
| `CODECOV_TOKEN` | From [codecov.io](https://codecov.io) after linking repo | Upload test coverage reports |

---

## 3. Branch Protection Rules (Prevent Direct Pushes to main)

1. Go to repo **Settings** → **Branches** → **Add branch ruleset**
2. Rule name: `Protect main`
3. Target branches: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
     - Add these checks: `Lint`, `Test`, `Build`, `Security`
   - ✅ Restrict who can push (just you)
   - ✅ Do not allow bypassing the above settings
5. Click **Save changes**

---

## 4. First npm Publish (Manual — one time)

Before the automated CI can publish, you need to be logged in to npm locally and the package scope must exist.

```bash
# Login to npm
npm login

# Verify you're logged in as the right user
npm whoami
# should output: aravindhan

# Do a dry run to see what would be published
npm pack --dry-run

# Publish the first version manually (v0.0.1)
# Make sure dist/ is built first
npm run build
npm publish --access public
```

After this first publish, **all future releases are fully automated** via GitHub Actions on every merge to `main`.

---

## 5. GitHub Actions Publish Flow (Automatic after setup)

Once `NPM_TOKEN` is set, every merge to `main` triggers this:

```
merge to main
  → release.yml runs
  → builds tokens + CSS
  → semantic-release reads commits since last release
  → determines version bump (feat = minor, fix = patch, BREAKING = major)
  → bumps package.json version
  → generates CHANGELOG.md entry
  → creates GitHub release + tag
  → publishes to npm automatically
  → commits the version bump back to main
```

### Commit messages that trigger a release:

```bash
feat: add new component          → v0.1.0 (minor bump)
fix: correct button hover state  → v0.0.2 (patch bump)
docs: update readme              → no release
chore: update deps               → no release
BREAKING CHANGE: renamed tokens  → v1.0.0 (major bump)
```

---

## 6. Local Development Workflow

```bash
# Clone and install
git clone https://github.com/AravindS-Wick/aravindhan-ui.git
cd aravindhan-ui
npm install

# Build everything
npm run build

# Run tests
npm test

# Lint
npm run lint

# Watch mode (rebuilds on save)
npm run dev
```

### Creating a new feature (branch workflow)

```bash
# Always start from main with latest
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/my-feature-name

# Do your work...

# Lint + test before committing
npm run lint && npm test

# Commit with semantic message
git add -A
git commit -m "feat: describe what you added"

# Push branch
git push origin feature/my-feature-name

# Open PR on GitHub → CI runs → merge when green
# Then pull main again for next feature
git checkout main
git pull origin main
```

---

## 7. Installing the Package in Your Projects

Once published, install in any project:

```bash
npm install @aravindhan/ui
```

### Usage in different project types

**Plain HTML:**
```html
<link rel="stylesheet" href="node_modules/@aravindhan/ui/css">
```

**React / Vite / Next.js:**
```js
// in main.js or _app.js
import '@aravindhan/ui/css';
```

**SCSS project:**
```scss
@use '@aravindhan/ui/scss';
```

**Tokens only (no full CSS):**
```js
import '@aravindhan/ui/tokens/css';
```

---

## 8. Package Renaming (Future)

If you ever want to rename from `@aravindhan/ui` to something else:

```bash
# 1. Create new package with new name (new repo or same repo, new package.json name)
# 2. Deprecate the old one
npm deprecate @aravindhan/ui@"*" "This package has been moved to @newscope/newname. Please update."

# 3. Publish new package
npm publish --access public
```

Old users get a deprecation warning on `npm install`. New users use the new package. No data is lost.

---

## 9. Checking CI Status

After pushing a branch or opening a PR:

- Go to [github.com/AravindS-Wick/aravindhan-ui/actions](https://github.com/AravindS-Wick/aravindhan-ui/actions)
- Each workflow run shows: Lint, Test, Security, Build results
- Red X = something failed — click to see the logs
- Green check = all good, safe to merge
