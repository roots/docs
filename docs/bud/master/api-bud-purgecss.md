# @roots/bud-purgecss

## Functions

### `Const` `Export assignment` config

▸ **config**(`this`: Bud, `options`: BudPurgeOptions): *Bud*

*Defined in [api.ts:56](https://github.com/roots/bud-support/blob/f2da518/packages/bud-purgecss/src/api.ts#L56)*

## bud.purge

Purge unused CSS from compiled stylesheets

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

```js
bud.purge({
  enabled: bud.inProduction,
  content: [bud.project('resources/views/**')],
  allow: require('purgecss-with-wordpress').whitelist,
  allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
})
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | Bud |
`options` | BudPurgeOptions |

**Returns:** *Bud*

___

### `Const` purgecss

▸ **purgecss**(`bud`: Bud): *ExtensionInterface*

Defined in index.ts:12

Bud extension: purgecss

Adds purgecss support to the Bud framework.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | Bud |

**Returns:** *ExtensionInterface*
