---
description: Generate a runtime chunk.
---

# bud.inlineManifest

Generate a runtime chunk intended to be inlined directly on the page. Useful for dynamic imports.

## Usage

```js
bud.inlineManifest()
```

## Signature

```ts
function (name: string): Bud
```

## Parameters

Name | Type |
------ | ------ |
`name?` | string |

## Returns

The Bud instance

## Related

- [bud.vendor](config-vendor.md)
