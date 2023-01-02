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
     * @param create create a new series if it is not in itemControl.
     *  - seriesId: unique id of the series
     *  - groupKey: key for the group by (if defined). If not defined, use _
     *  - valueKey: series value datafield
     *  - fillKey: series fill datafield
     *  - sValue: the onValues part used
     * @param update update a series.
     *  - seriesId: unique id of the series
     *  - groupKey: key for the group by (if defined). If not defined, use _
     *  - series: the charts series to update
     *  - sValue: the onValues part used
     *  - groupRows: row indices of the group. Length >= 1.
     * @param remove remove the series.
     * @param typeFilter if defined, only call create, update and remove where typeFilter(type) returns true.
     * @param firstGroupOnly only call the first group
     */
    updateSeries<T>(
        itemControl: Map<string, T>,
        create: (seriesId: string, groupKey: string, valueKey: string, fillKey: string, sValue: ISeriesValues) => T,
        update: (seriesId: string, groupKey: string, series: T, sValue: ISeriesValues, groupRows: GroupRowIndices) => void,
        remove: (item: T) => void,
        typeFilter?: (type: ISeriesValuesType) => boolean,
        firstGroupOnly?: boolean
    ): void {
        const group = this.onGroup;
        const updated = new Set<string>();

        const forEachSeries = (groupKey: string, groupIdx: GroupRowIndices) => {
            this.onValues.forEach((onValue, idx) => {

                if (typeFilter != null && !typeFilter(onValue.type)) {
                    return;
                }

                const seriesKey = groupKey + "." + String(idx);
                let item = itemControl.get(seriesKey);
                if (item == null) {
                    const newItem = create(seriesKey, groupKey, seriesKey + "v", seriesKey + "c", onValue);
                    itemControl.set(seriesKey, newItem);
                    item = newItem;
                }

                update(seriesKey, groupKey, item, onValue, groupIdx);
                updated.add(seriesKey);

            });
        };

        if (group != null) {
            const index = group.groupBy(true);
            if (firstGroupOnly) {
                const groupIdx = index.values().next();
                if (!groupIdx.done) {
                    const firstIndex = groupIdx.value[0];
                    const groupKey = group.getUid(firstIndex);
                    forEachSeries(groupKey, groupIdx.value);
                }
            } else {
                index.forEach(groupIdx => {
                    const groupKey = group.getUid(groupIdx[0]);
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
                remove(item);
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