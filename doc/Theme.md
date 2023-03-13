## Theme

Themes are inspired and follow [Material-UI themes](https://material-ui.com/customization/theming/). Technically it is
an extension of Material-UI theme with additional settings.

Themes let you apply a consistent look and feel to your dashboards. It allows you to customize design aspects to meet
the specific needs and give a consistent look through all dashboards. A theme allows for specifying the typographies,
colors, components styles, variants, etc.

You can check the source code [ic3-demo-plugin-theme](https://github.com/ic3-software/ic3-demo-plugin-theme)
project for detailed information about creating a new theme.

### Typography

Allows for setting the font(-s) used in the dashboard. You have a set of 13 predefined variants (h1,h2,h3..) that might
be used in different react widgets.

On top of Material-UI typography you can overwrite icCube specific configuration:

```javascript
theme.typography.ic3 = {
    amCharts4: {
        fontSize: "14px",
        fontFamily: fontFamily,
    }
}
```

### Colors

On top of Material-UI colors you can define icCube specific configuration:

```javascript
theme.palette.ic3 = {

    selected: '#a05195',

    /**
     * list of palettes available in the Dashboards application
     */
    chartPalettes: {
        default: ["#e07a5f", "#f4f1de", "#3d405b", "#81b29a", "#f2cc8f"],
        myLovelyPalette: ["#ecea6c", "#e4af5d", "#de9e9c", "#db83c7", "#ae87d7", "#689ecd", "#3dacb8", "#5cc9c1", "#88d786", "#55c670"],
    },

    /**
     * List of single colors
     */
    chartSingleColors: {
        myRedColor: "#fc6e6d",
        myGreenColor: "#98de72",
    },

};
```

### Components

You can overwrite default component CSS styles as well as add variants to most components. Variants are available in the
user interface for end user. They allow different styles applied to the same component based on the variant name.

A variant for the `WidgetBox` might look like :

```javascript
theme.components.WidgetBox = {
    variants: [
        {
            props: {variant: "Rounded"},
            style: {
                [`&.${WidgetBoxClasses.standard}, &.${WidgetBoxClasses.embedded}`]: {
                    boxShadow: "4px 8px " + theme.palette.grey.A400,
                    borderRadius: "10px",
                    border: 'solid 1px ' + theme.palette.grey.A400,
                },
                [`& .${WidgetBoxClasses.header}`]: {
                    justifyContent: "center",
                    height: '40px',
                    borderColor: theme.palette.grey.A700
                },
                [`& .${WidgetBoxClasses.headerTitle}`]: {
                    ...theme.typography.h6,
                    lineHeight: '40px',
                },
                [`& .${WidgetBoxClasses.userMenu}`]: {
                    height: '40px',
                },
                // hide/show box hover over the box
                [`& .${WidgetBoxClasses.userMenuClosed}`]: {
                    opacity: 0,
                },
                [`&:hover .${WidgetBoxClasses.userMenuClosed}`]: {
                    opacity: 1,
                }
            },
        }
    ],
    styleOverrides: {}
};
```

After definition, the `Rounded` variant will be available in the dropdown of the Widget Editor (Box tab).

For additional information check [ic3-demo-plugin-theme](https://github.com/ic3-software/ic3-demo-plugin-theme)
in GitHub.

### Chart Variants

You can also define variants for charts. For example, the code below defines a variant for the donut chart:
```ts
theme.components["amCharts4.AmCharts4DonutChart"]: {
    variants: [
        {
            props: {variant: "pieChart"},
            defaultProps: {
                donutInnerRadius: 0,
                labelText: ' '
            }
        }
    ]
}
```

Now, the user can select the `pieChart` variant. This changes the default options to hide the center text and set the inner radius to 0. This results in a pie-chart. 

The [ic3-demo-plugin-theme](https://github.com/ic3-software/ic3-demo-plugin-theme) project on our GitHub page includes this example as well. 

### Widget Options: Default Values

A theme is able to (re)define the default values of the widget options visible in the widget editor. For example,
tables could be defaulted to `compact` layout mode.

Refer to this [page](./ThemeWidgetDefaults.md) for more details.

### Font (CSS Files)

A theme definition can import CSS files that for example contain font (e.g. @fontsource/lato/400.css).

Refer to this [page](./ThemeCssFontFiles.md) for more details.

### Defining a new Theme

To define a new theme we advise you to look at the
[ic3-demo-plugin-theme](https://github.com/ic3-software/ic3-demo-plugin-theme)
project as base or inspiration. This plugin contains a theme only for the sake of simplicity but a plugin
can contain both a theme and widget definitions.

Bear in mind, you are free to add new fields to your theme to use across your widget plugin. Those fields
are pure Javascript/Typescript objects and can hold primitive types as well as functions.

Looking for inspiration? You can check the following Web sites:
[Material UI Theme Builder](https://next.material-ui.com/customization/theming#theme-builder),
[Mui Treasury site](https://mui-treasury.com/).

_
