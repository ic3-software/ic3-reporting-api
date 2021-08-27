import {FormFieldObject} from "../PublicTemplateForm";

export interface GoogleMapMarkerProps extends FormFieldObject {

    /**
     * Predefined variants
     */
    variant?: string;

    /**
     * The symbol&#39;s path, which is a built-in symbol path, or a custom path
     * expressed using <a
     * href="http://www.w3.org/TR/SVG/paths.html#PathData">SVG path
     * notation</a>. Required.
     *
     * 22px,22px expected
     */
    path: string;

    /**
     * The symbol&#39;s fill opacity. Defaults to 0.
     */
    fillOpacity?: number;

    /**
     * The amount by which the symbol is scaled in size. For symbol markers,
     * this defaults to 1; after scaling, the symbol may be of any size. For
     * symbols on a polyline, this defaults to the stroke weight of the
     * polyline; after scaling, the symbol must lie inside a square 22 pixels in
     * size centered at the symbol&#39;s anchor.
     */
    scale?: number;

    /**
     * Anchor for the marker (0,0 is top left)
     */
    anchorX?: number;
    anchorY?: number;

    /**
     * The symbol&#39;s stroke color. All CSS3 colors are supported except for
     * extended named colors. For symbol markers, this defaults to
     * &#39;black&#39;. For symbols on a polyline, this defaults to the stroke
     * color of the polyline.
     */
    strokeColor?: string | null | undefined;
    /**
     * The symbol&#39;s stroke opacity. For symbol markers, this defaults to 1.
     * For symbols on a polyline, this defaults to the stroke opacity of the
     * polyline.
     */
    strokeOpacity?: number | null | undefined;
    /**
     * The symbol&#39;s stroke weight. Defaults to the <code>scale</code> of the
     * symbol.
     */
    strokeWeight?: number | null | undefined;

}

