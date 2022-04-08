## Javascript Widget Template

A Javascript [widget template](./WidgetTemplate.md) is defining a new widget implemented using plain
Javascript/Typescript. That is, it does not require React.

On top of the common meta definition this kind of template is responsible to implement the `jsCode` method:

```typescript
export interface IPublicWidgetJsTemplateDefinition<T extends FormFieldObject> extends IPublicCommonWidgetTemplateDefinition {

    jsCode: (context: IWidgetPublicContext, container: HTMLDivElement) => IPublicJsChartTemplate<T>;

    reactComponent?: false;
}
```

method returning an instance of `IPublicJsChartTemplate`:

```typescript
export interface IPublicJsChartTemplate<T extends FormFieldObject> {

    /**
     * @param data the actual result of the widget's query
     * @param options the options (possibly edited and/or from the theme) of this widget
     * @param header aka. widget title
     */
    renderJS: (data: IWidgetTemplateTidyData, options: T, header: string) => void;

    dispose: () => void;

}
```

The instance of `IPublicJsChartTemplate` will be re-used between different calls of the `jsCode` method. Indeed, a
widget is being re-rendered while editing it (e.g., new options being applied, new query result available) as well as
when reacting to end-user interactions (e.g., filter being applied, click row of a table updating its selection, etc.)
.

For additional and up-to-date information check in GitHub the working example
[ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js).

_