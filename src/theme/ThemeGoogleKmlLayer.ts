import {GoogleMapChartOptions} from "./ThemeGoogle";
import {TidyTableColumnSelector} from "../PublicTidyTableTypes";

/**
 * Google KML Map Options (fields of the "Chart" tab in the widget editor).
 *
 * google.maps.KmlLayerOptions
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: GoogleKmlLayer
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface GoogleKmlLayerChartOptions extends GoogleMapChartOptions {

    /**
     * Preserve Viewport.
     *
     * By default, the input map is centered and zoomed to the bounding box of the contents of the layer.
     * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
     * were never set.
     */
    preserveViewport: boolean;

    /**
     * Screen Overlays.
     *
     * Whether to render the screen overlays.
     */
    screenOverlays: boolean;

    /**
     * Suppress Info Windows.
     *
     * Suppress the rendering of info windows when layer features are clicked.
     */
    suppressInfoWindows: boolean;

    /**
     * KML URL.
     */
    kmlUrl: TidyTableColumnSelector;
}
