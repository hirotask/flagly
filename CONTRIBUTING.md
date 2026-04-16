# Contributing Guide

Thank you for your interest in contributing to this project! 😊
We welcome all kinds of contributions, including bug reports, feature requests, and code improvements.

## Getting Started

Before contributing, please check existing Issues and Pull Requests.  
Your idea or problem may already be discussed.

Even small contributions (such as typo fixes) are welcome.

## AI Usage policy

- Only submit code you fully understand and have tested
- Be prepared to explain your changes
- Do not ignore our issue and PR templates
- Low-quality AI content will be closed immediately

## Setup

1. Clone the repository:

```bash
git clone https://github.com/hirotask/flagly.git
cd flagly
````

2. Install dependencies:

```bash
pnpm install
```

## Issue Guidelines

When creating an Issue, please use the provided template.
Well-structured Issues help us review and respond faster.

## Pull Request Process

1. Fork the repository
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes
4. Ensure everything works as expected
5. Commit your changes
6. Push to your fork:

```bash
git push origin feature/your-feature-name
```

7. Rebase onto the latest origin/develop
8. Open a Pull Request

### What We Expect in a PR

- The change is clearly explained
- It addresses an existing Issue (or includes a clear motivation)
- The scope is focused (avoid large unrelated changes)
- Code follows existing patterns and style


## Coding Guidelines

- Prefer readability over cleverness
- Keep changes minimal and focused
- Follow the existing code style
- Avoid unnecessary dependencies

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

Examples:

```
fix: resolve login error
feat: add search feature
docs: update README
```

## Branching Strategy

This project follows a rebase-based workflow.
Please keep your branch up to date by rebasing it onto the latest `develop` branch instead of merging `develop` into your feature branch.

Before opening or updating a Pull Request:

- rebase your branch onto the latest origin/develop
- resolve conflicts locally
- keep commits clean and focused
- prefer squashing or fixing up minor WIP commits before review

When rewriting history on your own branch, use:

```bash
git push --force-with-lease
```

Please do **not** rebase shared branches that other contributors may be using.


## Final Notes

This project exists thanks to the community.
Your contributions are greatly appreciated!

