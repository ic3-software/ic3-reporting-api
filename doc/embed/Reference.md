## icCube Dashboards API Reference Documentation

The API allows for embedding the icCube Dashboards into an existing Web application. This API allows for a two ways
communication between the host application and the icCube Dashboards.

The API is using internally an iFrame. Please refer to this [page](./iFrameUsageConsideration.md)
for more details about using an iFrame within the host application.

### Dashboard PermaLink

The simplest way to embed an icCube dashboard is to set up an iFrame using as `src` the permaLink of that report.

Refer to this [page](./EmbeddingPermaLink.md) for more details.

### Driving icCube Dashboards from the Host Application

A more complex approach is to use the Javascript API to embed an iFrame that is source the icCube Dashboards application
and use it to open a dashboard, send events to a dashboard, listen to events from a dashboard, etc... This integration
allows for a two ways communication between the host application and the icCube Dashboards.

Refer to this [page](./EmbeddingJavascript.md) for mode details.

_
