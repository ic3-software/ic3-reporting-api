## React Widget Template

A React [widget template](./WidgetTemplate.md) defines a new widget implemention using React. You can use Material-UI in the widget definition, because the icCube dashboards application already loads it. You can share and load the library using Webpack Module Federation.

On top of the common meta definition this kind of template is responsible to implement the `jsCode` method:

```typescript
export interface IPublicWidgetReactTemplateDefinition<T extends FormFieldObject> extends IPublicCommonWidgetTemplateDefinition {

    jsCode: (context: IWidgetPublicContext) => IPublicReactChartTemplate<T>;

    reactComponent: true;
}
```

`jsCode` returns an instance of `IPublicReactChartTemplate`:

```typescript
export interface IPublicReactChartTemplate<T extends FormFieldObject> {

    /**
     * @param data the actual result of the widget's query
     * @param options the options (possibly edited and/or from the theme) of this widget
     * @param header aka. widget title
     */
    reactElement: (data: IWidgetTemplateTidyData, options: T, header: string) => ReactElement;

}
```

The React element will be re-rendered while editing it (e.g., new options being applied, new query result available)
as well as when reacting to end-user interactions (e.g., filter being applied, click row of a table updating its
selection, etc.).

Please refer to this [file](./WidgetTemplateDefinition.md) for more details about the widget template definition.

For additional and up-to-date information check in GitHub the working example
[ic3-demo-plugin-react](https://github.com/ic3-software/ic3-demo-plugin-react).

_
