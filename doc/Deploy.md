## icCube Dashboards Plugin Build & Deploy

All working plugin examples comes with a `package.json` file containing the `build` script:

- `npm run build`: creates the actual plugin Web files in the `/dist` directory.

- `npm run zip`: Packages the content of the `/dist` directory as a zip file.

To deploy this plugin within an icCube Dashboards application, upload and unzip this file into the `Docs`
folder `Web Docs/ic3-reporting/app-local/plugins` folder. We advise using `app-local/plugins` instead of
`plugins` to keep your local plugin after icCube Dashboards re-installation and/or update.

Before uploading your plugin delete or rename the folder `MyPlugin`. Once deployed you should have something like:

    ic3-reporting
        app-local
            plugins
                MyPlugin
                    static
                        ...
                    index.html
                    remoteEntry.js
                    ...

Ensure then that the icCube Dashboards application is configured to load that plugin at runtime via the
`ic3report-config.js` file. More information can be found at this [page](./Install.md#configuration).

_