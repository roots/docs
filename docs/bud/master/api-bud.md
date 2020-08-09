# @roots/bud

## Type aliases

###  Bud

Ƭ **Bud**: *object*

*Defined in [packages/bud/src/types.ts:13](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/types.ts#L13)*

## Bud - asset management framework.

#### Type declaration:

* **adapters**: *any*

* **alias**: *Api.Alias*

* **auto**: *Api.Auto*

* **babel**: *Api.BabelCfg*

* **bundle**: *Api.Bundle*

* **compile**(): *function*

  * (): *void*

* **compiler**: *any*

* **configs**: *FileContainer*

* **copy**: *Api.Copy*

* **copyAll**: *Api.Copy*

* **debug**: *Api.Debug*

* **dev**: *Api.Dev*

* **devtool**: *Api.Devtool*

* **dist**: *Api.Dist*

* **distPath**: *Api.PathSetter*

* **dump**: *Api.Dump*

* **features**: *Features*

* **glob**: *Api.Glob*

* **hash**: *Api.Hash*

* **hooks**: *[Hooks](README.md#hooks)*

* **hot**: *Api.Hot*

* **inDevelopment**: *boolean*

* **inProduction**: *boolean*

* **inlineManifest**: *Api.InlineManifest*

* **loaders**: *any*

* **logger**: *any*

* **map**: *Api.SourceMap*

* **mini**: *Api.Mini*

* **mode**: *Configuration["mode"]*

* **options**: *Options*

* **paths**: *Paths*

* **patterns**: *any*

* **plugins**: *any*

* **postCss**: *Api.PostCss*

* **preset**: *Api.Preset*

* **project**: *Api.Project*

* **projectPath**: *Api.PathSetter*

* **publicPath**: *Api.PathSetter*

* **purge**: *Api.Purge*

* **rules**: *any*

* **splitting**: *Api.Splitting*

* **src**: *Api.Src*

* **srcPath**: *Api.PathSetter*

* **sync**: *Api.Sync*

* **target**: *Api.Target*

* **terser**: *Api.Terser*

* **use**: *Api.Use*

* **util**: *Util*

* **vendor**: *Api.Vendor*

* **watch**: *Api.Watch*

___

###  BudRenderer

Ƭ **BudRenderer**: *function*

*Defined in [packages/bud/src/compiler/types.ts:35](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/types.ts#L35)*

BudRenderer

**`param`**

**`param`**

**`returns`**

#### Type declaration:

▸ (`config`: [Bud](README.md#bud), `webpackConfig`: Configuration): *void*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Bud](README.md#bud) |
`webpackConfig` | Configuration |

___

###  Hooks

Ƭ **Hooks**: *object*

*Defined in [packages/bud/src/hooks/types.ts:9](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/hooks/types.ts#L9)*

## bud.hooks

#### Type declaration:

* **call**(): *function*

  * (`name`: string, `params?`: any): *void*

* **called**: *string[]*

* **entries**(): *function*

  * (): *any[]*

* **filter**(): *function*

  * (`name`: string, `value`: any): *any*

* **init**(): *function*

  * (`any`: any): *[Hooks](README.md#hooks)*

* **logger**: *any*

* **make**(): *function*

  * (`any`: any): *any*

* **on**(): *function*

  * (`name`: string, `callback`: function): *void*

* **registered**: *RegisteredHooks*

___

###  State

Ƭ **State**: *object*

*Defined in [packages/bud/src/repositories/types.ts:12](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/types.ts#L12)*

Mitch, all together.

#### Type declaration:

* **configs**: *Configs*

* **features**: *Features*

* **flags**: *Flags*

* **options**: *Options*

* **paths**: *Paths*

## Variables

### `Const` cwd

• **cwd**: *Directory* = process.cwd()

*Defined in [packages/bud/src/repositories/paths.ts:9](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L9)*

Current working dir

___

### `Const` framework

• **framework**: *Directory* = resolve(__dirname, '../')

*Defined in [packages/bud/src/repositories/paths.ts:14](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L14)*

Bud framework dir.

## Functions

### `Const` bootstrap

▸ **bootstrap**(): *void*

Defined in index.ts:16

Bud framework.

**Returns:** *void*

___

### `Const` controller

▸ **controller**(`bud`: [Bud](README.md#bud)): *Controller*

*Defined in [packages/bud/src/repositories/plugins/controller.ts:8](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/plugins/controller.ts#L8)*

Plugin controller.

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](README.md#bud) |

**Returns:** *Controller*

___

### `Const` devServer

▸ **devServer**(`bud`: [Bud](README.md#bud)): *object*

*Defined in [packages/bud/src/compiler/webpack/devServer.ts:7](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/devServer.ts#L7)*

Dev server

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bud` | [Bud](README.md#bud) |   |

**Returns:** *object*

* **bud**(): *object*

  * **adapters**: *any*

  * **alias**: *Api.Alias*

  * **auto**: *Api.Auto*

  * **babel**: *Api.BabelCfg*

  * **bundle**: *Api.Bundle*

  * **compile**(): *function*

    * (): *void*

  * **compiler**: *any*

  * **configs**: *FileContainer*

  * **copy**: *Api.Copy*

  * **copyAll**: *Api.Copy*

  * **debug**: *Api.Debug*

  * **dev**: *Api.Dev*

  * **devtool**: *Api.Devtool*

  * **dist**: *Api.Dist*

  * **distPath**: *Api.PathSetter*

  * **dump**: *Api.Dump*

  * **features**: *Features*

  * **glob**: *Api.Glob*

  * **hash**: *Api.Hash*

  * **hooks**: *[Hooks](README.md#hooks)*

  * **hot**: *Api.Hot*

  * **inDevelopment**: *boolean*

  * **inProduction**: *boolean*

  * **inlineManifest**: *Api.InlineManifest*

  * **loaders**: *any*

  * **logger**: *any*

  * **map**: *Api.SourceMap*

  * **mini**: *Api.Mini*

  * **mode**: *Configuration["mode"]*

  * **options**: *Options*

  * **paths**: *Paths*

  * **patterns**: *any*

  * **plugins**: *any*

  * **postCss**: *Api.PostCss*

  * **preset**: *Api.Preset*

  * **project**: *Api.Project*

  * **projectPath**: *Api.PathSetter*

  * **publicPath**: *Api.PathSetter*

  * **purge**: *Api.Purge*

  * **rules**: *any*

  * **splitting**: *Api.Splitting*

  * **src**: *Api.Src*

  * **srcPath**: *Api.PathSetter*

  * **sync**: *Api.Sync*

  * **target**: *Api.Target*

  * **terser**: *Api.Terser*

  * **use**: *Api.Use*

  * **util**: *Util*

  * **vendor**: *Api.Vendor*

  * **watch**: *Api.Watch*

* **make**(): *any*

* ### **target**: *object*

  * **devServer**: *any* = bud.options.get('dev')

___

### `Const` dump

▸ **dump**(`obj`: any, `prettierOptions?`: any): *void*

*Defined in [packages/bud/src/util/dump.ts:9](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/util/dump.ts#L9)*

Dump a prettified, syntax-highlighted object

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`prettierOptions?` | any |

**Returns:** *void*

___

### `Const` ensureStr

▸ **ensureStr**(`possibleStr`: any): *any*

*Defined in [packages/bud/src/repositories/paths.ts:19](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L19)*

Src arg

**Parameters:**

Name | Type |
------ | ------ |
`possibleStr` | any |

**Returns:** *any*

___

### `Const` env

▸ **env**(`key`: string | number): *any*

*Defined in [packages/bud/src/api/env.ts:4](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/env.ts#L4)*

**`todo`** env

**Parameters:**

Name | Type |
------ | ------ |
`key` | string &#124; number |

**Returns:** *any*

___

### `Const` general

▸ **general**(`bud`: [Bud](README.md#bud)): *object*

*Defined in [packages/bud/src/compiler/webpack/general.ts:8](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/general.ts#L8)*

General webpack options

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](README.md#bud) |

**Returns:** *object*

* **bud**(): *object*

  * **adapters**: *any*

  * **alias**: *Api.Alias*

  * **auto**: *Api.Auto*

  * **babel**: *Api.BabelCfg*

  * **bundle**: *Api.Bundle*

  * **compile**(): *function*

    * (): *void*

  * **compiler**: *any*

  * **configs**: *FileContainer*

  * **copy**: *Api.Copy*

  * **copyAll**: *Api.Copy*

  * **debug**: *Api.Debug*

  * **dev**: *Api.Dev*

  * **devtool**: *Api.Devtool*

  * **dist**: *Api.Dist*

  * **distPath**: *Api.PathSetter*

  * **dump**: *Api.Dump*

  * **features**: *Features*

  * **glob**: *Api.Glob*

  * **hash**: *Api.Hash*

  * **hooks**: *[Hooks](README.md#hooks)*

  * **hot**: *Api.Hot*

  * **inDevelopment**: *boolean*

  * **inProduction**: *boolean*

  * **inlineManifest**: *Api.InlineManifest*

  * **loaders**: *any*

  * **logger**: *any*

  * **map**: *Api.SourceMap*

  * **mini**: *Api.Mini*

  * **mode**: *Configuration["mode"]*

  * **options**: *Options*

  * **paths**: *Paths*

  * **patterns**: *any*

  * **plugins**: *any*

  * **postCss**: *Api.PostCss*

  * **preset**: *Api.Preset*

  * **project**: *Api.Project*

  * **projectPath**: *Api.PathSetter*

  * **publicPath**: *Api.PathSetter*

  * **purge**: *Api.Purge*

  * **rules**: *any*

  * **splitting**: *Api.Splitting*

  * **src**: *Api.Src*

  * **srcPath**: *Api.PathSetter*

  * **sync**: *Api.Sync*

  * **target**: *Api.Target*

  * **terser**: *Api.Terser*

  * **use**: *Api.Use*

  * **util**: *Util*

  * **vendor**: *Api.Vendor*

  * **watch**: *Api.Watch*

* **make**(): *any*

* ### **target**: *object*

  * **context**: *any* = bud.paths.get('project')

  * **devtool**: *any* = bud.features.enabled('sourceMap') ? bud.options.get('devtool') : false

  * **mode**: *any* = bud.hooks.filter('webpack.mode', bud.mode)

  * **target**: *any* = bud.hooks.filter('webpack.target', bud.options.get('target'))

  * **watch**: *any* = bud.hooks.filter('webpack.watch', bud.features.enabled('watch'))

___

### `Const` injectHot

▸ **injectHot**(`__namedParameters`: object): *any*

*Defined in [packages/bud/src/compiler/renderCompilerDashboard.ts:10](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/renderCompilerDashboard.ts#L10)*

Inject webpack middleware on all entrypoints.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`logger` | any |
`overlay` | any |
`reload` | any |
`webpackConfig` | any |

**Returns:** *any*

___

### `Const` optimization

▸ **optimization**(`bud`: [Bud](README.md#bud)): *object*

*Defined in [packages/bud/src/compiler/webpack/optimization.ts:7](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/optimization.ts#L7)*

Webpack optimization

**Parameters:**

Name | Type |
------ | ------ |
`bud` | [Bud](README.md#bud) |

**Returns:** *object*

* **bud**(): *object*

  * **adapters**: *any*

  * **alias**: *Api.Alias*

  * **auto**: *Api.Auto*

  * **babel**: *Api.BabelCfg*

  * **bundle**: *Api.Bundle*

  * **compile**(): *function*

    * (): *void*

  * **compiler**: *any*

  * **configs**: *FileContainer*

  * **copy**: *Api.Copy*

  * **copyAll**: *Api.Copy*

  * **debug**: *Api.Debug*

  * **dev**: *Api.Dev*

  * **devtool**: *Api.Devtool*

  * **dist**: *Api.Dist*

  * **distPath**: *Api.PathSetter*

  * **dump**: *Api.Dump*

  * **features**: *Features*

  * **glob**: *Api.Glob*

  * **hash**: *Api.Hash*

  * **hooks**: *[Hooks](README.md#hooks)*

  * **hot**: *Api.Hot*

  * **inDevelopment**: *boolean*

  * **inProduction**: *boolean*

  * **inlineManifest**: *Api.InlineManifest*

  * **loaders**: *any*

  * **logger**: *any*

  * **map**: *Api.SourceMap*

  * **mini**: *Api.Mini*

  * **mode**: *Configuration["mode"]*

  * **options**: *Options*

  * **paths**: *Paths*

  * **patterns**: *any*

  * **plugins**: *any*

  * **postCss**: *Api.PostCss*

  * **preset**: *Api.Preset*

  * **project**: *Api.Project*

  * **projectPath**: *Api.PathSetter*

  * **publicPath**: *Api.PathSetter*

  * **purge**: *Api.Purge*

  * **rules**: *any*

  * **splitting**: *Api.Splitting*

  * **src**: *Api.Src*

  * **srcPath**: *Api.PathSetter*

  * **sync**: *Api.Sync*

  * **target**: *Api.Target*

  * **terser**: *Api.Terser*

  * **use**: *Api.Use*

  * **util**: *Util*

  * **vendor**: *Api.Vendor*

  * **watch**: *Api.Watch*

* **uglifyOptions**: *any* = bud.options.get('uglify')

* **doMinimizer**(`context`: any): *void*

* **doRuntimeChunk**(`context`: any): *void*

* **doVendor**(`context`: any): *void*

* **make**(): *any*

* **when**(`feature`: boolean, `callback`: any): *void*

* ### **runtimeChunkOptions**: *object*

  * **name**(`entrypoint`: any): *string*

* ### **splitChunksOptions**: *object*

  * **cacheGroups**: *object*

    * **vendor**: *object*

      * **chunks**: *string* = "all"

      * **name**: *any* = bud.options.get('vendor').name

      * **priority**: *number* = -20

      * **test**: *RegExp‹›* = /node_modules/

* ### **supports**: *object*

  * **minify**: *any* = bud.features.enabled('minify')

  * **runtimeChunk**: *any* = bud.features.enabled('inlineManifest')

  * **vendor**: *any* = bud.features.enabled('vendor')

* ### **target**: *object*

  * **optimization**: *object*

    * **minimize**: *any* = bud.features.enabled('minify')

    * **moduleIds**: *string* = "hashed"

    * **removeAvailableModules**: *boolean* = false

    * **removeEmptyChunks**: *boolean* = false

___

### `Const` rules

▸ **rules**(`bud`: any): *object*

*Defined in [packages/bud/src/compiler/webpack/rules/index.ts:10](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/index.ts#L10)*

Webpack loaders

**Parameters:**

Name | Type |
------ | ------ |
`bud` | any |

**Returns:** *object*

* **bud**: *any*

* **make**(): *any*

* ### **target**: *object*

  * **module**: *object*

    * **rules**: *undefined[]* = []

___

### `Const` shortCircuit

▸ **shortCircuit**(): *any*

*Defined in [packages/bud/src/util/shortCircuit.ts:8](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/util/shortCircuit.ts#L8)*

JSON.stringify replacement function

Prevents circular references in JSON from looping

**Returns:** *any*

## Object literals

### `Const` api

### ▪ **api**: *object*

*Defined in [packages/bud/src/api/index.ts:43](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L43)*

Bud.Bud export

###  alias

• **alias**: *function*

*Defined in [packages/bud/src/api/index.ts:44](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L44)*

#### Type declaration:

▸ (`arg0`: any): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | any |

###  auto

• **auto**: *function*

*Defined in [packages/bud/src/api/index.ts:45](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L45)*

#### Type declaration:

▸ (`options`: object): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

###  babel

• **babel**: *function*

*Defined in [packages/bud/src/api/index.ts:46](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L46)*

#### Type declaration:

▸ (`options`: BabelOptions): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | BabelOptions |

###  bundle

• **bundle**: *function*

*Defined in [packages/bud/src/api/index.ts:47](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L47)*

#### Type declaration:

▸ (`name`: string, `entries`: string[]): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`entries` | string[] |

###  compile

• **compile**: *compile*

*Defined in [packages/bud/src/api/index.ts:48](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L48)*

###  config

• **config**: *config*

*Defined in [packages/bud/src/api/index.ts:49](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L49)*

###  copy

• **copy**: *function*

*Defined in [packages/bud/src/api/index.ts:50](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L50)*

#### Type declaration:

▸ (`from`: string, `to`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |

###  copyAll

• **copyAll**: *function*

*Defined in [packages/bud/src/api/index.ts:51](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L51)*

#### Type declaration:

▸ (`from`: string, `to`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |

###  debug

• **debug**: *function*

*Defined in [packages/bud/src/api/index.ts:52](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L52)*

#### Type declaration:

▸ (`enabled?`: boolean): *any*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

###  dev

• **dev**: *function*

*Defined in [packages/bud/src/api/index.ts:53](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L53)*

#### Type declaration:

▸ (`options`: any): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

###  devtool

• **devtool**: *function*

*Defined in [packages/bud/src/api/index.ts:54](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L54)*

#### Type declaration:

▸ (`devtool`: WebpackOptions.Devtool): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`devtool` | WebpackOptions.Devtool |

###  dist

• **dist**: *function*

*Defined in [packages/bud/src/api/index.ts:55](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L55)*

#### Type declaration:

▸ (`path?`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`path?` | string |

###  distPath

• **distPath**: *function*

*Defined in [packages/bud/src/api/index.ts:56](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L56)*

#### Type declaration:

▸ (`path`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

###  dump

• **dump**: *function*

*Defined in [packages/bud/src/api/index.ts:57](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L57)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

###  eslint

• **eslint**: *function*

*Defined in [packages/bud/src/api/index.ts:58](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L58)*

#### Type declaration:

▸ (`enabled`: boolean): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled` | boolean |

###  glob

• **glob**: *function*

*Defined in [packages/bud/src/api/index.ts:59](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L59)*

#### Type declaration:

▸ (`this`: [Bud](README.md#bud), `output`: string, `files`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](README.md#bud) |
`output` | string |
`files` | string |

###  hash

• **hash**: *function*

*Defined in [packages/bud/src/api/index.ts:60](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L60)*

#### Type declaration:

▸ (`this`: [Bud](README.md#bud), `enabled?`: boolean): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](README.md#bud) |
`enabled?` | boolean |

###  hot

• **hot**: *function*

*Defined in [packages/bud/src/api/index.ts:61](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L61)*

#### Type declaration:

▸ (`this`: [Bud](README.md#bud), `options`: object): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](README.md#bud) |
`options` | object |

###  inlineManifest

• **inlineManifest**: *function*

*Defined in [packages/bud/src/api/index.ts:62](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L62)*

#### Type declaration:

▸ (`name?`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

###  map

• **map**: *function*

*Defined in [packages/bud/src/api/index.ts:63](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L63)*

#### Type declaration:

▸ (`enabled?`: boolean): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

###  mini

• **mini**: *function*

*Defined in [packages/bud/src/api/index.ts:64](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L64)*

#### Type declaration:

▸ (`enabled?`: boolean): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

###  postCss

• **postCss**: *function*

*Defined in [packages/bud/src/api/index.ts:65](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L65)*

#### Type declaration:

▸ (`options?`: object): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | object |

###  preset

• **preset**: *function*

*Defined in [packages/bud/src/api/index.ts:66](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L66)*

#### Type declaration:

▸ (`path?`: string): *any*

**Parameters:**

Name | Type |
------ | ------ |
`path?` | string |

###  project

• **project**: *function*

*Defined in [packages/bud/src/api/index.ts:67](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L67)*

#### Type declaration:

▸ (`path?`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`path?` | string |

###  projectPath

• **projectPath**: *function*

*Defined in [packages/bud/src/api/index.ts:68](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L68)*

#### Type declaration:

▸ (`path`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

###  publicPath

• **publicPath**: *function*

*Defined in [packages/bud/src/api/index.ts:69](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L69)*

#### Type declaration:

▸ (`path`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

###  purge

• **purge**: *function*

*Defined in [packages/bud/src/api/index.ts:70](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L70)*

#### Type declaration:

▸ (`any`: any): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`any` | any |

###  splitting

• **splitting**: *function*

*Defined in [packages/bud/src/api/index.ts:71](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L71)*

#### Type declaration:

▸ (`enabled?`: boolean): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`enabled?` | boolean |

###  src

• **src**: *function*

*Defined in [packages/bud/src/api/index.ts:72](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L72)*

#### Type declaration:

▸ (`path?`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`path?` | string |

###  srcPath

• **srcPath**: *function*

*Defined in [packages/bud/src/api/index.ts:73](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L73)*

#### Type declaration:

▸ (`path`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

###  sync

• **sync**: *function*

*Defined in [packages/bud/src/api/index.ts:74](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L74)*

#### Type declaration:

▸ (`options`: SyncOptions): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | SyncOptions |

###  target

• **target**: *function*

*Defined in [packages/bud/src/api/index.ts:75](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L75)*

#### Type declaration:

▸ (`target`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | string |

###  terser

• **terser**: *function*

*Defined in [packages/bud/src/api/index.ts:76](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L76)*

#### Type declaration:

▸ (`options`: object): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

###  use

• **use**: *function*

*Defined in [packages/bud/src/api/index.ts:77](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L77)*

#### Type declaration:

▸ (`this`: [Bud](README.md#bud), `plugin`: any): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](README.md#bud) |
`plugin` | any |

###  vendor

• **vendor**: *function*

*Defined in [packages/bud/src/api/index.ts:78](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L78)*

#### Type declaration:

▸ (`name?`: string): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

###  watch

• **watch**: *function*

*Defined in [packages/bud/src/api/index.ts:79](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/api/index.ts#L79)*

#### Type declaration:

▸ (`options`: object): *[Bud](README.md#bud)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

___

### `Const` fab

### ▪ **fab**: *object*

*Defined in [packages/bud/src/util/fab.ts:6](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/util/fab.ts#L6)*

Fabs: like noop but fab.

###  false

▸ **false**(): *false*

*Defined in [packages/bud/src/util/fab.ts:7](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/util/fab.ts#L7)*

**Returns:** *false*

###  null

▸ **null**(): *any*

*Defined in [packages/bud/src/util/fab.ts:10](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/util/fab.ts#L10)*

**Returns:** *any*

###  true

▸ **true**(): *true*

*Defined in [packages/bud/src/util/fab.ts:8](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/util/fab.ts#L8)*

**Returns:** *true*

###  undefined

▸ **undefined**(): *any*

*Defined in [packages/bud/src/util/fab.ts:9](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/util/fab.ts#L9)*

**Returns:** *any*

___

### `Const` loaders

### ▪ **loaders**: *object*

*Defined in [packages/bud/src/repositories/loaders.ts:8](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L8)*

Style loaders

###  babel

• **babel**: *string* = require.resolve('babel-loader')

*Defined in [packages/bud/src/repositories/loaders.ts:9](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L9)*

###  css

• **css**: *string* = require.resolve('css-loader')

*Defined in [packages/bud/src/repositories/loaders.ts:10](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L10)*

###  file

• **file**: *string* = require.resolve('file-loader')

*Defined in [packages/bud/src/repositories/loaders.ts:11](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L11)*

###  miniCss

• **miniCss**: *string* = MiniCssExtractPlugin.loader

*Defined in [packages/bud/src/repositories/loaders.ts:12](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L12)*

###  postCss

• **postCss**: *string* = require.resolve('postcss-loader')

*Defined in [packages/bud/src/repositories/loaders.ts:13](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L13)*

###  resolveUrl

• **resolveUrl**: *string* = require.resolve('resolve-url-loader')

*Defined in [packages/bud/src/repositories/loaders.ts:14](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L14)*

###  style

• **style**: *string* = require.resolve('style-loader')

*Defined in [packages/bud/src/repositories/loaders.ts:15](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L15)*

###  svgr

• **svgr**: *string* = require.resolve('@svgr/webpack')

*Defined in [packages/bud/src/repositories/loaders.ts:16](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L16)*

###  url

• **url**: *string* = require.resolve('url-loader')

*Defined in [packages/bud/src/repositories/loaders.ts:17](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/loaders.ts#L17)*

___

### `Const` options

### ▪ **options**: *object*

*Defined in [packages/bud/src/repositories/options.ts:72](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L72)*

Options container.

###  copy

• **copy**: *object*

*Defined in [packages/bud/src/repositories/options.ts:73](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L73)*

#### Type declaration:

###  dependencyManifest

• **dependencyManifest**: *object*

*Defined in [packages/bud/src/repositories/options.ts:74](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L74)*

#### Type declaration:

* **combineAssets**: *boolean | undefined*

* **combinedOutputFile**: *string | null*

* **injectPolyfill**: *boolean*

* **outputFormat**: *"json" | "php"*

* **requestToExternal**? : *RequestToExternal | undefined*

* **requestToHandle**? : *RequestToHandle | undefined*

* **useDefaults**: *boolean*

###  dev

• **dev**: *object*

*Defined in [packages/bud/src/repositories/options.ts:75](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L75)*

#### Type declaration:

###  devtool

• **devtool**: *string* = "source-map"

*Defined in [packages/bud/src/repositories/options.ts:76](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L76)*

###  extensions

• **extensions**: *string[]* = ['.js', '.json']

*Defined in [packages/bud/src/repositories/options.ts:77](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L77)*

###  postCss

• **postCss**: *object*

*Defined in [packages/bud/src/repositories/options.ts:90](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L90)*

#### Type declaration:

###  scss

• **scss**: *object*

*Defined in [packages/bud/src/repositories/options.ts:91](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L91)*

#### Type declaration:

###  target

• **target**: *"web"*

*Defined in [packages/bud/src/repositories/options.ts:95](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L95)*

###  terser

• **terser**: *object*

*Defined in [packages/bud/src/repositories/options.ts:96](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L96)*

#### Type declaration:

▪ **filenameTemplate**: *object*

*Defined in [packages/bud/src/repositories/options.ts:78](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L78)*

* **default**: *string* = "[name]"

* **hashed**: *string* = "[name].[hash:8]"

▪ **headers**: *object*

*Defined in [packages/bud/src/repositories/options.ts:82](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L82)*

* **Access-Control-Allow-Headers**: *string* = "X-Requested-With, content-type, Authorization"

* **Access-Control-Allow-Methods**: *string* = "GET, POST, PUT, DELETE, PATCH, OPTIONS"

* **Access-Control-Allow-Origin**: *string* = "*"

▪ **inlineManifest**: *object*

*Defined in [packages/bud/src/repositories/options.ts:87](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L87)*

* **name**: *string* = "runtime"

▪ **splitting**: *object*

*Defined in [packages/bud/src/repositories/options.ts:92](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L92)*

* **maxChunks**: *null* = null

▪ **uglify**: *object*

*Defined in [packages/bud/src/repositories/options.ts:97](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L97)*

* **cache**: *boolean* = true

* **extractComments**: *boolean* = false

* **parallel**: *boolean* = true

* **chunkFilter**(`__namedParameters`: object): *boolean*

* **uglifyOptions**: *object*

  * **compress**: *boolean* = false

  * **mangle**: *object*

    * **toplevel**: *boolean* = true

  * **output**: *object*

    * **beautify**: *boolean* = false

▪ **vendor**: *object*

*Defined in [packages/bud/src/repositories/options.ts:112](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/options.ts#L112)*

* **name**: *string* = "vendor"

___

### `Const` paths

### ▪ **paths**: *object*

*Defined in [packages/bud/src/repositories/paths.ts:25](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L25)*

Paths repo.

###  cwd

• **cwd**: *string*

*Defined in [packages/bud/src/repositories/paths.ts:26](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L26)*

###  dist

• **dist**: *string* = argv['dist'] ? join(cwd, ensureStr(argv['dist'])) : join(cwd)

*Defined in [packages/bud/src/repositories/paths.ts:30](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L30)*

###  framework

• **framework**: *string*

*Defined in [packages/bud/src/repositories/paths.ts:28](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L28)*

###  project

• **project**: *string* = cwd

*Defined in [packages/bud/src/repositories/paths.ts:27](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L27)*

###  public

• **public**: *string* = argv['public'] ? ensureStr(argv['public']) : '/'

*Defined in [packages/bud/src/repositories/paths.ts:31](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L31)*

###  src

• **src**: *string* = argv['src'] ? join(cwd, ensureStr(argv['src'])) : join(cwd)

*Defined in [packages/bud/src/repositories/paths.ts:29](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/paths.ts#L29)*

___

### `Const` patterns

### ▪ **patterns**: *object*

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:10](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L10)*

loader test regex patterns

**`prop`** {RegExp} sass

**`prop`** {RegExp} sassModule

**`prop`** {RegExp} css

**`prop`** {cssModule} cssModule

###  css

• **css**: *RegExp‹›* = /\.css$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:15](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L15)*

###  cssModule

• **cssModule**: *RegExp‹›* = /\.module\.css$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:16](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L16)*

###  font

• **font**: *RegExp‹›* = /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:18](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L18)*

###  image

• **image**: *RegExp‹›* = /\.(png|svg|jpg|gif)$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:20](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L20)*

###  js

• **js**: *RegExp‹›* = /\.(js|jsx)$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:11](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L11)*

###  scss

• **scss**: *RegExp‹›* = /\.scss$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:13](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L13)*

###  scssModule

• **scssModule**: *RegExp‹›* = /\.module\.scss$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:14](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L14)*

###  svg

• **svg**: *RegExp‹›* = /\.svg$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:17](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L17)*

###  vendor

• **vendor**: *RegExp‹›* = /node_modules/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:19](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L19)*

###  vue

• **vue**: *RegExp‹›* = /\.vue$/

*Defined in [packages/bud/src/compiler/webpack/rules/util/patterns.ts:12](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/compiler/webpack/rules/util/patterns.ts#L12)*

___

### `Const` presets

### ▪ **presets**: *object*

*Defined in [packages/bud/src/repositories/presets/index.ts:9](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/presets/index.ts#L9)*

Preset configurations for common webpack plugins.

▪ **babel-wp**: *object*

*Defined in [packages/bud/src/repositories/presets/index.ts:14](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/presets/index.ts#L14)*

* **config**: *any* = babelWp()

* **file**: *string* = path.join(__dirname, 'repositories/presets/babel/preset-wp')

▪ **postCss**: *object*

*Defined in [packages/bud/src/repositories/presets/index.ts:10](https://github.com/roots/bud-support/blob/f0e631c/packages/bud/src/repositories/presets/index.ts#L10)*

* **config**(): *object*

  * **plugins**: *any[]* = [require('postcss-import'), require('autoprefixer')]

* **file**: *string* = path.join(__dirname, 'repositories/presets/postcss')
