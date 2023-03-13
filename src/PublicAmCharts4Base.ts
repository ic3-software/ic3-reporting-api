import {IWidgetPublicContext} from "./PublicContext";
import {ITidyColorColumn, ITidyColumn} from "./PublicTidyColumn";
import {ITidyTable} from "./PublicTidyTable";
import {ITidyTableInteraction} from "./PublicTidyTableInteractions";
import {Theme} from "@mui/material/styles";
import { ITidyMath } from "./PublicTidyMath";
import { IWidgetTemplateTidyData } from "./PublicTemplate";
import { Am4ChartOptions } from "./theme/ThemeAmCharts4";
import {Property} from "csstype";

export interface PublicAmCharts4Base<CHART, OPTIONS extends Am4ChartOptions> {

    readonly context: IWidgetPublicContext;

    /**
     * The theme of the report
     */
    readonly theme: Theme;

    tidyMath(): ITidyMath;

    /**
     * Get the color manager of the chart. This manager can create color columns using the default
     * theme palette.
     */
    getColorManager(): PublicAm4ColorManager;

    /**
     * Render the chart. Function called by plugin module.
     */
    renderJS(template: IWidgetTemplateTidyData, options: OPTIONS): void;

    /**
     * Dispose/ destroy the chart.
     */
    dispose(): void;

    /**
     * Adds an event listener to a series in the chart. This function adds the selection and the
     * events to fire that are in 'getEventsToFire'.
     * @param sprite a amcharts series object.
     * @param dataKey the data key identifies the series in the chart data.
     */
    addClickEventOnSprite(sprite: any, dataKey: string | undefined): void;

    /**
     * Returns the row for a certain data item.
     * @param dataItem the data item of a sprite (bar, line, circle, etc..)
     * @param dataKey the data key identifies the series in the chart data.
     */
    getRowFromDataItem(dataItem: unknown, dataKey: string | undefined): number | undefined;

    /**
     * Get the tidy table. Only use this function in update methods, otherwise it might not be defined and then it
     * throws an error.
     */
    getTable(): ITidyTable;

    /**
     * Get the options. Only use this function in update methods, otherwise it might not be defined and then it
     * throws an error.
     */
    getOptions(): OPTIONS;

    getInter(): ITidyTableInteraction;

    getChart(): CHART;

    /**
     * Perform interactions on the chart. Possible interaction can be a selection,
     * a drilldown or the firing of an event.
     *
     * Available interactions are set via the 'Interactions' tab in the widget editor.
     *
     * @param rowIdx the index of the row.
     * @param mouseEvent the html mouse event of the click. Used for multiple selection using ctrl and shift.
     */
    performInteraction(rowIdx: number, mouseEvent: MouseEvent | TouchEvent): void;

    /**
     * Returns the am4core instance used by the amCharts4 plugin.
     */
    getAm4core(): any;

    /**
     * Returns the am4charts instance used by the amCharts4 plugin.
     */
    getAm4charts(): any;

}

export type Am4Color = Property.Color;

export interface PublicAm4ColorManager {

    /**
     * Generate a color column.
     * @param table create the color column for this table (same length).
     * @param categoryColumn if available, use the values in this column to generate colors.
     */
    generateColors(table: ITidyTable, categoryColumn?: ITidyColumn): ITidyColorColumn;

    /**
     * Get a color
     * @param dataKey string to generate color for
     */
    getColor(dataKey: unknown): Am4Color;

    /**
     * Returns the default single color
     */
    getDefaultColor(): Am4Color;

}