## icCube Dashboards API: Permalink

This is the simplest way to embed an icCube dashboard. The host application can set up an iFrame using as `src`
the permalink of that dashboard to open that dashboard.

### Dashboard Permalink

You can find the permalink of a dashboard with the icCube Dashboards editor. It is located in the right drawer
`INFO` tab. Alternatively you can use the `Visualize` button to open the dashboard in the browser using its permalink.

Assuming the icCube Dashboards application is available on the localhost, the permalink for the dashboard whose path is
`shared:/Failure Analysis/Daily Failures` will be:

<pre>
http://localhost:8282/icCube/report/viewer?ic3report=shared:/Failure Analysis/Daily Failures
    <i>the above ic3report parameter has not been encoded for the sake of clarity</i>
</pre>

#### ic3locale

The `ic3locale` parameter can be appended to the permalink URL to override the user's locale. This parameter follows the
Java locale syntax. For example the following URL is opening the report using the US english locale independently of the
actual user's locale:

<pre>
http://localhost:8282/icCube/report/viewer?ic3report=shared:/Failure Analysis/Daily Failures&ic3locale=en_US
    <i>the above ic3report parameter has not been encoded for the sake of clarity</i>
</pre>

#### parameters

The `ic3params` parameters allows for passing report parameters as URL encoded JSON objects.

As an example the following is passing the `China` value to the `country` parameter:

<pre>
&ic3params=[{"channelName":"country","value":{"caption":"China","name":"China","uniqueName":"[China]"}]
    <i>the above ic3params parameter has not been encoded for the sake of clarity</i>
</pre>

Should you need to send more than one value, you can use an array of values.

As an example the following is passing both the `China` and the `Japan` values to the `country` parameter:

<pre>
&ic3params=[{"channelName":"country","value":[{"caption":"China","name":"China","uniqueName":"[China]"},{"caption":"Japan","name":"Japan","uniqueName":"[Japan]"}]}]
    <i>the above ic3params parameter has not been encoded for the sake of clarity</i>
</pre>

You might refer to this [page](./EmbeddingJavascript.md#open-report) for more details about report parameters.

_