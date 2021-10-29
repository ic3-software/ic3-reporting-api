## Theme

Themes are inspired and follow [Material-UI themes](https://material-ui.com/customization/theming/). Technically it is
an extension of Material-UI theme with additional settings.

Themes let you apply a consistent look and feel to your dashboards. It allows you to customize design aspects to meet
the specific needs and give a consistent look through all dashboards. A theme allows for specifying the typographies,
colors, components styles, variants, etc...

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

},
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
                "&.WidgetBox-standard, &.WidgetBox-embedded": {
                    boxShadow: "4px 8px " + theme.palette.grey.A400,
                    borderRadius: "10px",
                    border: 'solid 1px ' + theme.palette.grey.A400,
                },
                "& .WidgetBox-header": {
                    justifyContent: "center",
                    height: '40px',
                    borderColor: theme.palette.grey.A700
                },
                "& .WidgetBox-headerTitle": {
                    ...theme.typography.h6,
                    lineHeight: '40px',
                },
                "& .WidgetBox-userMenu": {
                    height: '40px',
                },
                // hide/show box hover over the box
                "& .WidgetBox-userMenuClosed": {
                    opacity: 0,
                },
                "&:hover .WidgetBox-userMenuClosed": {
                    opacity: 1,
                }
            },
        }
    ],
    styleOverrides: {}
},
```

After definition, the `Rounded` variant will be available in the dropdown of the Widget Editor (Box tab).

For additional information check [ic3-demo-plugin-theme](https://github.com/ic3-software/ic3-demo-plugin-theme)
in GitHub.

### Defining a new Theme

To define a new theme we advise you to look at
the [ic3-demo-plugin-theme](https://github.com/ic3-software/ic3-demo-plugin-theme)
project as base or inspiration. This plugin contains a theme only for the sake of simplicity but a plugin can contain
both a theme and widget definitions.

Bear in mind, you are free to add new fields to your theme to use across your widget plugin. Those fields are pure
Javascript/Typescript objects and can hold primitive types as well as function.

Looking for inspiration? You can check
[Material UI Theme Builder](https://next.material-ui.com/customization/theming#theme-builder)
and [Mui Treasury site](https://mui-treasury.com/),  

