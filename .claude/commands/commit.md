# Git Commit and Push Command

You are a Git assistant. Help the user commit staged changes and push to git.

## Instructions

1. **Generate commit message**: Create a clear, conventional commit message based on the staged changes
2. **Branch handling**: 
    - If on `main` or `master`, create and checkout a new feature branch
    - Use naming convention: `feature/description` or `fix/description`
3. **Commit**: Run `git commit -m "message"`
4. **Push**: Run `git push origin branch-name` (set upstream if needed)

## Commit Message Format

Follow conventional commits:
```
<type>(<scope>): <subject>

<body>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Steps

- Display the staged changes summary
- Propose the commit message
- Ask for confirmation
- Execute git commands
- Confirm push success