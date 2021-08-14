## Plugin Definition

The plugin definition (`IPluginDefinition`) acts as the entry point of your plugin.

This is where the plugin ID is defined and where the widgets, the data transformations, etc... defined in the plugin are
registered to the icCube Dashboards application. This is done using the `makePlugin` function:

```typescript
const PluginDefinition = ApiUtils.makePlugin({

    id: "MyPlugin",

    registerLocalization(manager: ILocalizationManager) {
        // ...
    },

    registerThemes(manager: IThemeManager) {
        // ...
    },

    registerWidgets(manager: IWidgetManager) {
        // ...
    },

    registerWidgetDefaults(theme: Theme, manager: IWidgetDefaultsManager) {
        // ...
    },

    registerTidyTableTransformations(manager: ITidyTableTransformationManager) {
        // ...
    },

});
```

Please refer to the available [source](https://github.com/iccube-software/ic3-reporting-api) code of the API that
provides for up-to-date and detailed information. You can refer as well to the source code of the various
working [examples](./Examples.md) for several plugin definitions.

### Webpack Module Federation

This definition is usually in the `PluginDefinition.js` file located at the root of the `src` folder. This module is
exposed via the Webpack Module Federation mechanism in the `webpack.common.js` file as following:

```javascript
new ModuleFederationPlugin({
    name: "MyPlugin",
    filename: "remoteEntry.js",
    exposes: {
        "./PluginDefinition": "./src/PluginDefinition",
    },
}),
```

The icCube Dashboards application is then configured to load that plugin at runtime via the `ic3report-config.js`
file. More information can be found at this [page](./Install.md#configuration)

_
