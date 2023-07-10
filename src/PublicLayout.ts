import {PaperOrientation, PaperSizeUnits} from "./ITypes";
import {Property} from "csstype";

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
     * The grid margins.
     */
    margin: number;

    /**
     * Define the horizontal space between the widgets.
     */
    columnSpacing?: number;

    /**
     * Define the vertical space between the widgets.
     */
    rowSpacing?: number;

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

}

/**
 * E.g., size, orientation, ...
 */
export interface IWidgetLayoutDefinition {

    layoutConfigId: string;

    cssClass?: string;

    /**
     * Not relevant if responsiveness is being defined: always an unlimited portrait.
     */
    pageSize: IKnownPageSize | IManualPageSize | IUnlimitedPageSize;
    pageOrientation: PaperOrientation;

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
     * Control how this layout is responding to width change.
     */
    responsiveness?: IWidgetLayoutResponsivenessDefinition;

    /**
     * The background grid used for example to snap widgets to.
     * Not related to the grid layout itself.
     */
    grid: IWidgetLayoutGridDefinition;

    header?: IPageHeaderFooterDefinition;
    footer?: IPageHeaderFooterDefinition;

}
