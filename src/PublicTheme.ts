import {ComponentsOverrides, ComponentsVariants} from "@material-ui/core";
import {IPublicWidgetTemplateDefinition} from "./PublicTemplate";
import {IWidgetLayoutDefinition} from "./PublicLayout";
import {IThemeWidgetDefaults} from "./IThemeManager";
import {AlertDialogClassKey} from "./theme/ThemeAlertDialog";
import {AppClassKey} from "./theme/ThemeApp";
import {DrilldownUserSelectMenuClassKey} from "./theme/ThemeDrilldownUserSelectMenu";
import {ErrorRendererClassKey} from "./theme/ThemeErrorRenderer";
import {HtmlBoxClassKey, HtmlBoxProps} from "./theme/ThemeHtmlBox";
import {LayoutClassKey} from "./theme/ThemeLayout";
import {LayoutPageClassKey} from "./theme/ThemeLayoutPage";
import {ReportAppBarClassKey} from "./theme/ThemeReportAppBar";
import {ReportAppMenuClassKey} from "./theme/ThemeReportAppMenu";
import {WidgetBoxClassKey} from "./theme/ThemeWidgetBox";
import {WidgetBoxContentMessageClassKey} from "./theme/ThemeWidgetBoxContentMessage";
import {ReactElement} from "react";
import {TypographyStyleOptions} from "@material-ui/core/styles/createTypography";
import {Property} from "csstype";
import {FilterButtonsClassKey, FilterButtonsProps} from "./theme/ThemeFilterButtons";
import {FilterSliderClassKey, FilterSliderProps} from "./theme/ThemeFilterSlider";
import {GoogleMapMarkerProps} from "./theme/ThemeGoogleMapMarker";

export type ThemeTextFormatter = {
    formatReport: ((value: any, locale: string) => string) | string;
    formatExcel?: string;
};

export type ThemeTextFormatters = Record<string, ThemeTextFormatter> & {

    defaultDate: ThemeTextFormatter;
    defaultNumber: ThemeTextFormatter;
    defaultAmount: ThemeTextFormatter;
    defaultPercentage: ThemeTextFormatter;

};

export type ThemeFormatters = {

    text: ThemeTextFormatters,

    emptyCell: string;

    amCharts4: Amcharts4ThemeDateFormatter;

}

export type ThemeTextFormattersOptions = Record<string, ThemeTextFormatter> & {

    defaultDate?: ThemeTextFormatter;
    defaultNumber?: ThemeTextFormatter;
    defaultAmount?: ThemeTextFormatter;
    defaultPercentage?: ThemeTextFormatter;

};

type Amcharts4ThemeDateFormatter = {
    dateFormatter: {
        millisecond: {
            dateFormat: string;
            periodChangeFormat: string;
        },
        second: {
            dateFormat: string;
            periodChangeFormat: string;
        },
        minute: {
            dateFormat: string;
            periodChangeFormat: string;
        },
        hour: {
            dateFormat: string;
            periodChangeFormat: string;
        },
        day: {
            dateFormat: string;
            periodChangeFormat: string;
        },
        week: {
            dateFormat: string;
            periodChangeFormat: string;
        },
        month: {
            dateFormat: string;
            periodChangeFormat: string;
        },
        year: {
            dateFormat: string;
            periodChangeFormat: string;
        },
    }
}

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
}

type Amcharts4ThemeDateFormatterOptions = DeepPartial<Amcharts4ThemeDateFormatter>;

export type ThemeFormattersOptions = {

    text?: ThemeTextFormattersOptions,

    emptyCell?: string;

    amCharts4?: Amcharts4ThemeDateFormatterOptions;

}

export interface ic3Palette {

    /**
     * The color for a selected item
     */
    selected: Property.Color;
    /**
     * The text color for a selected item
     */
    selectedText: Property.Color;
    /**
     * The text background color for a selected item
     */
    selectedBackground: Property.Color;

    selectedOpacity: number;

    unSelectedOpacity: number;

    hoverBackground: Property.Color;

    /**
     * List of named color palettes available on chart options
     */
    chartPalettes: { 'default': Property.Color[] } & Record<string, Property.Color[]>;

    /**
     * List of named single colors available on chart options
     */
    chartSingleColors: MandatorySingleColors & Record<string, Property.Color>;

    /**
     * Report Application Menu
     */
    reportAppMenu: string;

    /**
     * Darkens a color for an onhover effect
     *
     * If null or undefined, returns onHover color
     */
    onHover: (color?: Property.Color | undefined | null) => Property.Color;
}

interface MandatorySingleColors {

    /**
     * if not defined, primary color of MUI theme
     */
    default: Property.Color;
    /**
     * if not defined, secondary color of MUI theme
     */
    secondary: Property.Color;
    /**
     * if not defined, selection color of ic3.palette theme
     */
    selected: Property.Color;
    /**
     * if not defined, text.disabled MUI theme
     */
    disabled: Property.Color;
    /**
     * if not defined, success MUI theme
     */
    success: Property.Color;
    /**
     * if not defined, error MUI theme
     */
    error: Property.Color;
    /**
     * if not defined, warning MUI theme
     */
    warning: Property.Color;
    /**
     * if not defined, text.primary MUI theme
     */
    text: Property.Color;
    /**
     * if not defined, grey100 MUI theme
     */
    white: Property.Color;
    /**
     * if not defined, grey100 MUI theme
     */
    grey100: Property.Color;
    /**
     * if not defined, grey200 MUI theme
     */
    grey200: Property.Color;
    /**
     * if not defined, grey400 MUI theme
     */
    grey400: Property.Color;
    /**
     * if not defined, grey700 MUI theme
     */
    grey700: Property.Color;
    /**
     * if not defined, grey900 MUI theme  (kind of a less agressive black)
     */
    grey900: Property.Color;

}

export interface ic3PaletteOptions {

    selected?: Property.Color;
    selectedText?: Property.Color;
    selectedBackground?: Property.Color;
    selectedOpacity?: number;

    unSelectedOpacity?: number;

    hoverBackground?: Property.Color;

    chartPalettes?: { 'default': Property.Color[] } & Record<string, Property.Color[]>;
    chartSingleColors?: Partial<MandatorySingleColors> & Record<string, Property.Color>;

    /**
     * Report Application Menu
     */
    reportAppMenu?: Property.Color;

    onHover?: (color: Property.Color) => Property.Color;

}

declare module "@material-ui/core/styles/createPalette" {

    interface Palette {

        ic3: ic3Palette;

    }

    interface PaletteOptions {

        ic3?: ic3PaletteOptions;

    }
}

export interface ic3Typography {

    amCharts4: TypographyStyleOptions

}

export interface ic3TypographyOptions {

    amCharts4?: TypographyStyleOptions

}

declare module "@material-ui/core/styles/createTypography" {

    interface Typography {

        ic3: ic3Typography;

    }

    interface TypographyOptions {

        ic3?: ic3TypographyOptions;

    }

}

export enum TableRowHeightOptions {
    standard = 'standard',
    compact = 'compact',
}

export interface ic3Theme {

    id: string;
    caption: string;

    cssClass: string;

    formatter: ThemeFormatters;

    /**
     * Icons used in tables and trees
     */
    icons: {
        // tree icons
        expanded: (className: string) => ReactElement | string;
        collapse: (className: string) => ReactElement | string;
        loading: (className: string) => ReactElement | string;
        // sorting icons
        sort: (className: string) => ReactElement | string;
        sortAsc: (className: string) => ReactElement | string;
        sortDesc: (className: string) => ReactElement | string;
    };

    table: Record<TableRowHeightOptions, { rowHeight: number; headerRowHeight: number }>;

    googleMap: {
        options?: google.maps.MapOptions;
        markerClustererOptions?: MarkerClustererOptions;
    }

    userMenu: {
        disableUserMenuEdition: boolean;
        userMenuFilter?: (options: string[], templateDef?: IPublicWidgetTemplateDefinition<any>) => string[];
    }

    widgetBox: {
        contentOffset: {
            top: number;
            left: number;
        };
    };

    amCharts4: {
        icons: {
            zoomOutButton?: {
                /**
                 * The radius of the corners
                 * tl – Top-left corner
                 * tr – Top-right corner
                 * bl – Bottom-left corner
                 * br – Bottom-right corner
                 */
                cornerRadius: [number, number, number, number];
                fill: string;  // Color of the icon
                stroke: string;  // Color of the stroke of the icon
                strokeWidth: number;  // Width of the stroke
                hoverColor: string;  // Color when hovering
                downColor: string;  // Color when mouse down on the button
            }
        }

    },

    /**
     * The first defined layout is used as the default one.
     */
    layouts: IWidgetLayoutDefinition[];

    /**
     * Default values (e.g., box options, chart options, etc..).
     */
    widgetDefaults?: IThemeWidgetDefaults;

}

export interface ic3ThemeOptions {

    id: string;
    caption: string;

    cssClass?: string;

    formatter?: ThemeFormattersOptions;

    icons?: {
        // tree items
        expanded?: (className: string) => ReactElement | string;
        collapse?: (className: string) => ReactElement | string;
        loading?: (className: string) => ReactElement | string;
        // sorting icons
        sort?: (className: string) => ReactElement | string;
        sortAsc?: (className: string) => ReactElement | string;
        sortDesc?: (className: string) => ReactElement | string;
    }

    table?: Record<TableRowHeightOptions, Partial<{
        rowHeight: number;
        headerRowHeight: number,
    }>>;

    googleMap?: {
        options?: google.maps.MapOptions;
    }

    userMenu?: {
        disableUserMenuEdition?: boolean;
        userMenuFilter?: (options: string[], templateDef?: IPublicWidgetTemplateDefinition<any>) => string[];
    }

    widgetBox: {
        contentOffset: {
            top: number;
            left: number;
        };
    };

    /**
     * Default values (e.g., box options, chart options, etc..).
     */
    widgetDefaults?: IThemeWidgetDefaults;


    /**
     * The first defined layout is used as the default one.
     */
    layouts: IWidgetLayoutDefinition[];

}

declare module '@material-ui/core/styles/createTheme' {

    interface Theme {

        ic3: ic3Theme;

    }

    /**
     * Input of createMuiTheme( {...} )
     */
    interface ThemeOptions {

        ic3: ic3ThemeOptions;

    }

}

/**
 * All Components using Material-UI like variants (using styled)
 */
declare module '@material-ui/core/styles/components' {

    interface Components {
        AlertDialog?: {
            styleOverrides?: ComponentsOverrides["AlertDialog"];
        }
        App?: {
            styleOverrides?: ComponentsOverrides["App"];
        }
        DrilldownUserSelectMenu?: {
            styleOverrides?: ComponentsOverrides["DrilldownUserSelectMenu"];
        }
        ErrorRenderer?: {
            styleOverrides?: ComponentsOverrides["ErrorRenderer"];
        }
        HtmlBox?: {
            styleOverrides?: ComponentsOverrides["HtmlBox"];
            variants?: ComponentsVariants["HtmlBox"];
        }
        // FilterCheckbox: {
        //     styleOverrides?: ComponentsOverrides["FilterCheckbox"];
        //     variants?: ComponentsVariants["FilterCheckbox"];
        // }
        FilterButtons?: {
            styleOverrides?: ComponentsOverrides["FilterButtons"];
            variants?: ComponentsVariants["FilterButtons"];
        }
        FilterSlider?: {
            styleOverrides?: ComponentsOverrides["FilterSlider"];
            variants?: ComponentsVariants["FilterSlider"];
        }
        Layout?: {
            styleOverrides?: ComponentsOverrides["Layout"];
        }
        LayoutPage?: {
            styleOverrides?: ComponentsOverrides["LayoutPage"];
        }
        ReportAppBar?: {
            styleOverrides?: ComponentsOverrides["ReportAppBar"];
        }
        ReportAppMenu?: {
            styleOverrides?: ComponentsOverrides["ReportAppMenu"];
        }
        WidgetBox?: {
            variants?: ComponentsVariants['WidgetBox'];
            styleOverrides?: ComponentsOverrides["WidgetBox"];
        }
        WidgetBoxContentMessage?: {
            styleOverrides?: ComponentsOverrides["WidgetBoxContentMessage"];
        }
        GoogleMapMarker?: {
            variants?: ComponentsVariants['GoogleMapMarker'];
        }
    }

}

declare module '@material-ui/core/styles/overrides' {

    interface ComponentNameToClassKey {

        AlertDialog: AlertDialogClassKey;
        App: AppClassKey;

        DrilldownUserSelectMenu: DrilldownUserSelectMenuClassKey;

        ErrorRenderer: ErrorRendererClassKey;

        // FilterCheckbox: FilterCheckboxClassKey;
        FilterButtons: FilterButtonsClassKey;
        FilterSlider: FilterSliderClassKey;

        HtmlBox: HtmlBoxClassKey;

        Layout: LayoutClassKey;
        LayoutPage: LayoutPageClassKey;

        ReportAppBar: ReportAppBarClassKey;
        ReportAppMenu: ReportAppMenuClassKey;

        WidgetBox: WidgetBoxClassKey;
        WidgetBoxContentMessage: WidgetBoxContentMessageClassKey;

    }

}

declare module '@material-ui/core/styles/props' {

    interface ComponentsPropsList {

        HtmlBox: HtmlBoxProps;

        WidgetBox: Record<never, any>;

        FilterButtons: FilterButtonsProps;

        FilterSlider: FilterSliderProps;

        GoogleMapMarker: GoogleMapMarkerProps;

    }

}
