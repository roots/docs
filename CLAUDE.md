# Docs Conventions

## Markdown bash code blocks

Each bash code block must contain exactly one command. Never combine multiple commands in a single block. On the roots.io front-end, bash code blocks have a clipboard copy button that only supports single lines.

Good:

````markdown
```bash
composer require example/package
```

```bash
wp plugin activate example
```
````

Bad:

````markdown
```bash
composer require example/package
wp plugin activate example
```
````
