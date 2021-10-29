## Plugin Localization

In the the [plugin definition](PluginDefinition.md), you can add a localization `.csv` file as follows.

This example is taken from the [ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js).

```typescript
import PluginLocalization from "./PluginLocalization.csv";

ApiUtils.makePlugin({

    // ...

    registerLocalization(manager: ILocalizationManager) {

        manager.registerLocalization(PluginLocalization);

    },

    // ...

});
```

The basic structure of the localization file is the comma-seperated `.csv` format with `#` for comments. The first
column of the CSV file is the localization tag, the other columns describe the text for the tag in a specific locale.

For an example of a localization file, have a look at `PluginLocalization.csv` from the ic3-demo-plugin-js plugin
([link](https://github.com/ic3-software/ic3-demo-plugin-js/blob/main/src/PluginLocalization.csv)).

_