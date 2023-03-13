## Widget Template Definition

You can register a new [widget template](./WidgetTemplate.md) (aka. widget in this document) in the plugin by using
the following code:

```typescript
const PluginDefinition = ApiUtils.makePlugin({

    id: "MyPlugin",

    // ...

    registerWidgets(manager: IWidgetManager) {
        manager.registerWidget(widget_definition);
    },

});
```

where the `widget_definition` is implementing the interface `IPublicCommonWidgetTemplateDefinition`.

#### MDX Builder Settings

The `mdxBuilderSettings` is defining how the MDX query looks like for the end user and attempts to give some
semantic to each underlying MDX axis. For example, a Google map widget would define a `location` axis. The icCube
table is defining its MDX query as follows:

```typescript
mdxBuilderSettings: {
    mdxAxis: [
        {
            name: "Columns",
            multipleHierarchy: true,
        },
        {
            name: "Rows",
            multipleHierarchy: true,
        },
        {
            name: "#Measures" /* sort of paging */,
            isOptional: true,
            disableNonEmpty: true,
        },
    ]
}
```

Two MDX axes are used to represent the `Columns` and the `Rows` and a third one named `#Measures` is a way to
return multiple values per MDX cell giving the opportunity to retrieve extra [tidy table](../../tidyTable/TidyTable.md)
columns. Those columns can be used for example within transformations.

The names of the `mdxAxis` are also called **roles** in this document.

#### Default Mapping

In Javascript code, you can retrieve the tidy table columns by **position**, by **name**, by **role** or by **alias**.

Using position or name might lead to issues when changing slighty the query and/or when adding transformations.
Accessing the columns by role is fine but MDX queries only are supported. The last option is to use the columns
aliases.

The tidy table contains a column mapping. This mapping is an index of the columns that maps an alias to a column.
Each column mapping might be defined in the chart options. But sometimes this mapping is quite useless and/or is
adding complexity for the end-user. In that case, icCube relies on a default mapping.

For example, let assume we'd like to retrieve the column defining the `rows` of our table widget:

```typescript
    const rowColumn = table.getColumnByAlias("rows");
```

we can define the following the default mapping to ensure it works using the MDX roles or the first column
for any other data source:

```typescript
defaultMapping: data => {
    const columns = data.table.getColumnsByRole("rows");
    if (columns.length > 0) {
        return {
            rows: columns("rows"),
        }
    }

    return {
        rows: [data.table.getColumns()[0]]  /* fallback to first column */,
    }
}
```

#### Selection

A widget bases its **selection** on columns of the tidy table. When a user clicks in a cell of the column,
the widget selects all the cells with the same unique value. The columns used to check for unique values are
defined by the **selection granularity**. For example, when the user selects `axis` as the granularity item
in the line chart, then it bases the selection on the axis column. Idem with the `group` column.

Per default, the available options for column selection are the roles defined in the `mdxBuilderSettings`.
You can override these defaults by setting the `granularityItems` and the `defaultGranularityItems`. Then,
in the template, you use `ITidyTableInteraction.getWidgetSelectionOptions()` to get an object with the granularity
items selected by the user. You can change the selection behaviour based on the value you receive there.

_