## Events

icCube widgets (e.g., charts, filters, tables, etc.) are communicating to each others via events.

Events work in a **publish-subscribe** architecture. In this architecture subscribers receive messages that are sent by
publishers. Those publishers are unknown to the subscribers (please refer to this page for more information:
[Wikipedia](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)).

The icCube publish-subscribe architecture is **topic-based**. That is events are published to 'topics' or named logical
channels (named channel for short). Subscribers will receive all messages published to the topics to which they
subscribe. The publisher defines the topics to which subscribers can subscribe.

From now on, we will use channel instead of topic.

For example :

- Publisher-1 (e.g., dropdown) sends event with content '2020' to channel 'year'.
- Subscriber-1 (e.g., table) receives the event with content 'A' from the 'year'-channel.
- Subscriber-2 (e.g., bar chart) receives the event with content 'A' from the 'year'-channel.

#### Publishers

Widgets and external API calls are potentially publishers in icCube.

Each widget can support a list of actions (e.g., a column click, a cell selection or any other kind of end user
interaction). Those actions (and their actual implementation) are specific to each widget.

The external API might also be used to send events (e.g., an application embedding icCube dashboards).

#### Subscribers

Again, widgets and external API calls are potentially subscribers in icCube.

For widgets: options, queries and notifications (e.g., export-to-excel) are the three main groups of subscribers.

For example, the widget title `Sales: @{year}` is actually containing a subscriber `@{year}` that will update on each
event sent to the `year` channel.

The same happens for queries: a newly updated (from actual event value) query will be sent to the server to retrieve a
new result. For example, in the following query the `@{year}` subscriber is going to be replaced by the actual content
of the event to filter the result by the selected year:

```
select 

    [Measures].[Amount] on 0
    [Geography].[Geography].[Country] on 1
    
    from [Cube]
    
filterby @{year}
```

Please refer to this [page](../../interactions/Events.md) for more information about accessing event value.

#### Channel (aka. Topic)

Channels are defined by a name when building a dashboard. E.g., a filter will publish an event/message to the
`year` channel on selection. Channels names are case-sensitive.

Channel names are also known as event names.

#### Event (aka. Message Content/Payload)

The content of the message sent is called event in icCube.

In the dashboards, the title (or any other text options, queries, etc.) `@{channel}` defines a subscriber
(to the channel named `channel`) that will replace the text `@{channel}` by the actual event content.

For example, the following text: `Sales: @{year}` becomes `Sales: 2020` when the event `2020` is fired into the `year` channel.

At the programing level, an event content might be more than a simple string. You can check the API source
code [code](https://github.com/ic3-software/ic3-reporting-api/blob/main/src/IcEvent.ts) that provides for an
up-to-date documentation.

#### Widget Meta Information (Event Roles)

From the user point of view each widget defines a list of actions. For each action, the widget implementation can choose
to publish an event (or subscribe) to a channel. E.g.,  `ClickDonutSlice`, `SelectTableRow`, etc.

| Action Name                    | Channel Name  | Widget Behavior |
| :---                           | :---:         | :---            |
| Publish&#8209;ClickDonutSlice  | year          | When a user click on a Donut slice, fire an event on the year channel containing the year represented by the slice. |
| Subscribe&#8209;AddToSelection | year          | When a new event is prevent on the channel year, the widget is adding the event value to its selection. |

From a widget developer point of view, the [widget template](WidgetTemplate.md) definition contains a `eventRoles`
section that is describing the actions supported by the widget. As an example, the following code:

```javascript
SimpleTableDefinition.eventRoles = {

    publish: ["SimpleTableClickRow"],

    selectionPublish: TemplateEventActionNames.SELECTION,
    selectionSubscribe: TemplateEventActionNames.SELECTION,
}
```

is saying that the widget (a table) is firing an event when the user is clicking on the row and is both publishing and
listening to the selection.

##### Publish

The list of actions the widget can send events.

##### Subscribe

The list of actions the widget can receive events. Note, only new events are sent to subscribers. The widget is being
notified only on event content change.

##### Selection (Publish/Subscribe)

Those actions are internally managed by icCube to synchronize selection in `ITidyTableInteraction`. The actual state and
the consistency of the selection is managed by icCube. Refer to this [page](Interactions.md) for more information.

_
