## icCube Dashboards Plugin Build & Deploy

All working plugin examples comes with a `package.json` file containing the `build` script:

    npm run build

is creating the actual plugin Web files in the `/dist` directory.

    npm run zip

is packaging as a zip file the content of the `/dist` directory.

To deploy this plugin within an icCube Dashboards application, upload and unzip this file into the `Docs`
folder `Web Docs/ic3-reporting/app-local/plugins` folder. We advise using `app-local/plugins` instead of
`plugins` to keep your local plugin after icCube Dashboards re-installation and/or update.

Before uploading your plugin delete or rename `MyPlugin` folder. Once deployed you should have something like:

    ic3-reporting
        app-local
            plugins
                MyPlugin
                    static
                        ...
                    index.html
                    remoteEntry.js
                    ...

_