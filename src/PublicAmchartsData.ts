import {ITidyColorColumn, ITidyColumn, ITidyNumericColumn} from "./PublicTidyColumn";
import {ITidyTable} from "./PublicTidyTable";
import {GroupRowIndices, IAmCharts4Data, IAmcharts4DataKey, TidyColumnsType} from "./PublicTidyTableTypes";

export enum ISeriesValuesType {
    LINE,
    COLUMN,
    TREND,
    DIVERGENT
}


export interface ISeriesValues {

    type: ISeriesValuesType;  // etc..
    values: ITidyNumericColumn;
    colors?: ITidyColorColumn;

    // Used to identify the parent series value col for trend columns.
    parentValueColIdx?: number;

}

/**
 * Used for managing amcharts data in the Amcharts plugin. This class controls both the creation of the charts
 * data and the creation of the series of that chart.
 */
export class PublicAmchartsData {

    private readonly onValues: ISeriesValues[];
    private readonly onAxis: ITidyColumn;
    private readonly onLevel: ITidyColumn | undefined;
    private readonly onGroup: ITidyColumn | undefined;
    private readonly table: ITidyTable;

    constructor(table: ITidyTable, onValues: ISeriesValues[], onAxis: ITidyColumn, onGroup?: ITidyColumn,
                onLevel?: ITidyColumn) {
        this.onValues = onValues;
        this.onAxis = onAxis;
        this.onGroup = onGroup;
        this.onLevel = onLevel;
        this.table = table;
    }

    static getSeriesId(groupKey: string, valueColIdx: number): string {
        return groupKey + "." + String(valueColIdx);
    }

    /**
     * Get the data for the chart.
     */
    getChartData(): IAmCharts4Data[] {

        const chartValues: Record<string, ITidyColumn> = {};
        this.onValues.forEach((value, idx) => {

            /*
            Divergent series needs to have negative values, but show a positive value when hovered. Thus, the values
            in chart data are set to negative, but the values in the column are not.
             */
            let valueColumn: ITidyColumn;
            if (value.type === ISeriesValuesType.DIVERGENT) {
                valueColumn = value.values.mapToColumn(v => v != null ? -v : null, "rightValue", TidyColumnsType.NUMERIC);
            } else {
                valueColumn = value.values;
            }

            chartValues[String(idx) + "v"] = valueColumn;

            if (value.colors) {
                chartValues[String(idx) + "c"] = value.colors;
            }
        });

        return this.table.toAmcharts4Data(this.onAxis, chartValues, this.onGroup, this.onLevel);

    }

    /**
     * Create, update and remove series in the chart.
     * @param itemControl map keeping track of current series in the chart.
     * @param seriesControl object controlling the adding/removing/updating of series.
     * @param firstGroupOnly only call the first group
     */
    updateSeries<T>(itemControl: Map<string, T>, seriesControl: IAmchartsSeriesControl<T>, firstGroupOnly?: boolean): void {
        const group = this.onGroup;
        const updated = new Set<string>();

        const forEachSeries = (groupKey: string, groupIdx: GroupRowIndices) => {
            this.onValues.forEach((onValue, idx) => {

                if (seriesControl.typeFilter != null && !seriesControl.typeFilter(onValue.type)) {
                    return;
                }

                const seriesKey = PublicAmchartsData.getSeriesId(groupKey, idx);
                let item = itemControl.get(seriesKey);
                if (item == null) {
                    const newItem = seriesControl.create(seriesKey, groupKey, seriesKey + "v", seriesKey + "c", onValue);
                    itemControl.set(seriesKey, newItem);
                    item = newItem;
                }

                seriesControl.update(seriesKey, groupKey, item, onValue, groupIdx);
                updated.add(seriesKey);

            });
        };

        if (group != null) {
            const index = group.groupBy(true);
            if (firstGroupOnly) {
                const groupIdx = index.values().next();
                if (!groupIdx.done) {
                    const firstIndex = groupIdx.value[0];
                    const groupKey = group.getAmcharts4GroupKey(firstIndex);
                    forEachSeries(groupKey, groupIdx.value);
                }
            } else {
                index.forEach(groupIdx => {
                    const groupKey = group.getAmcharts4GroupKey(groupIdx[0]);
                    forEachSeries(groupKey, groupIdx);
                });
            }
        } else {
            const groupKey = IAmcharts4DataKey.NULL;
            forEachSeries(groupKey, [0]);
        }

        itemControl.forEach((item, key) => {
            if (!updated.has(key)) {
                itemControl.delete(key);
                seriesControl.remove(item);
            }
        });
    }

    getAxis(): ITidyColumn {
        return this.onAxis;
    }

    getLevel(): ITidyColumn | undefined {
        return this.onLevel;
    }

    getGroup(): ITidyColumn | undefined {
        return this.onGroup;
    }

    /**
     * Return the nth value column.
     * @param idx n
     */
    getValueColumn(idx: number): ITidyNumericColumn {
        return this.onValues[idx].values;
    }

    /**
     * Call a function on each series and it's column
     * @param itemControl map keeping track of current series in the chart.
     */
    forEachSeries<T>(itemControl: Map<string, T>, callback: (col: ITidyNumericColumn, seriesId: string, series: T) => void): void {

        this.updateSeries(itemControl, {
            create: () => {
                throw Error("SNBH series cannot be created");
            },
            update: (seriesId, groupKey, series, sValue, groupRows) => {
                callback(sValue.values, seriesId, series);
            },
            remove: () => {
                throw Error("SNBH series cannot be removed");
            },
            typeFilter: type => type !== ISeriesValuesType.TREND
        }, true);
    }

    /**
     * Returns the first item in the onValues argument of the constructor.
     */
    getFirstValue(): ITidyNumericColumn {
        return this.onValues[0].values;
    }

    /**
     * Returns true if and only if there are multiple non-trend measures in the chart.
     */
    isMultiMeasure(): boolean {
        return this.onValues.filter(i => i.type !== ISeriesValuesType.TREND).length > 1;
    }

}

/**
 * Controls when to add / remove / dispose / update series. This class exists because using chart.setSeries removes
 * trend-series. This class handles the adding and removing of series and keeps the series in the order of the data.
 */
export interface IAmchartsSeriesControl<T> {

    /**
     * If defined, only call create, update and remove where typeFilter(type) returns true.
     */
    typeFilter?: (type: ISeriesValuesType) => boolean,

    /**
     * Create a new series if it is not in itemControl. Use 'add' to add it to the chart.
     * @param seriesId unique id of the series
     * @param groupKey key for the group by (if defined). If not defined, use _
     * @param valueKey series value dataField
     * @param fillKey series fill dataField
     * @param sValue the onValues part used
     */
    create: (seriesId: string, groupKey: string, valueKey: string, fillKey: string, sValue: ISeriesValues) => T,

    /**
     * Update a series.
     * @param seriesId unique id of the series
     * @param groupKey key for the group by (if defined). If not defined, use _
     * @param series the charts series to update
     * @param sValue the onValues part used
     * @param groupRows row indices of the group. Length >= 1.
     */
    update: (seriesId: string, groupKey: string, series: T, sValue: ISeriesValues, groupRows: GroupRowIndices) => void,

    /**
     * Destroy an item. Called when the item can be cleared from memory. E.g., dispose() on the series.
     */
    remove: (item: T) => void,

}