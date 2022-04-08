## Widget Options: Default Values (Theme)

A theme is able to (re)define the default values of the widget options visible in the widget editor. For example, tables
could be defaulted to `compact` layout mode.

Please refer to the source code of the interface `IThemeWidgetDefaults` in the
[IThemeManager.ts](https://github.com/ic3-software/ic3-reporting-api/blob/main/src/IThemeManager.ts)
file for more details.

### Box Options

Please refer to the source of the interface `WidgetBoxOptions` in the
[ThemeWidgetBox.ts](https://github.com/ic3-software/ic3-reporting-api/blob/main/src/theme/ThemeWidgetBox.ts)
file for more details about defining new defaults for the box options.

As an example, the following is changing the message that is displayed when the widget cannot render yet
(waiting for its initial result or mandatory event value) and removing the widget header to both the tables and the
pivot tables:

    export const themeOptions: ThemeOptions = {
        ic3: {
            id: "MyNewTheme",
            caption: "My New Theme",
    
            widgetDefaults: {
    
                /**
                 * Setup widget box options for both ic3.Table & ic3.PivotTable widgets.
                 *
                 * @see WidgetBoxOptions (ThemeWidgetBox.ts)
                 */
                box: {

                    waitingEventOrResult: "the widget is waiting for its initial result",

                    ic3: {
    
                        Table: {
                            withHeader: false,
                        },
    
                        PivotTable: {
                            withHeader: false,
                        }
                    },
                },

The list of available plugin and widget IDs can be found in the file
[PublicTemplates.ts](https://github.com/ic3-software/ic3-reporting-api/blob/main/src/PublicTemplates.ts):

    export type WidgetTemplateIDs = keyof IWidgetTemplateChartOptions;

### Chart Options

Similarly to the box options, each chart options can have new default values. The list of available plugin and widget
IDs as well as their corresponding options can be found in the file
[PublicTemplates.ts](https://github.com/ic3-software/ic3-reporting-api/blob/main/src/PublicTemplates.ts):

    export type WidgetTemplateChartOptions = IWidgetTemplateChartOptions & { [key: string]: FormFieldObject };

The following is demonstrating how to define default values for several options for both the `ic3.Table`
and the `ic3.PivotTable` widgets.

#### Table

Please refer to the source of the interface `TableChartOptions` in the
[ThemeTable.ts](https://github.com/ic3-software/ic3-reporting-api/blob/main/src/theme/ThemeTable.ts)
file for more details.

As an example, the following is adding the footer with pagination to every table:

    export const themeOptions: ThemeOptions = {
        ic3: {
            id: "MyNewTheme",
            caption: "My New Theme",
    
            widgetDefaults: {
                options: {
                    ic3: {
                        Table: {
                            footer: true,
                            footerPagination: true,
                        }
                    }
                }
            }
        },

#### Pivot Table

Please refer to the source of the interface `PivotTableChartOptions` in the
[ThemePivotTable.ts](https://github.com/ic3-software/ic3-reporting-api/blob/main/src/theme/ThemePivotTable.ts)
file for more details.

As an example, the following is displaying every pivot table in compact mode:

    export const themeOptions: ThemeOptions = {
        ic3: {
            id: "MyNewTheme",
            caption: "My New Theme",
    
            widgetDefaults: {
                options: {
                    ic3: {
                        PivotTable: {
                            tableSize: TableRowHeightOptions.compact,
                        }
                    }
                }
            }
        },

_
