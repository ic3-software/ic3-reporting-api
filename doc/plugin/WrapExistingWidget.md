## Wrapping an Existing Widget (Draft)

To reuse the widgets that come with the reporting, or a widget from another plugin, you can create a widget template by wrapping another widget. We included two examples in the ic3-demo-plugin-js. One wraps the donut chart, and the other wraps the kpi card widget. 

You can create a wrapped template with the `ApiUtils.makeWidgetTemplateWrapper` function. Below is a list of all available templates that you can wrap from the included widgets. 

- ic3.kpiWidget
- amCharts4.AmCharts4DonutChart
- etc… <comment text='TODO (tom)'/>

You can override the options meta using the `transformOptions` argument in the wrapper function. The `renderJS` or `reactElement` method of the `jsCode` in the template is where you can hardcode the option values. 

_