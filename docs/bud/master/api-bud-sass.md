# @roots/bud-sass

## Functions

### `Const` config

▸ **config**(`this`: any, `enabled`: boolean, `options?`: any): *any*

*Defined in [api.ts:14](https://github.com/roots/bud-support/blob/f2da518/packages/bud-sass/src/api.ts#L14)*

## bud.scss

Enable/disable scss support

```js
bud.scss(true)
```

```js
bud.scss(false)
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |
`enabled` | boolean |
`options?` | any |

**Returns:** *any*

___

### `Const` rule

▸ **rule**(`bud`: Bud): *object*

Defined in index.ts:10

Sass webpack module rule.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | Bud |

**Returns:** *object*

* **exclude**: *any* = bud.patterns.get('vendor')

* **test**: *RegExp‹›* = /\.s(c|a)ss$/

* **use**: *any[]* = [
    bud.uses.get('miniCss')(bud),
    bud.uses.get('css')(bud),
    bud.uses.get('resolveUrl')(bud),
    bud.uses.get('postCss')(bud),
    use(bud),
  ]

___

### `Const` `Export assignment` sass

▸ **sass**(`bud`: Bud): *ExtensionInterface*

Defined in index.ts:29

Bud extension: sass

Adds sass support to the Bud framework.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | Bud |

**Returns:** *ExtensionInterface*
