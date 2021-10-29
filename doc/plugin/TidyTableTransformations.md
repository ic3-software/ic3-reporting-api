## Adding a custom transformation

You can add your own custom transformations in a plugin.

As an example, the [ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js) project defines a
transformation called 'TransformationCustom'. This transformation appends a custom string to all the values in a column.

#### Defining a Transformation

A transformation is an object that implements the `ITidyTableTransformation` interface. Please read the documentation
comments of that class for detailed information.

In general, the flow of a transformation is as follows:

1) the user adds the transformation as a step in the transform process,
2) the user edits the options for the transformation,
3) the user applies the transformation.

Code wise, the transformation modifies the table and its columns in the `apply` function. For example, the following
`apply` function takes the column named 'foo' and colors cells as red when `value > 5`.

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

#### Registering a Transformation

You add register transformations in the `registerTidyTableTransformations` method in the `makePlugin` function of
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
