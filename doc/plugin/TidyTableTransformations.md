## Adding a custom transformation

You can add your own custom transformations in a plugin.

As an example, the [ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js) project defines a
transformation called 'TransformationCustom'. This transformation appends a custom string to all the values in a column.

#### Defining a Transformation

A transformation is an object that implements the `ITidyTableTransformation` interface. Please read the documentation
comments of that class (in the code) for detailed information.

In general, the flow of a transformation is as follows:

1) the user adds the transformation as a step in the transform process,
2) the user edits the options for the transformation,
3) the user applies the transformation.

There are two families of transformations. One that performs mathematical operations in the TidyTable, and a second one
that defines cell renderers to be used in table and pivot table widgets.

Code wise, the transformation modifies the table and its columns in the `apply` function. For example, the following
`apply` function takes the column named 'foo' and colors cells as red when `value > 5`.

##### Adding a new column

```typescript
export const TransformationRed: ITidyTableTransformation<any> = {

    apply(context: IPublicContext, table, options: any): void {

        const column = table.getOptionalColumn('foo');

        if (column.is(TidyColumnsType.NUMERIC)) {
            const colors = column.getValues().map(value => (value ?? 0) > 5 ? 'red' : null);
            column.setProperty(
                table.createColumn('color', colors, TidyColumnsType.COLOR)
            );
        }
    }
}
```

##### Adding a cell renderer to the selected columns

```typescript
export const TransfRendererCustom: ITidyTableTransformation<TemplateOptions> = {
    
    apply(context: IPublicContext, table, options: TemplateOptions): void {

        table.getColumnsBySelector(options.columns).forEach(column => {

            if (column != null) {

                const math = table.getMath();
                const min = math.min(column);
                const max = math.max(column);

                column.setCellDecoration({
                    stringRenderer: true,
                    cssStyles: (rowIdx: number) => {
                        let scale = 0.5 + (math.scaleNormalize(column, rowIdx, min, max, undefined) ?? 0.5);
                        
                        // 2.34 -> 2.3 ,reduce the number of produced classes
                        scale = Math.round(scale * 10) / 10;

                        /**
                         * Camelcase css
                         */
                        return {
                            fontSize: scale + "rem",

                            ':hover': {
                                fontSize: (2 * scale) + "rem",
                            }
                        }
                    },
                    renderer: (rowIdx: number) => {
                        return "<span>" + (column.getValue(rowIdx) ?? "") + "</span>";
                    },
                });
            }

        })
    }
}
```

#### Registering a Transformation

Register transformations in the `registerTidyTableTransformations` method in the `makePlugin` function of
the [plugin definition](PluginDefinition.md):

```typescript
const PluginDefinition = ApiUtils.makePlugin({

    // ...

    registerTidyTableTransformations(manager: ITidyTableTransformationManager) {
        manager.registerTransformation(TransformationCustom);
    }

    // ...

});
```

_
