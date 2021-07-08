## icCube Dashboards Plugin Debug

All working plugin examples comes with a `package.json` file containing the `start` script:

    npm run start

is starting a Webpack dev. server that is hosting the plugin at `localhost:400x`. Check the README.md for the actual
port number (`4000`, `4001`, etc...).

This plugin is actually exposing a Webpack module that can be loaded (using the Webpack Module Federation)
by a running instance of icCube Dashboards application.

For debugging that plugin, start a local icCube server where the Dashboards application has been
[installed](./Install.md) and ensure it is configured to load the plugin just started. For that purpose,
the `ic3report-config.js` file should contain the following (replacing `MyPluginJS` and the port `4000`
with the actual name and the actual port number: check the README.md file in the plugin project):

```javascript
  options.plugins.push({
    url: "http://localhost:4000/remoteEntry.js",
    scope: "MyPluginJS",
    module: "./PluginDefinition",
});
```

Open the Dashboards application (`http://localhost:8282/icCube/report/editor`). Your widgets should be available in the
Widget chooser. Everytime your plugin get recompiled, refresh the icCube Dashboards page.

You can set a breakpoint in the plugin source code (sourcemap are available) in Chrome DevTools for example.

_