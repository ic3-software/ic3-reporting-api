## Widget Template

You can add a custom widget to the reporting with a widget template definition. It describes the widget
using meta information and implements the actual rendering and behavior logic in Javascript/Typescript:

    export type IPublicWidgetTemplateDefinition<T extends FormFieldObject> =
        IPublicWidgetReactTemplateDefinition<T> | IPublicWidgetJsTemplateDefinition<T>;

Please refer to this [file](./WidgetTemplateDefinition.md) for more details about the widget template definition.

### Javascript vs React Widgets

The icCube Dashboards is written in React. Two kinds of widget template implementations are available:

- [Javascript](./JavascriptTemplate.md): implementing a new widget using plain Javascript/Typescript.
- [React](./ReactTemplate.md): implementing a new widget using React.

The commented source code of the following demo plugins contain working examples of several new widgets:

- [ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js),
- [ic3-demo-plugin-react](https://github.com/ic3-software/ic3-demo-plugin-react).

### Creating a Widget from Scratch or Extending an Existing Widget

Creating a new widget from scratch might seem a bit complicated when you need only to customize a bit the available
options of existing widgets. For that purpose, extending existing widgets is possible. Doing so, you can hide (while
editing the widget) options, add new options, change their default values, and for amCharts 4 charts you can fully
customize the underlying chart instance.

For up-to-date and detailed information, the source code of the following demo plugin contains several new widgets
extending icCube widgets:

- [ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js).

### Lazy-Loading Third Party Libraries

A new widget is more likely requiring a new Javascript library. This library can be either loaded when the icCube
Dashboards application is starting or when the widget needs to be rendered. As icCube is using Webpack as its Javascript
bundler you can use dynamic import when implementing those new widgets and configure accordingly the `resolveDefinition`
method:

    resolveDefinition?: (definitionW?: IPublicWidgetTemplateDefinition<any>) => Promise<IPublicWidgetTemplateDefinition<OPTIONS>>;

For up-to-date and detailed information, the source code of the following demo plugin contains several new widgets using
this mechanism:

- [ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js).

### Reference

For additional and up-to-date information, check in GitHub the Dashboards API documented source code
[ic3-reporting-api](https://github.com/ic3-software/ic3-reporting-api).

_
