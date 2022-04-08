export class WidgetBoxClasses {

    /**
     * Root Styles applied to the widgetBox root element for a 'standard' widget -> &.className !
     */
    static readonly standard: string = "WidgetBox-standard";

    /**
     * Root Styles applied to the widgetBox root element for a 'embedded' widget (the widget is inside another widget)
     */
    static readonly embedded: string = "WidgetBox-embedded";

    /**
     * Root Styles applied to the widgetBox root element for a 'zoomed' widget
     */
    static readonly zoom: string = "WidgetBox-zoom";

    /**
     * Root Styles applied to the widgetBox root element for a 'no decoration' widget (template definition setting, no borders ...)
     */
    static readonly noDecoration: string = "WidgetBox-noDecoration";

    /**
     * Styles applied to the widgetBox container element
     */
    static readonly container: string = "WidgetBox-container";

    /**
     * Styles applied to the template JS content
     */
    static readonly templateJSContent: string = "WidgetBox-TemplateJS-content";

    /**
     * Styles applied to the template React content
     */
    static readonly templateReactContent: string = "WidgetBox-TemplateReact-content";

    /**
     * Styles applied to the widgetBox content element (the widget without header and user menu)
     */
    static readonly content: string = "WidgetBox-content";

    /**
     * Styles applied to child of content (above)
     */
    static readonly contentRoot: string = "WidgetBox-content-root";

    /**
     * Styles applied to the widgetBox user menu element (the icons for the user menu)
     */
    static readonly userMenu: string = "WidgetBox-userMenu";

    /**
     * Styles applied to the widgetBox header element
     */
    static readonly header: string = "WidgetBox-header";

    /**
     * Styles applied to the widgetBox header Title element
     */
    static readonly headerTitle: string = "WidgetBox-headerTitle";

    /**
     * Root Styles applied to the widgetBox root element when the box is with header
     */
    static readonly withHeader: string = "WidgetBox-withHeader";

    /**
     * Root Styles applied to the widgetBox root element when the box is without header
     */
    static readonly withoutHeader: string = "WidgetBox-withoutHeader";

    /**
     * Styles applied to the widgetBox user menu element when the userMenu is open
     */
    static readonly userMenuOpen: string = "WidgetBox-userMenuOpen";

    /**
     * Styles applied to the widgetBox user menu element when the userMenu id closed
     */
    static readonly userMenuClosed: string = "WidgetBox-userMenuClosed";
}

export declare type WidgetBoxClassKey = keyof WidgetBoxClasses;

export enum WidgetBoxTooltipType {
    dialog = "dialog",
    tooltip = "tooltip",
}

export enum WidgetBoxVisibilityType {
    default = "default",
    invisible = "invisible",
    invisibleInPrinting = "invisibleInPrinting",
}

export enum ResizingConstraintOptions {
    FixedWidthLeftAligned = "FixedWidthLeftAligned",
    FixedWidthRightAligned = "FixedWidthRightAligned"
}

/**
 * Support for repetition widget | pivot table expanding to make the whole content visible.
 */
export interface IWidgetBoxExpandOptions {

    active: boolean;

    keepBoxHeader: boolean;
    keepTableHeader: boolean;
}

export interface IWidgetRectangle {
    top: number;
    left: number;
    height: number;
    width: number;
}

/**
 * Widget Box Options (fields of the "Box" tab in the widget editor).
 *
 * @see https://github.com/ic3-software/ic3-demo-plugin-theme
 */
export interface WidgetBoxOptions {

    /**
     * Name of a variant. Note that a variant is possibly overriding defined options.
     */
    variant?: string;

    /**
     * Message that is displayed when the widget cannot render yet
     * (waiting for its initial result or mandatory event value).
     */
    waitingEventOrResult?: string;

    /**
     * Use the chart title to define the information displayed in the widget box header.
     */
    withHeader: boolean;

    visibility: WidgetBoxVisibilityType;

    /**
     * Behavior of the widget when the dashboard is being resized.
     */
    resizingConstraint?: ResizingConstraintOptions

    /**
     * The widget will (vertically) expand to fit its content.
     */
    autoExpandContent: IWidgetBoxExpandOptions;

    rectangle: IWidgetRectangle;

}
