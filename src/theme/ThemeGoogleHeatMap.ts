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
     * Add Transparent Color.
     */
    addTransparentColor: boolean;

    /**
     * Dissipating.
     *
     * Specifies whether heatmaps dissipate on zoom. When dissipating is disabled the radius of influence increases
     * with zoom level to ensure that the color intensity is preserved at any given geographic location.
     */
    dissipating?: boolean;

    /**
     * Max Intensity.
     *
     * The maximum intensity of the heatmap. By default, heatmap colors are dynamically scaled according to
     * the greatest concentration of points at any particular pixel on the map. This property allows you to
     * specify a fixed maximum.
     */
    maxIntensity?: number;

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
    radius?: number;

}
