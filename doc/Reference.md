## icCube Dashboards Plugin Dev. Kit Reference Documentation

### Plugin Definition

The plugin definition is the entry point of the plugin and is packaged as a Webpack module that will be loaded by icCube
Dashboards using the Webpack Module Federation mechanism.

Refer to this [page](PluginDefinition.md) for more information.

### Widget Template Overview

A dashboard is made of widgets (aka. visual components) that display a piece of information. Typical widgets are charts,
maps, tables, filters, gauges, textual information, etc. New types of widgets can be added via a widget template.

Refer to this [page](WidgetTemplate.md) for more information.

### Javascript Widget Template

A widget template that is rendering the widget using plain Javascript/Typescript (i.e., does not depend on React).

Refer to this [page](JavascriptTemplate.md) for more information.

### React Widget Template

A widget template that is rendering the widget using React.

Refer to this [page](ReactTemplate.md) for more information.

### Interactions

Widget interactions include selection, drilldown, drillthrough, etc. Those interactions are typically firing events
that allows widgets to communicate to each other: for example, a selection event will be fired to filter the content of
another widget.

Refer to this [page](Interactions.md) for more information.

### Events

Events are used for communication between widgets. An event is a piece of information sent and received via a
publish-subscribe mechanism. For example a chart is publishing its selection, and a table is subscribing to this
selection to display detailed information about it.

Refer to this [page](Events.md) for more information.

### Tidy Table Transformation

A tidy table transformation (or simply a transformation) allows for manipulating the content of a tidy table before it
is fed as input of a widget (i.e., chart, table, filter, etc.) to make it more appropriate and valuable for the sake
of reporting/analytics. At the same time they allow for performing on the client side any additional data processing
that was not possible on the actual source of data.

More details about transformation can be found [here](TidyTableTransformations.md).

### Localization

Refer to this [page](Localization.md) for more information about translating widget and transformation fields used in
their respective editors.

### User Menu Options

Refer to this [page](UserMenuOptions.md) for more information about adding a new user menu option.

### Theme

A theme is a preset package containing graphical appearance and functionality details used to customize the look of the
dashboards. Theme entities include but not limited to are: color palette, typography font and size, default data
formatter, default chart options, widget layouts, etc. A theme is actually a Javascript module packaged as a plugin.

Refer to this [page](Theme.md) for more information.

### Widget Options: Default Values (Theme)

A theme is able to (re)define the default values of the widget options visible in the widget editor. For example, tables
could be defaulted to `compact` layout mode.

Refer to this [page](ThemeWidgetDefaults.md) for more details.

### Editor Theme

The theme used to render the editor application as opposed to the dashboards.

Refer to this [page](EditorTheme.md) for more information.

_