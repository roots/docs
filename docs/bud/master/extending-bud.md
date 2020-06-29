---
description: Installing Bud requires node 12 and yarn.
---

# Extending Bud

## Writing a generator

Generators can be installed via npm or authored directly in a project's `.bud/generators` directory.

If writing a generator intended to be shared with others, simply add the `bud-generator` keyword to your project's package.json file.

## Anatomy of a generator

A generator is a JS object with four properties: `name`, `description`, `prompts` and `tasks`.

- `name` and `description` are self-explanatory and are simply used to identify the generator and its function in Bud's various CLI interfaces.
- `prompts` is an array of objects which describe the questions asked when the generator is run. This array is optional, if your generator does not require user input.
- `tasks` is an array of objects which describe the various operations the generator needs to perform in order to generate the desired project files.

To illustrate how this works in practice, we can look at the generator code for the actual `wp-editor-extension` generator included with Bud:

```js
module.exports = {
  name: 'wp-editor-extension',
  description: 'Generate a new WordPress editor plugin',
  prompts: [
    {
      type: 'input',
      name: 'pluginName',
      message: 'Plugin name',
      initial: 'ACME Co. Plugin',
      required: true,
    },
  ],
  tasks: [
    {
      task: 'compile',
      src: 'plugin.js.hbs',
      dest: 'src/plugins/{{lowercase (dashcase pluginName)}}/plugin.js',
    },
  ],
}
```

## Prompts

### type

Bud uses the enquirer package to handle prompts. As such, any of [the Enquirer prompts can be used](https://www.npmjs.com/package/enquirer#%E2%9D%AF-prompts).

- `name`: This is the name of the variable that will be stored in the `.bud/bud.config.js` file and made available to your template.
- `message`: This is the prompt/question text itself.
- `initial`: This is both a placeholder and a fallback value.
- `required`: Boolean value indicating that this prompt is required.

## Tasks

The following tasks are available for use in your generators:

- `addDependencies`: Install packages from npm and packagist to the project.
- `command`: Execute arbitrary shell commands (using `execa.command`)
- `compile`: Compile a source template and output to a specified project path.
- `copy`: Copy a template to a specified project path.
- `ensureDirs`: Make an array of dirs if they are not already present.
- `install`: Install dependencies from npm and packagist.
- `json`: The generator supplies a callback which receives a given JSON file as an object and returns a transformed object to be written in place of the original. Useful for adding fields to package.json, for instance.
- `touch`: Create an empty file in the project if it does not already exist.
- `git`: Currently only supports `clone`.

Additional actions can be added using a top-level generator key: `registerActions`, should none of these actions meet your requirements.

This section of the documentation is still in development, but in the meantime the best way to become familiar with these APIs is by looking at [the included generators](https://github.com/roots/bud-generators/tree/master/generators) or the source code for [the Bud task runner itself](https://github.com/roots/bud/tree/master/src/bud).
