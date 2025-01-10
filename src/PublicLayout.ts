import {PaperOrientation, PaperSizeUnits} from "./ITypes";
import {Property} from "csstype";
import {Breakpoint} from "@mui/material/styles";

type CSSProperties = any;

/**
 * <pre>
 *     unlimited: in height (page width is always known).
 * </pre>
 */
export type PageSize = "known" | "manual" | "unlimited";

export interface IPageSize {
    type: PageSize;
}

/**
 * From icCube server print component configuration.
 */
export interface IKnownPageSize extends IPageSize {
    name: string;
}

export interface IManualPageSize extends IPageSize {
    pageSizeUnits: PaperSizeUnits;
    pageWidth: number;
    pageHeight: number;
}

/**
 * Unlimited in height.
 */
export interface IUnlimitedPageSize extends IPageSize {
    pageSizeUnits: PaperSizeUnits;
    pageWidth: number;
}

export interface IPageMargin {
    sizeUnits: PaperSizeUnits;

    top: number;
    bottom: number;
    left: number;
    right: number;
}

/**
 * The background grid used for example to snap widgets to.
 * Not related to the grid layout itself.
 */
export interface IWidgetLayoutGridDefinition {

    snap: boolean;
    show: boolean;

    width: number;
    height: number;
}

export interface IResponsiveBreakpoint {
    md: number;
    xs: number;
}

export type ResponsiveValue = {
    [key in Breakpoint]: number
}

/**
 * Control how the layout is responding to width change.
 */
export interface IWidgetLayoutResponsivenessDefinition {

    /**
     * Grid only for now.
     */
    type: "grid";

    /**
     * The number of virtual columns the widgets are aligned to (e.g., 12).
     */
    columnCount: number;

    /**
     * The number of pixels of each virtual column.
     */
    columnWidth: number;

    /**
     * Setup once the layout configuration is being resolved against the theme.
     */
    themeSpacing: number;

    /**
     * The grid column span multiplier (i.e., x2 when the tables so widgets are twice as wide).
     */
    multiplier: ResponsiveValue;

    /**
     * The grid margins.
     */
    margin: ResponsiveValue;

    /**
     * Defines the horizontal space between the widgets.
     */
    columnSpacing?: ResponsiveValue;

    /**
     * Defines the vertical space between the widgets.
     */
    rowSpacing?: ResponsiveValue;

    print?: {
        multiplier: number;
        columnSpacing: number;
        rowSpacing: number;
    };

    printLandscape?: {
        multiplier: number;
        columnSpacing: number;
        rowSpacing: number;
    };

    /**
     * Defines a grid to snap the height of the widgets in group.
     *
     * When the group grid is defined as %, the grid percentages will be kept on group height resizing
     * (not the case if the grid is defined in pixels).
     *
     * <ul>
     *     <li> undefined   : no constraint.
     *     <li> array       : a list of percentages to snap the widgets (e.g., [0.1,.0.2,0.3....1.0] to have
     *                        a grid 10% of group height, 20%, etc...).
     *     <li> number < 1  : a percentage of the group height.
     *     <li> number >= 1 : grid in pixels
     * </ul>
     */
    groupSnapSteps: number[] | number;

}

/**
 * Experimental.
 */
export interface IWidgetLayoutCssGridDefinition {

    gridTemplateColumns: string;
    gridTemplateRows: string;

    gridTemplateAreas: string;

}

export interface IPageHeaderFooterLogoDefinition {

    // CSS: applied to the img element.

    style?: CSSProperties;

    // src of the img element.

    src: string;

}

export interface IPageHeaderFooterContentDefinition {

    /**
     * Used for formatting @dateTime variable
     */
    dateTimeFormat: string;

    /**
     * Used for formatting @date variable
     */
    dateFormat: string;

    /**
     * Used for formatting @time variable
     */
    timeFormat: string;

    text: string;

    // CSS: applied to the typography element.

    style?: CSSProperties;

    // configuring https://material-ui.com/api/typography/

    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    color?: string;
    variant?: string;

}

export interface IPageHeaderFooterPartDefinition {

    // CSS: applied to the div wrapping the content or logo element.

    style?: CSSProperties;

    /**
     * Available variables:
     *
     * <pre>
     *      @pageNb
     *      @pageCount
     *      @reportName
     *
     *      @dateTime
     *      @date
     *      @time
     * </pre>
     */
    content?: IPageHeaderFooterContentDefinition;
    logo?: IPageHeaderFooterLogoDefinition;

}

export interface IPageHeaderFooterDefinition {

    sizeUnits: PaperSizeUnits;
    height: number

    // CSS

    style?: CSSProperties;

    // using a flex display w/ center as flex=1

    left?: IPageHeaderFooterPartDefinition;
    center?: IPageHeaderFooterPartDefinition;
    right?: IPageHeaderFooterPartDefinition;

    printOnly?: true;

}

/**
 * E.g., size, orientation, ...
 */
export interface IWidgetLayoutDefinition {

    /**
     * icCube internal : used to create a missing layout when resolving
     * the layout definition id of the dashboard definition.
     */
    missing?: true;

    /**
     * icCube internal : used to create a missing layout when resolving
     * the layout definition id of the dashboard definition.
     */
    missingLayoutConfigId?: string;

    layoutConfigId: string;

    layoutGroup: string;

    layoutName: string;

    /**
     * CSS class of the layout.
     */
    cssClass?: string;

    /**
     * The theme is defining a scale (widgetContentPrintScale) applied to the widget content
     * when rendered for printing. The following flag is requesting to render the widget content
     * on screen using the printing scale.
     *
     * We advise defining it for any layout dedicated for printing (e.g., A4, Letter) to get a
     * visual rendering close to the printed one.
     */
    applyWidgetContentPrintScaleForRendering? : true,

    /**
     * Not relevant if responsiveness is being defined: always an unlimited portrait.
     */
    pageSize: IKnownPageSize | IManualPageSize | IUnlimitedPageSize;

    /**
     * Not relevant if responsiveness is being defined: always an unlimited portrait.
     */
    pageOrientation: PaperOrientation;

    /**
     * Not relevant if responsiveness is being defined: margins are defined per breakpoint.
     */
    pageMargin: IPageMargin;

    /**
     * Use the one defined from the theme (ic3 palette) when not defined here.
     */
    pageBackgroundColor?: Property.Color;

    /**
     * Widgets are zoomed so that their bounding box fits the horizontal page area.
     * Not relevant if responsiveness is being defined.
     */
    expandH?: boolean;

    /**
     * Control how this layout is responding to width change : check ic3-demo-plugin-them
     * (https://github.com/ic3-software/ic3-demo-plugin-theme) for a complete example.
     */
    responsiveness?: IWidgetLayoutResponsivenessDefinition;

    /**
     * Experimental.
     */
    cssGrid?: IWidgetLayoutCssGridDefinition;

    /**
     * The background grid used for example to snap widgets to.
     * Not related to the grid layout itself.
     */
    grid: IWidgetLayoutGridDefinition;

    header?: IPageHeaderFooterDefinition;
    footer?: IPageHeaderFooterDefinition;

}
