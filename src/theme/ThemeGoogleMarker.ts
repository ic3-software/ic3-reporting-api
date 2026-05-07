import {TidyTableColumnSelector} from "../PublicTidyTableTypes";
import {GoogleMapChartOptions, GoogleMapCoordinateChartOptions} from "./ThemeGoogle";
import {IColorDef} from "../PublicTemplateForm";

export interface GoogleMarkerVariantChartOptions {

    /**
     * The symbol's path, which is a built-in symbol path, or a custom path expressed using
     * <a href="http://www.w3.org/TR/SVG/paths.html#PathData">SVG path notation</a>.
     *
     * 22px,22px expected.
     */
    path: string;

    /**
     * The symbol's fill opacity. Defaults to 0.
     */
    fillOpacity?: number;

    /**
     * The amount by which the symbol is scaled in size. For symbol markers, this defaults to 1; after scaling,
     * the symbol may be of any size. For symbols on a polyline, this defaults to the stroke weight of the polyline;
     * after scaling, the symbol must lie inside a square 22 pixels in size centered at the symbol's anchor.
     */
    scale?: number;

    /**
     * Anchor for the marker (0,0 is top left).
     */
    anchorX?: number;
    anchorY?: number;

    /**
     * The symbol's stroke color. All CSS3 colors are supported except for extended named colors. For symbol markers,
     * this defaults to 'black'. For symbols on a polyline, this defaults to the stroke color of the polyline.
     */
    strokeColor?: string | null | undefined;

    /**
     * The symbol's stroke opacity. For symbol markers, this defaults to 1. For symbols on a polyline,
     * this defaults to the stroke opacity of the polyline.
     */
    strokeOpacity?: number | null | undefined;

    /**
     * The symbol's stroke weight. Defaults to the <code>scale</code> of the symbol.
     */
    strokeWeight?: number | null | undefined;

}

/**
 * Google Marker Options (fields of the "Chart" tab in the widget editor).
 *
 * google.maps.Symbol
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: GoogleHeatMap
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface GoogleMarkerChartOptions extends GoogleMapCoordinateChartOptions, GoogleMapChartOptions {
    /**
     * Marker's Variant.
     */
    markersVariant?: string;

    /**
     * JSON object with the Pin Element
     */
    markerOptions?: string;

    /**
     * Marker Scale.
     *
     * The amount by which the symbol is scaled in size. For symbol markers, this defaults to 1; after scaling,
     * the symbol may be of any size. For symbols on a polyline, this defaults to the stroke weight of the polyline;
     * after scaling, the symbol must lie inside a square 22 pixels in size centered at the symbol's anchor.
     *
     * A row expression: c.scaleNormalize() or 1.
     */
    scale: string;

    /**
     * Scale Column.
     *
     * The column used in the scale expression.
     */
    scaleColumn?: TidyTableColumnSelector;

    /**
     * Tooltip.
     */
    tooltip?: string;

    /**
     * If marker variant is an HTML Element, the html content
     */
    html?: string;

    /**
     * The anchor X
     */
    markerAnchorX?: string;

    /**
     * The anchor y
     */
    markerAnchorY?: string;

    /**
     * Use Marker Clusters.
     *
     * Creates per-zoom-level clusters for large amounts of markers.
     */
    useMarkerClusterer: boolean;

    /**
     * Max Zoom.
     *
     * The maximum zoom level at which clustering is enabled.
     */
    maxZoom: number;

    /**
     * Min Cluster Size.
     *
     * The minimum number of markers needed in a cluster before the markers are hidden and a cluster marker appears.
     */
    minimumClusterSize?: number;

    /**
     * Cluster Title.
     *
     * The tooltip to display when the mouse moves over a cluster marker.
     */
    clusterTitle?: string;

    /**
     * Cluster color when count is below 10 or the mean.
     */
    clusterMinColor?: IColorDef;

    /**
     * Cluster color when count is above 10 or the mean.
     */
    clusterMaxColor?: IColorDef;

    /**
     * Zoom On Click.
     *
     * Zoom the area when clicking a clustered marker.
     */
    zoomOnClick: boolean;

    /**
     * Marker Click Event Column.
     *
     * Column used when firing a marker-click event.
     */
    clickEventColumn?: TidyTableColumnSelector;

    /**
     * Markers Fill Color.
     *
     * Column used containing the color of the markers.
     */
    color?: TidyTableColumnSelector;

}


