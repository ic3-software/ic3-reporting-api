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
     * Styles applied to the widgetBox content element (the widget without header and user menu)
     */
    static readonly content: string = "WidgetBox-content";

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
