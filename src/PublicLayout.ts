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

export interface IWidgetLayoutGridDefinition {

    snap: boolean;
    show: boolean;

    width: number;
    height: number;
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

    pageSize: IKnownPageSize | IManualPageSize | IUnlimitedPageSize;
    pageOrientation: PaperOrientation;

    pageMargin: IPageMargin;

    /**
     * Use the one defined from the theme (ic3 palette) when not defined here.
     */
    pageBackgroundColor?: Property.Color;

    /**
     * Widgets are zoomed so that their bounding box fits the horizontal page area.
     */
    expandH?: boolean;

    grid: IWidgetLayoutGridDefinition;

    header?: IPageHeaderFooterDefinition;
    footer?: IPageHeaderFooterDefinition;

}
