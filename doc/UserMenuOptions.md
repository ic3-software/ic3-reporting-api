## User Menu Options

A plugin can define new options of the widget's user menu (e.g., `Export to Excel`, etc...).

Let's say, we'd like to add a new `Export to Excel` option to our custom tables that is exporting a filtered version
of the underlying tidy table content.

### Register a new Option

In the plugin definition you'd register the new option as following :

```
registerUserMenuOptions(logger: ILogger, manager: IUserMenuOptionManager) {

    manager.registerUserMenuOption({
        option: "export_excel_filtered", notification: "exportToExcelFiltered",
    });

},
```

The above code is registering a new option named `export_excel_filtered` that is firing the notification
`exportToExcelFiltered` when clicked.

### Activate the Option for a Widget

Within your own theme, you can activate which options is available in the different widgets:

```
ic3: {
    userMenu: {
    
        disableUserMenuEdition: true,
        
        userMenuFilter: (options: IUserMenuOptions[], templateDef?: IPublicWidgetTemplateDefinition<any>): IUserMenuOptions[] => {
        
            if(templateDef?.id === "Table") {
                return ["maximize", "showData", "export_xls", "export_excel_filtered" as IUserMenuOptions, "export_png", "export_svg"];
            }
            
            return ["maximize", "showData", "export_xls", "export_png", "export_svg"];
        }
    },
   
}
```

The above code is adding the new `export_excel_filtered` option for the widget `Table`.

### Option Handler

When registering a new option, the name of this option is then bound to a notification that is fired when the menu
is clicked. The interested widget(s) must register the corresponding the notification handler.

In our table example, assuming this is a React widget, we'd do something like :

```
wContext.useNotification([{

    type: "exportToExcelFiltered" as any /* the notification used during the registration of the option */,

    handler: (type, event) => {

        if (table.getColumnCount() === 0 || table.getRowCount() === 0) {
            return;
        }

        // Filter the table based on the value of the first column.
        
        const rows = [];

        const col = table.getColumn(0)
        const rowCount = col.length();

        for (let rr = 0; rr < rowCount; rr++) {

            const info = col.getMdxInfo(rr);

            if(!info?.cc) {
                rows.push(rr);
            }

        }

        const filteredTable = table.createFilteredTable(undefined, rows);

        // Actual export to Excel.
        
        wContext.exportToExcel(filteredTable, false);
    }

}], [table]);
```

### Localization

You can localize the new option as any other tag as described in this [page](Localization.md) :

```
export_excel_filtered, Export to Excel (Filtered)
```

_
