## icCube Dashboards Plugin Examples

Several working examples with their source code are available:

### [ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js)

This example is creating new widgets and transformation using plain Javascript/Typescript code
(i.e., no dependency on React).

### [ic3-demo-plugin-react](https://github.com/ic3-software/ic3-demo-plugin-react)

This example is creating new widgets using React and Material-UI (Typescript).

### [ic3-demo-plugin-theme](https://github.com/ic3-software/ic3-demo-plugin-theme)

This example is creating a new theme.

### Getting Started

Each example is following the same project skeleton.

Clone the Git repository of the example.

Use `npm` to install the dependencies:

    npm install

The `package.json` file is containing common scripts:

    start   : start a Webpack dev. server listening @4000 (check the example README.md for actual port) 
    build   : build the plugin into the /dist directory
    zip     : zip the /dist directory to deploy into an icCube server
    clean   : delete /dist /kit directories.

A JetBrains IntelliJ project is available for a quick start.

### Plugin Name Renaming

Before starting hacking the code we advise searching and replacing the plugin name by the actual name you'd like to give
to your plugin. Refer to the `README` file of each example for more details.

Keep that name simple (i.e., ASCII letter without any space, separator, etc...) as it will be used as a folder name
(once deployed into an icCube server), Webpack module name, localization id, etc... That name must be unique across all
the plugins loaded into an icCube server.

### Debug

Refer to this [page](./Debug.md) that is explaining how to debug a plugin.

### Build/Deploy

Refer to this [page](./Deploy.md) that is explaining how to deploy a plugin.

_