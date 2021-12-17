## icCube Dashboards Plugin Dev. Kit

The icCube Dashboards application depends on plugins to add custom theme, widgets, data transformations, etc... A plugin
is a Webpack module that is loaded by the Dashboards application at runtime using the **Webpack Module Federation**
mechanism. Refer to this [page](./Develop.md) for more details.

The plugin dev. kit is available in Typescript.

Even if the icCube Dashboards is written in React, you can write your plugin in plain Javascript/Typescript and use your
favourite libraries. See the working example section below.

Note that Material-UI 5.x is required for accessing and developing a new theme.

### GitHub Project

The dev. kit source code is available on GitHub [here](https://github.com/ic3-software/ic3-reporting-api).

### Working Examples

Several working examples with their source code are available. Refer to this [page](./Examples.md) for more details.

### Reference Documentation

Refer to this [page](./Reference.md) for a complete documentation of the plugin dev. kit.

_