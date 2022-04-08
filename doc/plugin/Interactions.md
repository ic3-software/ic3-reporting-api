## Widget Interactions

Each widget is receiving an instance of `ITidyTableInteraction` that is responsible to manage event, selection and
drilldown behaviors.

### Selection

The selection is a **subset** of the rows of the tidy table (i.e., query result) of the widget. The instance of
`ITidyTableInteraction` is responsible to manage this selection and for example to determine how rows are being
selected.

For example, let's assume the following tidy table is displayed as a regular table widget (same logic will apply to any
kind of charts):

| | Country<br>`character`   | Year <br>`numeric`     | Sales <br>`numeric`
|:--- | :---      | :---     |       ---:    
|0| France    | 2020     | 65,273,511
|1| France    | 2010     | 62,879,530
|2| France    | 2000     | 59,015,096
|3| Spain     | 2020     | 55,173,411
|4| Spain     | 2010     | 52,779,430
|5| Spain     | 2000     | 49,015,196

when clicking on a row, the widget can update the selection as following:

```typescript
inter.handleRowHit(index, ev);
```

This method is then deciding which rows are being added (or removed) to (from) the selection. This is not necessarily a
one-to-one mapping. Indeed, looking at the table above, we have to decide what is actually being selected: a `Country`
or a `Year`?

This is controlled by the selection columns as defined in _Interaction_ > _Selection_ > _Selection Granularity_.

If the user has decided to use the `Country`, then clicking on the first row will end up with the following selection:

| | Country<br>`character`   | Year <br>`numeric`     | Sales <br>`numeric`
|:--- | :---      | :---     |       ---:    
|0| France    | 2020     | 65,273,511
|1| France    | 2010     | 62,879,530
|2| France    | 2000     | 59,015,096

If the user has decided to use the `Year`, then clicking on the first row will end up with the following selection:

| | Country<br>`character`   | Year <br>`numeric`     | Sales <br>`numeric`
|:--- | :---      | :---     |       ---:    
|0| France    | 2020     | 65,273,511
|3| Spain     | 2020     | 55,173,411

For additional and up-to-date information check in GitHub the `SimpleTable` widget in the working example
[ic3-demo-plugin-js](https://github.com/ic3-software/ic3-demo-plugin-js) that is selecting its rows.

#### Mode

The `ITidyTableInteraction` class is responsible to handle single vs. multi selection behavior as well.

When using multi-selection, the end-user can select additional items by holding the `ctrl/⌘` key or a range of items by
holding the `shift` key. Note that selecting a selected item will unselect it.

_
