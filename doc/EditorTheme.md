## Editor Theme

A regular [theme](./Theme.md) used to render the dashboard editor as opposed to rendered dashboards.

### Options

On top of regular theme options, the `ic3` field of the `ThemeOptions` contains an editor specific
configuration that allows for example to define a new logo:

    editor?: {
        /**
         * Editor logo.
         *
         * Default: icCube logo.
         */
        logo?: string;
        /**
         * Alt text for the logo image.
         *
         * Default: "icCube".
         */
        logoAlt?: string;
        /**
         * Top offset of the edited dashboard page in the editor.
         *
         * Default: 25.
         */
        viewPortOffsetTop?: number;
        /**
         * Left offset of the edited dashboard page in the editor.
         *
         * Default: 25.
         */
        viewPortOffsetLeft?: number;
    };

### Defining a new Theme

To define a new editor theme we advise you to look at the
[ic3-demo-plugin-theme](https://github.com/ic3-software/ic3-demo-plugin-theme)
project as base or inspiration.

_
