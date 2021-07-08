## icCube Dashboards Install

The icCube server does not support yet officially the new Dashboards application: installing it requires some manual
setup of the `Docs` application. It requires an icCube server v7.11 onwards.

### One Time Server Setup

In the `Web Docs` folder add the following folders:

    /ic3-reporting
        /app-local
        /data
            /entities
                /applications
            /shared
            /users

with the following permissions:

    :/ic3-reporting/data/entities
    + [<everybody>] READ
    
    :/ic3-reporting/data/shared
    + [<everybody>] READ

### Configuration

The file `ic3report-config.js` in the `/ic3-reporting/app-local` directory allows for configuring the Dashboards
application and amongst others for listing the plugins to load:

```javascript
const ic3config = function (mode, options) {

    console.log("[ic3-config] mode [" + mode + "] processing the options", options);

    // Plugins ( mode = "production"|"development" ) .

    if (mode === "production") {

        options.plugins = options.plugins || [];

        options.plugins.push({
            url: "plugins/amcharts4/remoteEntry.js",
            scope: "amCharts4",
            module: "./PluginDefinition",
        });

    }

}
```

### Deployment

In the `Web Docs:/ic3-reporting` rename or delete the folders:

    /app
    /doc
    /plugins

Then upload and unzip the Dashboards kit into the `Web Docs:/ic3-reporting` folder:

    /app
    /doc
    /plugins

_