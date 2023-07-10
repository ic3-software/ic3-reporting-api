import {FormFieldObject, Hook, IColorDef} from "../PublicTemplateForm";
import {TidyTableColumnSelector, UseDatetimeAxis} from "../PublicTidyTableTypes";
import {TidyHistogramOptions} from "../PublicTidyHistogram";
import {PublicAmCharts4Base} from "../PublicAmCharts4Base";

export enum AxisRangeType {
    LINE = "single_line",
    RANGE = 'range',
    LINE_PER_MEASURE = "LINE_PER_MEASURE"
}

export enum GeoMapChartProjection {
    Albers = 'Albers',
    AlbersUsa = 'AlbersUsa',
    AzimuthalEqualArea = 'AzimuthalEqualArea',
    Eckert6 = 'Eckert6',
    EqualEarth = 'EqualEarth',
    Projection = 'Projection',
    Mercator = 'Mercator',
    Miller = 'Miller',
    NaturalEarth1 = 'NaturalEarth1',
    Orthographic = 'Orthographic',
    Stereographic = 'Stereographic',
}

export enum GeoMapChartUnMatchedRegionStrategy {
    USE_DEFAULT_COLOR = 'USE_DEFAULT_COLOR',
    EXCLUDE_FROM_MAP = 'EXCLUDE_FROM_MAP',
}

export enum Amcharts4LineSmoothMethod {
    NONE = "none",
    TENSION = "tension",  // See https://www.amcharts.com/docs/v4/chart-types/xy-chart/#Smoothed_lines
    MONOTONE_X = "monotoneX",  // See https://www.amcharts.com/docs/v4/chart-types/xy-chart/#Alternate_smoothing_algorithm
    MONOTONE_Y = "monotoneY"  // See https://www.amcharts.com/docs/v4/chart-types/xy-chart/#Alternate_smoothing_algorithm
}

export enum TrendLineType {

    MEAN = "MEAN",

    OLS = "OLS"

}

export interface IStrokeStyleProperties extends FormFieldObject {
    /**
     * Stroke color of the border.
     */
    itemStrokeFill?: string;

    /**
     * Width of the border.
     */
    itemStrokeWidth: number;

    /**
     * Opacity of the border.
     */
    itemStrokeOpacity: number;
}

export enum LegendPositionOption {
    "bottom_left" = "bottom_left",
    "bottom_center" = "bottom_center",
    "bottom_right" = "bottom_right",
    "right_bottom" = "right_bottom",
    "right_middle" = "right_middle",
    "right_top" = "right_top",
    "top_right" = "top_right",
    "top_center" = "top_center",
    "top_left" = "top_left",
    "left_top" = "left_top",
    "left_middle" = "left_middle",
    "left_bottom" = "left_bottom"
}

export enum OverflowType {
    WRAP = 'WRAP',
    TRUNCATE = 'TRUNCATE',
    NONE = 'NONE'
}

export enum CategoryAxisRotateLabels {
    YES = 'YES',
    NO = 'NO'
}

export enum SeriesLabelsPosition {
    START = "START",
    MIDDLE = "MIDDLE",
    END = "END",
    OUTSIDE = "OUTSIDE"
}

export enum SeriesType {
    LINE = "LINE",
    COLUMN = "COLUMN"
}

export enum DrawSeriesOnAxis {
    LEFT = "left",
    RIGHT = "right"
}

export interface IBulletShapeOptions extends FormFieldObject {
    bulletShapeWidth: number;
    bulletShapeHeight: number;
}

export interface Am4PieSeriesOptions extends FormFieldObject, IStrokeStyleProperties {

    /**
     * Values.
     *
     * Data column (numeric) that defines the value of the slices.
     */
    value: TidyTableColumnSelector;

    /**
     * Tooltip.
     *
     * The text displayed as a tooltip on the slices.
     */
    chartCursorTooltipPie: string;

    /**
     * Sort Slices.
     *
     * Preferably, the slices of the donut chart are sorted large to small. Enable this options to sort the slices.
     */
    pieSeriesSortSlices: boolean;

    /**
     * Colors.
     *
     * Data column that defines the colors of the slices. Using the Category (see the Labels section) as default.
     */
    color?: TidyTableColumnSelector;
}

export interface Am4PieLabelOptions extends FormFieldObject {

    /**
     * Category.
     *
     * Data column that identifies the slices in the pie chart.
     */
    category: TidyTableColumnSelector;

    /**
     * Text.
     *
     * The text displayed on the slices.
     */
    sliceLabelsText: string;

    /**
     * Max Width.
     *
     * Maximum width of the label.
     */
    sliceLabelsMaxWidth: number;

    /**
     * Overflow Type.
     *
     * What happens when the label is larger than the max width?
     */
    sliceLabelsOverflow?: OverflowType;

    /**
     * Align Labels.
     *
     * Align the labels to the left and to the right of the chart.
     */
    sliceLabelsAlignLabels: boolean;

    /**
     * Hide labels below this threshold. Can be a number (e.g., 100) or a percentage (e.g., 5%).
     */
    sliceLabelsHideThreshold?: string;
}

export interface Am4LabelOptions extends FormFieldObject {

    /**
     * Text.
     *
     * The text displayed in the center of the chart.
     * Use a single space to show no text and disable the label.
     */
    labelText: string;

    labelTextAlign: 'start' | 'end' | 'middle';
    labelDy: number;
    labelDx: number;
    labelHasBackground: boolean;
    labelBackgroundColor?: IColorDef;
    labelBackgroundOpacity: number;
    labelHorizontalCenter: 'left' | 'middle' | 'right' | 'none';
    labelVerticalCenter: 'bottom' | 'middle' | 'top' | 'none';
}

export interface Am4LegendOptions extends FormFieldObject {

    /**
     * Legend.
     */
    legendEnabled: boolean;

    /**
     * Legend Position.
     */
    legendPosition: LegendPositionOption;

    /**
     * Reverse Legend Order.
     *
     * Reverse the items in the legend.
     */
    legendOrderReversed: boolean;
}

export interface Am4DonutLegendOptions extends Am4LegendOptions {

    /**
     * Legend Label.
     *
     * The HTML contents of the legend labels.
     */
    legendLabel: string;

    /**
     * Legend Value.
     *
     * Show a value in the legend next to the label. Leave blank to show no value. The value is rendered as HTML.
     */
    legendValue?: string;
}

export interface Am4DonutOptions extends FormFieldObject {

    /**
     * Inner Radius.
     *
     * The inner radius of the donut as a percentage of the outer radius. Set to 0 to get a pie chart.
     */
    donutInnerRadius: number;

    /**
     * Radius.
     *
     * The radius of the chart as a percentage of the available space.
     */
    donutRadius: number;

    /**
     * Start Angle.
     *
     * The donut starts at this angle. "The angle in degrees is a value between 0 and 360. Note, the angle starts
     * at 3 o'clock and rotates clockwise. An angle of 180 starts the donut at 9 o'clock.
     */
    donutStartAngle: number;

    /**
     * End Angle.
     *
     * The angle in degrees is a value between 0 and 360. Note, the angle starts at 3 o'clock and rotates clockwise.
     * An angle of 360 ends the donut at 3 o'clock.
     */
    donutEndAngle: number;
}

export interface Am4GaugeHandOptions extends FormFieldObject {

    /**
     * Value.
     *
     * The hand will point to this value on the axis. Note, The gauge only considers the first row.
     */
    value: TidyTableColumnSelector;

    /**
     * Color.
     *
     * The color of the hand.
     */
    gaugeHandColor: string;

    gaugeHandInnerRadius: number;
    gaugeHandStartWidth: number;
    gaugeHandPinDisabled: boolean;
    gaugeHandPinRadius: number;
}

export interface Am4GaugeAxisOptions extends FormFieldObject {

    /**
     * Minimum.
     *
     * Start value of the axis.
     */
    gaugeAxisMinimum: string;

    /**
     * Maximum.
     *
     * End value of the axis.
     */
    gaugeAxisMaximum: string;

    /**
     * Format.
     *
     * Format pattern. Examples: integer: `#.`; number: `#`; two decimals: `#.00`; thousands/millions: `#a`; currency: `€#`.
     */
    gaugeAxisValueFormat?: string;

    /**
     * Min Label Distance.
     *
     * Minimum distance between axis labels.
     */
    gaugeAxisMinGridDistance: number;

    /**
     * Axis Ranges.
     *
     * JSON Axis Ranges. For example:
     *
     * <pre>
     * [
     *   {
     *     "label": "low",
     *     "start": 0,
     *     "end": 50,
     *     "color": "red"
     *   },
     *   {
     *     "label": "high",
     *     "start": 50,
     *     "end": 100,
     *     "color": "green"
     *   }
     * ]
     * </pre>
     */
    gaugeAxisRanges?: string;

    gaugeAxisShowLabels: boolean;
    gaugeAxisBentLabels: boolean;
    gaugeAxisSwapAxes: boolean;
    gaugeAxisLabelsRadius: number;
    gaugeAxisRadius: number;
    gaugeAxisRangesRadius: number;
    gaugeAxisRangeLabelsRadius: number;
    gaugeAxisRangeOpacity: number;
}

export interface Am4GaugeOptions extends FormFieldObject {

    /**
     * Radius.
     *
     * The radius of the chart as a percentage of the available space.
     */
    gaugeRadius: number;

    gaugeInnerRadius: number;
    gaugeStartAngle: number;
    gaugeEndAngle: number;
}

export interface Am4SimpleCategoryAxisOptions extends FormFieldObject {

    /**
     * Title Text.
     *
     * The title of the horizontal axis.
     *
     * [Bar Chart]
     *
     * Title Text.
     *
     * The title of the vertical axis.
     */
    xAxisTitleText?: string;

    /**
     * Label Spacing.
     *
     * Controls the minimum space between the labels.
     */
    xAxisLabelSpacing?: number;

    /**
     * Max Label Width.
     *
     * The maximum width in pixels for the labels.
     */
    xAxisLabelMaxWidth?: number;

    /**
     * Label Overflow.
     *
     * Choice of behavior when the label is larger than the max width.
     */
    xAxisLabelOverflow?: OverflowType;

    /**
     * Rotate Label.
     *
     * Rotate the labels on the category axis by 45 degrees.
     */
    xAxisRotateLabels?: CategoryAxisRotateLabels;

    /**
     * Cell Start Location.
     *
     * Value between 0 and 1 that indicates where the category starts on the grid.
     */
    xAxisCellStartLocation: number;

    /**
     * Cell End Location.
     *
     * Value between 0 and 1 that indicates where the category ends on the grid.
     */
    xAxisCellEndLocation: number;

    /**
     * Initial Zoom.
     *
     * The start index and the end index seperated by a comma. You can use negative values to get the index from the
     * end of the axis. E.g., `-10,-1` zooms to the last 10 items.
     */
    xAxisInitialZoom?: string;

    /**
     * In-place processing of the amCharts 4 category/date axis instance.
     *
     * <pre>
     *     ( value: CategoryAxis | DateAxis ) => void;
     * </pre>
     */
    xAxisPostRenderHook?: Hook<any>;
}

export interface Am4ValueAxisOptions extends FormFieldObject {

    /**
     * Title Text.
     *
     * The title of the vertical axis.
     *
     * [Bar Chart]
     *
     * Title Text.
     *
     * The title of the horizontal axis.
     */
    yAxisTitleText?: string;

    /**
     * Minimum.
     *
     * The axis starts at this value.
     */
    yAxisMinimum?: number;

    /**
     * Maximum.
     *
     * The axis ends at this value.
     */
    yAxisMaximum?: number;

    /**
     * Adjust Minimum By.
     *
     * Expand the calculated axis range by this percentage, making the minimum smaller.
     */
    yAxisExtraMinimum?: number;

    /**
     * Adjust Maximum By.
     *
     * Expand the calculated axis range by this percentage, making the maximum larger.
     */
    yAxisExtraMaximum?: number;

    /**
     * Always Include Zero.
     *
     * Always show zero in the axis.
     */
    yAxisIncludeZero: boolean;

    /**
     * Show Numbers.
     *
     * Display the numbers next to the axis.
     */
    yAxisShowLabels: boolean;

    /**
     * Value Format.
     *
     * Format pattern. Examples: integer: `#.`; number: `#`; two decimals: `#.00`; thousands/millions: `#a`; currency: `€#`.
     */
    yAxisValueFormat?: string;

    /**
     * Minimum Grid Distance.
     *
     * The minimum distance between the grid lines.
     */
    yAxisMinGridDistance?: number;

    /**
     * Initial Zoom.
     *
     * The start value and the end value seperated by a comma.
     */
    yAxisInitialZoom?: string;

    /**
     * Show the grid lines perpendicular to the value axis.
     */
    yAxisShowGridLines: boolean;

    /**
     * In-place processing of the amCharts 4 category/date axis instance.
     *
     * <pre>
     *     ( value: ValueAxis ) => void;
     * </pre>
     */
    yAxisPostRenderHook?: Hook<any>;
}

export interface Am4SimpleColumnSeriesOptions extends FormFieldObject, IStrokeStyleProperties {

    /**
     * Value.
     *
     * Display the distribution of the values in this column.
     */
    value: TidyTableColumnSelector;

    /**
     * Group By.
     *
     * Distribution for each group.
     */
    groupBy?: TidyTableColumnSelector;

    /**
     * Column Color.
     *
     * A column with colors for the columns in the chart.
     */
    columnSeriesColor?: TidyTableColumnSelector;

    /**
     * Tooltip.
     *
     * Show this text when hovering the column in the chart.
     */
    chartCursorTooltipColumn: string;

    /**
     * Legend Text.
     *
     * The name of the column series in the legend.
     */
    legendColumnSeriesLabel?: string;

    /**
     * Show Value in Legend.
     *
     * Show values in the legend when the user moves the cursor over the chart.
     */
    legendColumnSeriesShowValue: boolean;

    /**
     * Clustered.
     *
     * Show the columns in a group next to each other. If false, the chart renders them layered on top of each other.
     */
    clustered: boolean;

    /**
     * Fill Opacity.
     *
     * Opacity of the columns fill (excluding the border).
     */
    columnFillOpacity: number;
}

export interface Am4ValueLabelOptions extends FormFieldObject {

    /**
     * Value Labels.
     *
     * Add a value label for each item in the chart.
     */
    seriesLabelsEnabled: boolean;

    /**
     * Label Text.
     */
    seriesLabelsText: string;

    /**
     * Label Position.
     *
     * Where to show the label on the item.
     */
    seriesLabelsPosition: SeriesLabelsPosition;

    /**
     * Hide Small Labels.
     *
     * Hide labels that don't fit.
     */
    seriesLabelsHideOversize: boolean;

    /**
     * Stack Top Text.
     *
     * Text displayed on top of the stack.
     */
    seriesLabelsStackTotalText?: string;
}

export interface Am4SecondValueLabelOptions extends FormFieldObject {
    /**
     * @see Am4ValueLabelOptions
     */
    seriesLabelsEnabledSecond: boolean;

    /**
     * @see Am4ValueLabelOptions
     */
    seriesLabelsTextSecond: string;

    /**
     * @see Am4ValueLabelOptions
     */
    seriesLabelsPositionSecond: SeriesLabelsPosition;

    /**
     * @see Am4ValueLabelOptions
     */
    seriesLabelsHideOversizeSecond: boolean;

    /**
     * @see Am4ValueLabelOptions
     */
    seriesLabelsStackTotalTextSecond?: string;
}

export interface Am4ChartCursorOptions extends FormFieldObject {

    /**
     * Chart Cursor.
     */
    chartCursorEnabled: boolean;

    /**
     * Chart Cursor Behavior.
     *
     * Action performed when the user drags the cursor.
     */
    chartCursorBehaviour: "zoomX" | "zoomY" | "zoomXY" | "selectX" | "selectY" | "selectXY" | "panX" | "panY" | "panXY" | "none";
}

export interface Am4ScrollbarOptions extends FormFieldObject {

    /**
     * Horizontal Scrollbar.
     */
    EnableScrollbarX: boolean;

    /**
     * Horizontal Scrollbar Plot.
     *
     * Show the first series as a plot in the horizontal scrollbar.
     */
    ScrollbarXShowSeries: boolean;

    /**
     * Vertical Scrollbar.
     */
    EnableScrollbarY: boolean;

    /**
     * Vertical Scrollbar Plot.
     *
     * Show the first series as a plot in the vertical scrollbar.
     */
    ScrollbarYShowSeries: boolean;
}

export interface Am4SankeyFlowOptions extends FormFieldObject {

    /**
     * Value.
     *
     * Flow values.
     */
    value: TidyTableColumnSelector;

    /**
     * Link Fill Opacity.
     *
     * Value between 0 and 1 for the opacity of the links/flows between the nodes.
     */
    linkFillOpacity: number;

    /**
     * Flow Tension.
     *
     * Set to 1 for straight flows. Smaller values make the flows curve more.
     */
    flowTension: number;

    /**
     * Color Mode.
     */
    colorMode: 'solid' | 'gradient' | 'fromNode' | 'toNode';

    /**
     * The tooltip for the node
     */
    flowTooltip?: string;
}

export interface Am4SankeyNodeOptions extends FormFieldObject, IStrokeStyleProperties {

    /**
     * Width.
     *
     * Depending on the orientation, the width (if horizontal) or height (if vertical) of the node.
     */
    nodeWidth: number;

    /**
     * Tooltip for the node
     */
    nodeTooltip?: string;
}

export interface Am4SankeyDiagramOptions extends FormFieldObject {

    /**
     * Orientation.
     *
     * Show the Sankey from left to right if 'Horizontal' and from top to bottom if 'Vertical'.
     */
    orientation: 'horizontal' | 'vertical';

    /**
     * If true, the first column describes the from nodes, and the second column the to nodes.
     */
    useFromToDataDefinition: boolean;
}

export interface Am4TreeMapSeriesOptions extends FormFieldObject, IStrokeStyleProperties {

    /**
     * First Level.
     *
     * The first level contains the names for the items.
     */
    level0: TidyTableColumnSelector;

    /**
     * Second Level.
     *
     * Adds a hierarchy to the first level.
     */
    level1?: TidyTableColumnSelector;

    /**
     * Values.
     *
     * Sizes of the boxes.
     */
    value: TidyTableColumnSelector;

    /**
     * Color.
     *
     * Column containing colors for the tree items.
     */
    treemapColor?: TidyTableColumnSelector;

    /**
     * Labels when labelType is 'html'. Expression for the labels on the tree items.
     */
    labelExpressionHTML: string;

    /**
     * Labels when labelType is 'text'. Expression for the labels on the tree items.
     */
    labelExpressionText: string;

    /**
     * Label Type.
     *
     * Render the label as text or as HTML.
     */
    labelType: "html" | "text";

    /**
     * Label Overflow.
     *
     * Choice of behavior when the label is larger than the max width.
     */
    labelOverflow?: OverflowType;

    /**
     * Tooltips.
     *
     * Expression for the tooltip when hovering a tree item.
     */
    tooltipExpression: string;

    /**
     * Corner Radius.
     */
    cornerRadius: number;

    /**
     * Layout Algorithm.
     *
     * The algorithm used to divide the area into squares based on their values.
     */
    layoutAlgorithm: "binaryTree" | "dice" | "slice" | "sliceDice" | "squarify";
}

export interface Am4GeoSeriesOptions extends FormFieldObject {

    /**
     * Region.
     *
     * Column with [ISO-2 codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
     * (e.g., US, CH, GB, FR). Note that provinces, regions, departments are available as well (e.g., FR-30).
     */
    region: TidyTableColumnSelector;

    /**
     * Region Click Column.
     *
     * If defined, the column that is used to fire the region-click event.
     */
    hitColumn?: TidyTableColumnSelector;

    /**
     * Map.
     *
     * The map displayed by the chart. Use any URL to access your own GeoJSON file
     * (e.g., https://customer.com/world.json).
     */
    mapUrl: string;

    /**
     * Map Projection.
     */
    mapProjection: GeoMapChartProjection;

    /**
     * Initial Zoom.
     *
     * To set the currently displayed zoom open the widget's menu (top right) and click on 'Set Zoom & Center'.
     */
    initialZoom?: number;

    /**
     * Initial Latitude.
     *
     * To set the currently displayed latitude open the widget's menu (top right) and click on 'Set Zoom & Center'.
     */
    initialLatitude?: number;

    /**
     * Initial Longitude.
     *
     * To set the currently displayed longitude open the widget's menu (top right) and click on 'Set Zoom & Center'.
     */
    initialLongitude?: number;

    /**
     * Region Tooltip.
     *
     * The region column is the expression default column.
     */
    tooltip?: string;

    /**
     * Unmatched Regions Strategy.
     *
     * Used for missing map regions in the query.
     */
    unmatchedRegionStrategy: GeoMapChartUnMatchedRegionStrategy;

    /**
     * Excluded Regions.
     *
     * A comma separated list of country codes that will be excluded from the map (e.g., US, CH, GB).
     */
    excludedRegions?: string;

    /**
     * Draggable.
     */
    draggable: boolean;

    /**
     * Zoomable.
     */
    zoomable: boolean;

    /**
     * Region Color.
     *
     * A column with the colors of the regions.
     */
    regionColorColumn?: TidyTableColumnSelector;

    /**
     * Default Region Color.
     *
     * Color used for regions without a value in the 'Region Color' column.
     */
    regionColor: IColorDef;

    /**
     * Background Color (Water).
     */
    backgroundColor?: IColorDef;
}

export interface Am4SecondValueAxisOptions extends FormFieldObject {

    /**
     * Title Text.
     *
     * The title of the vertical axis.
     */
    yAxisSecondTitleText?: string;

    /**
     * Minimum.
     *
     * The axis starts at this value.
     */
    yAxisSecondMinimum?: number;

    /**
     * Maximum.
     *
     * The axis end at this value.
     */
    yAxisSecondMaximum?: number;

    /**
     * Adjust Minimum By.
     *
     * Expand the calculated axis range by this percentage, making the minimum smaller.
     */
    yAxisSecondExtraMinimum?: number;

    /**
     * Adjust Maximum By.
     * Expand the calculated axis range by this percentage, making the maximum larger.
     */
    yAxisSecondExtraMaximum?: number;

    /**
     * Always Include Zero.
     *
     * Always show zero in the axis.
     */
    yAxisSecondIncludeZero: boolean;

    /**
     * Show Numbers.
     *
     * Display the numbers next to the axis.
     */
    yAxisSecondShowLabels: boolean;

    /**
     * Value Format.
     *
     * Format pattern. Examples: integer: `#.`; number: `#`; two decimals: `#.00`; thousands/millions: `#a`; currency: `€#`.
     */
    yAxisSecondValueFormat?: string;

    /**
     * Minimum Grid Distance.
     *
     * The minimum distance between the grid lines.
     */
    yAxisSecondMinGridDistance?: number;

    /**
     * Initial Zoom.
     *
     * The start value and the end value seperated by a comma.
     */
    yAxisSecondInitialZoom?: string;

    /**
     * In-place processing of the amCharts 4 category/date axis instance.
     *
     * <pre>
     *     ( value: ValueAxis ) => void;
     * </pre>
     */
    yAxisSecondPostRenderHook?: Hook<any>;
}

export interface Am4BubbleSeriesOptions extends FormFieldObject, IStrokeStyleProperties {

    /**
     * Labels.
     *
     * Names for the bubbles.
     */
    label: TidyTableColumnSelector;

    /**
     * X-Values.
     *
     * The x-coordinates of the bubbles.
     */
    valueX: TidyTableColumnSelector;

    /**
     * Y-Values.
     *
     * The y-coordinates of the bubbles.
     */
    valueY: TidyTableColumnSelector;

    /**
     * Bubble Size
     */
    bubbleSize?: TidyTableColumnSelector;

    /**
     * Group.
     *
     * Create a new series for each group.
     */
    group?: TidyTableColumnSelector;

    /**
     * Color.
     *
     * Color of the item in the scatter plot.
     */
    scatterSeriesColor?: TidyTableColumnSelector;

    /**
     * Tooltip.
     *
     * The text displayed as a tooltip on the points.
     */
    chartCursorTooltipScatter: string;

    /**
     * Min Bubble Size.
     *
     * The minimum bubble size in pixels. The bubble with the smallest value for size gets this size.
     */
    minBubbleSize: number;

    /**
     * Max Bubble Size.
     *
     * The maximum bubble size in pixels. The bubble with the largest value for size gets this size.
     */
    maxBubbleSize: number;

    /**
     * Fill Opacity.
     */
    fillOpacity: number;
}

export interface Am4ScatterTrendLineOptions extends FormFieldObject {

    /**
     * Trend Line.
     */
    trendLineEnabled: boolean;

    /**
     * Trend Line Color.
     *
     * Column containing the color for the trend line.
     */
    trendLineColor?: IColorDef;

    /**
     * Stroke Dash Array.
     *
     * Comma separated list of dash-lengths and gap-lengths. Use 0 for solid line.
     */
    trendLineStrokeDashArray: string;

    /**
     * Show in Legend.
     *
     * Display the trend line in the legend (if the legend is enabled).
     */
    trendLineShowInLegend: boolean;

    /**
     * Per Group.
     *
     * Display a trend line for each group?
     */
    trendLinePerGroup: boolean;
}

export interface Am4CategoryDateAxisOptions extends FormFieldObject {

    /**
     * If we have (date)times available, then
     * YES -> always use them
     * NO -> never use them
     * AUTO -> use them if the level is a date or datetime (in MDX, these are levels of type DAY, HOUR, MINUTE, SECOND).
     */
    useDatetimeAxis: UseDatetimeAxis

    /**
     * Axis.
     *
     * Displayed on the x-axis.
     *
     * [Scatter Plot Chart]
     *
     * Labels.
     *
     * Column with the label for the point.
     *
     * [Bar Chart]
     *
     * Axis.
     *
     * Displayed on the y-axis.
     *
     * [Stacked Bar Chart]
     *
     * Axis.
     *
     * Displayed on the y-axis.
     */
    axis: TidyTableColumnSelector;

    /**
     * Group.
     *
     * Create a new series for each group.
     */
    group?: TidyTableColumnSelector;

    /**
     * Level.
     *
     * Adds an extra level to the x-axis.
     *
     * [Bar Chart]
     *
     * Level.
     *
     * Adds an extra level to the y-axis.
     *
     * [Stacked Bar Chart]
     *
     * Level.
     *
     * Adds an extra level to the y-axis.
     */
    level?: TidyTableColumnSelector;

    /**
     * Label Text.
     *
     * Labels of the horizontal axis. Does not work with a date axis.
     *
     * [Bar Chart]
     *
     * Label Text.
     *
     * The labels of the vertical axis. Does not work with a date axis.
     */
    xAxisLabelsText: string;

    /**
     * Label Tooltip.
     *
     * The HTML contents of the axis tooltip when the user hovers the chart and cursor is active.
     * Does not work with a date axis.
     */
    xAxisLabelTooltipText: string;

    /**
     * The date format for the labels that show when the user hovers over the chart with a chart cursor.
     * Leave undefined to use the axis-date format.
     * Read more about the format codes here: https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/#Format_codes
     */
    xAxisLabelTooltipDateFormat?: string;

    /**
     * Title Text.
     *
     * The title of the horizontal axis.
     *
     * [Bar Chart]
     *
     * Title Text.
     *
     * The title of the vertical axis
     */
    xAxisTitleText?: string;

    /**
     * Label Spacing.
     *
     * Controls the minimum space between the labels.
     */
    xAxisLabelSpacing?: number;

    /**
     * Max Label Width.
     *
     * The maximum width in pixels for the labels.
     */
    xAxisLabelMaxWidth?: number;

    /**
     * Label Overflow.
     *
     * Choice of behavior when the label is larger than the max width.
     */
    xAxisLabelOverflow?: OverflowType;

    /**
     * Rotate Label.
     *
     * Rotate the labels on the category axis by 45 degrees.
     */
    xAxisRotateLabels?: CategoryAxisRotateLabels;

    /**
     * Level Label.
     *
     * Edit the HTML of the labels in the levels.
     */
    xAxisLevelLabelsText: string;

    /**
     * Cell Start Location.
     *
     * Value between 0 and 1 that indicates where the category starts on the grid.
     */
    xAxisCellStartLocation: number;

    /**
     * Cell End Location.
     *
     * Value between 0 and 1 that indicates where the category ends on the grid.
     */
    xAxisCellEndLocation: number;

    /**
     * Label Type.
     *
     * Render the label as text or as HTML.
     */
    xAxisLabelType: "html" | "text";

    /**
     * Initial Zoom.
     *
     * The start index and the end index seperated by a comma. You can use negative values to get the index from the
     * end of the axis. E.g., `-10,-1` zooms to the last 10 items.
     */
    xAxisInitialZoom?: string;

    /**
     * Show the grid lines perpendicular to the category axis.
     */
    xAxisShowGridLines: boolean;

    /**
     * In-place processing of the amCharts 4 category/date axis instance.
     *
     * <pre>
     *     ( value: CategoryAxis | DateAxis ) => void;
     * </pre>
     */
    xAxisPostRenderHook?: Hook<any>;
}

export interface Am4ValueAxisRangeOptions extends FormFieldObject {

    /**
     * Y-Axis Range.
     *
     * Display a line or a ranged fill/band on the y-axis.
     *
     * [Bar Chart]
     *
     * X-Axis Range.
     *
     * Display a line or a ranged fill / band on the x-axis.
     *
     * [Stacked Bar Chart]
     *
     * X-Axis Range.
     *
     * Display a line or a ranged fill / band on the x-axis.
     */
    axisRangeEnabled: boolean;

    /**
     * Type.
     */
    axisRangeType: AxisRangeType;

    /**
     * Start Value.
     *
     * Starting value of the range or value of the line.
     */
    axisRangeStart: string;

    /**
     * End Value.
     *
     * Ending value for the range.
     */
    axisRangeEnd: string;

    /**
     * Label.
     *
     * Label to display on the range.
     */
    axisRangeLabel: string;

    /**
     * Inside.
     *
     * If enabled, the range renders the label inside the chart.
     */
    axisRangeLabelInside: boolean;

    /**
     * Color.
     *
     * The color of the ranged fill / band or line.
     */
    axisRangeColor?: IColorDef;

    /**
     * Range Opacity.
     *
     * The opacity of the ranged fill / band.
     */
    axisRangeFillOpacity: number;

    /**
     * Stroke Opacity.
     *
     * The opacity of the line.
     */
    axisRangeStrokeOpacity: number;

    /**
     * Stroke Width.
     *
     * The width of the line.
     */
    axisRangeStrokeWidth: number;

    /**
     * Stroke Dash Array.
     *
     * Comma separated list of dash-lengths and gap-lengths. Use 0 for solid line.
     */
    axisRangeStrokeDashArray: string;

    /**
     * Above.
     *
     * If enabled, the chart renders the range or line above the series.
     */
    axisRangeAboveGrid: boolean;
}

export interface Am4LineSeriesOptions extends FormFieldObject, IStrokeStyleProperties, IBulletShapeOptions {

    /**
     * [Line Chart]
     *
     * Line Values.
     *
     * A column with values for the line.
     *
     * [Area Chart]
     *
     * Area Values.
     *
     * The values for the area series.
     *
     * [Stacked Area Chart]
     *
     * Area Values.
     *
     * A column with values for the stacked area chart.
     */
    lineValue: TidyTableColumnSelector[];

    /**
     * Shape.
     *
     * Use this column to change the shape of the data-point.
     */
    lineBulletShape?: TidyTableColumnSelector;

    /**
     * Hide Line Bullets
     */
    hideLineBullets: boolean;

    /**
     * Tooltip.
     *
     * The text displayed as a tooltip on the line.
     */
    chartCursorTooltipLine: string;

    /**
     * Legend Text.
     *
     * The name of the line series in the legend.
     */
    legendLineSeriesLabel?: string;

    /**
     * Show Value in Legend.
     *
     * Show values in the legend when the user moves the cursor over the chart.
     */
    legendLineSeriesShowValue: boolean;

    /**
     * Area Fill Opacity.
     *
     * A value on [0, 1], where 0 is fully transparent and 1 is no transparency.
     */
    areaFillOpacity: number;

    /**
     * Line Color.
     *
     * A column with colors for the line and bullets in the chart.
     */
    lineSeriesColor?: TidyTableColumnSelector;

    /**
     * If true, connect the lines over empty data points.
     */
    connectLineSeries: boolean;

    smoothLineMethod: Amcharts4LineSmoothMethod;

    /**
     * Smooth the line chart. The tension is a value between 0 (no tension) and 1 (maximum tension).
     */
    smoothLineTensionX: number;
    smoothLineTensionY: number;
}

export interface Am4ComboSeriesOptions extends FormFieldObject, IStrokeStyleProperties {

    /**
     * Values for the left series. Named line due to legacy.
     */
    lineValue: TidyTableColumnSelector[];

    /**
     * Values for the right series. Named column due to legacy.
     */
    columnValue: TidyTableColumnSelector[];

    /**
     * Draw the line-series in this axis. Defaults to "left".
     */
    lineSeriesDrawOnAxis: DrawSeriesOnAxis;

    /**
     * Draw the column-series in this axis. Defaults to "right".
     */
    columnSeriesDrawOnAxis: DrawSeriesOnAxis;

    /**
     * Type of the left series. Line / Column.
     */
    seriesTypeLeft: SeriesType;

    /**
     * Type of the right series. Line / Column.
     */
    seriesTypeRight: SeriesType;

    // Options if left series is LINE. @see Am4LineSeriesOptions
    lineBulletShapeLeft?: TidyTableColumnSelector;
    hideLineBulletsLeft: boolean;
    chartCursorTooltipLineLeft: string;
    legendLineSeriesLabelLeft?: string;
    legendLineSeriesShowValueLeft: boolean;
    areaFillOpacityLeft: number;
    lineSeriesColorLeft?: TidyTableColumnSelector;
    connectLineSeriesLeft: boolean;
    smoothLineMethodLeft: Amcharts4LineSmoothMethod;
    smoothLineTensionXLeft: number;
    smoothLineTensionYLeft: number;
    // Options if left series is COLUMN. @see Am4ColumnSeriesOptions
    chartCursorTooltipColumnLeft: string;
    legendColumnSeriesLabelLeft?: string;
    legendColumnSeriesShowValueLeft: boolean;
    columnSeriesColorLeft?: TidyTableColumnSelector;

    // Options if right series is LINE. @see Am4LineSeriesOptions
    lineBulletShapeRight?: TidyTableColumnSelector;
    hideLineBulletsRight: boolean;
    chartCursorTooltipLineRight: string;
    legendLineSeriesLabelRight?: string;
    legendLineSeriesShowValueRight: boolean;
    areaFillOpacityRight: number;
    lineSeriesColorRight?: TidyTableColumnSelector;
    connectLineSeriesRight: boolean;
    smoothLineMethodRight: Amcharts4LineSmoothMethod;
    smoothLineTensionXRight: number;
    smoothLineTensionYRight: number;
    // Options if right series is COLUMN. @see Am4ColumnSeriesOptions
    chartCursorTooltipColumnRight: string;
    legendColumnSeriesLabelRight?: string;
    legendColumnSeriesShowValueRight: boolean;
    columnSeriesColorRight?: TidyTableColumnSelector;

}

export interface Am4ColumnSeriesOptions extends FormFieldObject, IStrokeStyleProperties {

    /**
     * [Column Chart]
     *
     * Column Values.
     *
     * A column with values for the series.
     *
     * [Bar Chart]
     *
     * Bar Values.
     *
     * A column with values for the bar series.
     *
     * [Stacked Bar Chart]
     *
     * Bar Values.
     *
     * A column with values for the stacked bar series.
     *
     * [Stacked Column Chart]
     *
     * Values Column.
     *
     * A column with values for the stacked column series.
     */
    columnValue: TidyTableColumnSelector[];

    /**
     * Tooltip.
     *
     * Show this text when hovering the column in the chart.
     */
    chartCursorTooltipColumn: string;

    /**
     * Legend Text.
     *
     * The name of the column series in the legend.
     */
    legendColumnSeriesLabel?: string;

    /**
     * Show Value in Legend.
     *
     * Display values in the legend when the user moves the cursor over the chart.
     */
    legendColumnSeriesShowValue: boolean;

    /**
     * Column Color.
     *
     * A column with colors for the columns in the chart.
     */
    columnSeriesColor?: TidyTableColumnSelector;
}

export interface Am4DivergentAxisLabelOptions extends FormFieldObject {

    /**
     * The text to show in the left label. Use a single space to not show the label.
     */
    leftLabelText: string;

    /**
     * The text to show in the right label. Use a single space to not show the label.
     */
    rightLabelText: string;

}

export interface Am4DivergentBarSeriesOptions extends FormFieldObject, IStrokeStyleProperties {

    /**
     * Values for the series on the left
     */
    leftValue: TidyTableColumnSelector;

    /**
     * Values for the series on the right
     */
    rightValue: TidyTableColumnSelector;

    /**
     * Tooltip.
     *
     * Show this text when hovering the column in the chart.
     */
    chartCursorTooltipColumn: string;

    /**
     * Legend Text.
     *
     * The name of the column series in the legend.
     */
    legendColumnSeriesLabel?: string;

    /**
     * Show Value in Legend.
     *
     * Display values in the legend when the user moves the cursor over the chart.
     */
    legendColumnSeriesShowValue: boolean;
}

export interface Am4TrendLineOptions extends FormFieldObject {

    trendLineType: TrendLineType;

    /**
     * Trend Line
     */
    trendLineEnabled: boolean;

    /**
     * Stroke Dash Array.
     *
     * Comma separated list of dash-lengths and gap-lengths. Use 0 for solid line.
     */
    trendLineStrokeDashArray: string;

    /**
     * Show in Legend.
     *
     * Display the trend line in the legend (if the legend is enabled).
     */
    trendLineShowInLegend: boolean;

    /**
     * Trend Line Color.
     *
     * Column containing the color for the trend line.
     */
    trendLineColor?: IColorDef;

    /**
     * Per Group.
     *
     * Display a trend line for each group?
     */
    trendLinePerGroup: boolean;
}

export interface Am4ScatterSeriesOptions extends FormFieldObject, IStrokeStyleProperties, IBulletShapeOptions {

    /**
     * Labels.
     *
     * Column with the names for the scatter points.
     */
    label: TidyTableColumnSelector;

    /**
     * X-Values
     *
     * Column with the x-coordinates for the scatter points.
     */
    valueX: TidyTableColumnSelector;

    /**
     * Y-Values
     *
     * Column with the y-coordinates for the scatter points.
     */
    valueY: TidyTableColumnSelector;

    /**
     * Group.
     *
     * Create a new series for each group.
     */
    group?: TidyTableColumnSelector;

    /**
     * Color.
     *
     * Color of the item in the scatter plot.
     */
    scatterSeriesColor?: TidyTableColumnSelector;

    /**
     * Shape.
     *
     * Use this column to change the shape of the data-point.
     */
    scatterBulletShape?: TidyTableColumnSelector;

    /**
     * Tooltip.
     *
     * The text displayed as a tooltip on the points.
     */
    chartCursorTooltipScatter: string;
}

export interface Am4ChartOptions extends FormFieldObject {

    widgetVariant?: string;

    /**
     * In-place processing of the amCharts 4 chart instance.
     *
     * <pre>
     *     ( value: PublicAmchartsBase<amcharts4.Chart, options> ) => void;
     *
     *          value.getChart() is returning an instance of amChart 4 class
     *          whose name is available in chart options below.
     * </pre>
     */
    postRenderHook?: Hook<PublicAmCharts4Base<any, any>>;

    /**
     * Called after the chart is created.
     *
     * <pre>
     *     ( chart: amcharts4.Chart ) => void;
     * </pre>
     */
    onChartCreatedHook?: Hook<any>;

}

/**
 * The corresponding AmCharts 4 chart class is PieChart.
 */
export type AmCharts4DonutChartOptions =
    & Am4PieSeriesOptions
    & Am4PieLabelOptions
    & Am4LabelOptions
    & Am4DonutLegendOptions
    & Am4DonutOptions
    & Am4ChartOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is GaugeChart.
 */
export type AmCharts4GaugeChartOptions =
    & Am4GaugeHandOptions
    & Am4GaugeAxisOptions
    & Am4LabelOptions
    & Am4GaugeOptions
    & Am4ChartOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4HistogramOptions =
    Am4SimpleCategoryAxisOptions
    & Am4ValueAxisOptions
    & Am4SimpleColumnSeriesOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4ScrollbarOptions
    & Am4ChartOptions
    & Am4LegendOptions
    & TidyHistogramOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is SankeyDiagram.
 */
export type AmCharts4SankeyDiagramOptions =
    Am4SankeyFlowOptions
    & Am4SankeyNodeOptions
    & Am4SankeyDiagramOptions
    & Am4ChartOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is TreeMap.
 */
export type AmCharts4TreemapOptions =
    Am4ChartOptions
    & Am4LegendOptions
    & Am4TreeMapSeriesOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is MapChart.
 */
export type GeoMapChartOptions =
    Am4GeoSeriesOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4BubbleChartOptions =
    Am4SecondValueAxisOptions
    & Am4ValueAxisOptions
    & Am4BubbleSeriesOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4ScatterTrendLineOptions
    & Am4ScrollbarOptions
    & Am4LegendOptions
    & Am4ChartOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is  XYChart.
 */
export type AmCharts4ComboChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4SecondValueAxisOptions
    & Am4ComboSeriesOptions
    & Am4LegendOptions
    & Am4ChartCursorOptions
    & Am4ScrollbarOptions
    & Am4ChartOptions
    & Am4ValueLabelOptions
    ;

export type AmCharts4CoordinateChartOptions =
    Am4TrendLineOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4RegularAreaChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4LineSeriesOptions
    & Am4LegendOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4TrendLineOptions
    & Am4ScrollbarOptions
    & Am4ValueAxisRangeOptions
    & Am4ChartOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4RegularBarChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4ColumnSeriesOptions
    & Am4LegendOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4TrendLineOptions
    & Am4ScrollbarOptions
    & Am4ValueAxisRangeOptions
    & Am4ChartOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4DivergentBarChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4DivergentBarSeriesOptions
    & Am4LegendOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4ScrollbarOptions
    & Am4ValueAxisRangeOptions
    & Am4ChartOptions
    & Am4DivergentAxisLabelOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4RegularColumnChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4ValueAxisRangeOptions
    & Am4ColumnSeriesOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4TrendLineOptions
    & Am4ScrollbarOptions
    & Am4ChartOptions
    & Am4LegendOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4RegularLineChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4LineSeriesOptions
    & Am4LegendOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4TrendLineOptions
    & Am4ScrollbarOptions
    & Am4ChartOptions
    & Am4ValueAxisRangeOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4ScatterPlotOptions =
    Am4SecondValueAxisOptions
    & Am4ValueAxisOptions
    & Am4ScatterSeriesOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4ScatterTrendLineOptions
    & Am4ScrollbarOptions
    & Am4LegendOptions
    & Am4ChartOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4StackedAreaChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4LineSeriesOptions
    & Am4LegendOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4TrendLineOptions
    & Am4ScrollbarOptions
    & Am4ChartOptions
    & Am4ValueAxisRangeOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4StackedBarChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4ColumnSeriesOptions
    & Am4LegendOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4TrendLineOptions
    & Am4ScrollbarOptions
    & Am4ChartOptions
    & Am4ValueAxisRangeOptions
    ;

/**
 * The corresponding AmCharts 4 chart class is XYChart.
 */
export type AmCharts4StackedColumnChartOptions =
    & Am4CategoryDateAxisOptions
    & Am4ValueAxisOptions
    & Am4ColumnSeriesOptions
    & Am4ValueLabelOptions
    & Am4ChartCursorOptions
    & Am4TrendLineOptions
    & Am4ScrollbarOptions
    & Am4ChartOptions
    & Am4LegendOptions
    & Am4ValueAxisRangeOptions
    ;
