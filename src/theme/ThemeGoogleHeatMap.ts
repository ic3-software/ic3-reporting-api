import {GoogleMapChartOptions, GoogleMapCoordinateChartOptions} from "./ThemeGoogle";
import {TidyTableColumnSelector} from "../PublicTidyTableTypes";
import {IPaletteDef} from "../PublicTemplateForm";

/**
 * Image Options (fields of the "Chart" tab in the widget editor).
 *
 * google.maps.visualization.HeatmapLayerOptions
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: GoogleHeatMap
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface GoogleHeatMapChartOptions extends GoogleMapCoordinateChartOptions, GoogleMapChartOptions {

    /**
     * Weight.
     *
     * Weight of the data points.
     */
    weight?: TidyTableColumnSelector;

    /**
     * Color Gradient.
     */
    colorGradient?: IPaletteDef;

    /**
     * Max Intensity.
     *
     * The maximum intensity of the heatmap. By default, heatmap colors are dynamically scaled according to
     * the greatest concentration of points at any particular pixel on the map. This property allows you to
     * specify a fixed maximum.
     */
    intensity: number;

    /**
     * Ratio of the fading weight to the max weight, between `0` and `1`.
     *
     * For example, `0.1` affects all pixels with weight under 10% of the max.
     *
     * Ignored when `colorDomain` is specified.
     * @default 0.05
     */
    threshold: number;

    /**
     * Opacity.
     *
     * The opacity of the heatmap, expressed as a number between 0 and 1.
     */
    opacity: number;

    /**
     * Radius.
     *
     * The radius of influence for each data point, in pixels.
     */
    radius: number;

    /**
     * Defines the type of aggregation operation
     *
     * V valid values are 'SUM', 'MEAN'.
     *
     * @default 'SUM'
     */
    aggregation: 'SUM' | 'MEAN';

    /**
     * Specifies the size of weight texture.
     * @default 2048
     */
    weightsTextureSize: number;

    /**
     * Interval in milliseconds during which changes to the viewport don't trigger aggregation.
     *
     * @default 500
     */
    debounceTimeout: number;

}
