## icCube Dashboards Plugin Build & Deploy

All working plugin examples comes with a `package.json` file containing the `build` script:

    npm run build

is creating the actual plugin Web files in the `/dist` directory.

    npm run zip

is packaging as a zip file the content of the `/dist` directory.

To deploy this plugin within an icCube Dashboards application, upload and unzip this file into the `Docs`
folder `Web Docs/ic3-reporting/plugins-local` folder. We advise using `plugins-local` instead of `plugins`
to keep your local plugin upon icCube Dashboards re-installation.

Before uploading your plugin delete or rename `MyPlugin` folder. Once deployed you should have something like:

    ic3-reporting
        plugins-local
            MyPlugin
                static
                    ...
                index.html
                remoteEntry.js
                ...

_