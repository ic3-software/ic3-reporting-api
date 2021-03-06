import {ComponentsOverrides, ComponentsVariants} from "@mui/material";
import {IPublicWidgetTemplateDefinition} from "./PublicTemplate";
import {IWidgetLayoutDefinition} from "./PublicLayout";
import {IThemeWidgetDefaults} from "./IThemeManager";
import {AlertDialogClassKey} from "./theme/ThemeAlertDialog";
import {AppClassKey, AppDivProps} from "./theme/ThemeApp";
import {DrilldownUserSelectMenuClassKey} from "./theme/ThemeDrilldownUserSelectMenu";
import {ErrorRendererClassKey} from "./theme/ThemeErrorRenderer";
import {HtmlBoxClassKey, HtmlBoxProps} from "./theme/ThemeHtmlBox";
import {LayoutClassKey} from "./theme/ThemeLayout";
import {LayoutPageClassKey} from "./theme/ThemeLayoutPage";
import {ReportAppBarClassKey} from "./theme/ThemeReportAppBar";
import {WidgetBoxClassKey} from "./theme/ThemeWidgetBox";
import {WidgetBoxContentMessageClassKey} from "./theme/ThemeWidgetBoxContentMessage";
import {ReactElement} from "react";
import {TypographyStyleOptions} from "@mui/material/styles/createTypography";
import {Property} from "csstype";
import {FilterButtonsChartOptions, FilterButtonsClassKey} from "./theme/ThemeFilterButtons";
import {FilterSliderChartOptions, FilterSliderClassKey} from "./theme/ThemeFilterSlider";
import {GoogleMarkerVariantChartOptions} from "./theme/ThemeGoogleMarker";
import {IPublicContext} from "./PublicContext";
import {TableClassKey, TableProps} from "./theme/ThemeTable";
import {PivotTableClassKey, PivotTableProps} from "./theme/ThemePivotTable";
import {Components} from "@mui/material/styles/components";
import {FilterPanelClassesKey, FilterPanelProps} from "./theme/ThemeFilterPanel";
import {FilterCheckboxRadioChartOptions, FilterCheckboxRadioClassKey} from "./theme/ThemeFilterCheckboxRadio";
import {ReportAppLeftPanelClassKey} from "./theme/ThemeReportAppLeftPanel";
import {FilterTreeChartOptions, FilterTreeClassKey} from "./theme/ThemeFilterTree";
import {DatePickerChartOptions, DatePickerClassKey} from "./theme/ThemeDatePicker";
import {FilterAutocompleteChartOptions, FilterAutocompleteClassesKey} from "./theme/ThemeFilterAutocomplete";
import {AppMenuIconProps, ThemeAppMenuIconClassKey} from "./theme/ThemeAppMenuIcon";
import {QueryBuilderNodeProps, ThemeQueryBuilderNodeClassKey} from "./theme/ThemeQueryBuilderNode";
import {KpiCardClassKey, KpiCardProps} from "./theme/ThemeKpiCard";

export interface INoSchemaRendererOptions {

    missingSchema: string;

}

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
    /**
     * Amcharts date formatter.
     * Read more about the format codes here: https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/#Format_codes
     * Read more about how these settings are used here: https://www.amcharts.com/docs/v4/concepts/axes/date-axis/#Setting_date_formats
     */
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
     * The color for the page background (can be overridden at layout level).
     */
    pageBackgroundColor: Property.Color;

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
     * List of named colors for ic3 applications ( MDX IDE, Admin ... )
     */
    appColors?: { 'default'?: Property.Color } & Record<string, Property.Color>;

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

    pageBackgroundColor: Property.Color;

    selected?: Property.Color;
    selectedText?: Property.Color;
    selectedBackground?: Property.Color;
    selectedOpacity?: number;

    unSelectedOpacity?: number;

    hoverBackground?: Property.Color;

    chartPalettes?: { 'default': Property.Color[] } & Record<string, Property.Color[]>;
    chartSingleColors?: Partial<MandatorySingleColors> & Record<string, Property.Color>;

    reportAppMenu?: Property.Color;

    appColors?: { 'default'?: Property.Color } & Record<string, Property.Color>

    onHover?: (color: Property.Color) => Property.Color;

}


export interface ic3Typography {

    amCharts4: TypographyStyleOptions

}

export interface ic3TypographyOptions {

    /**
     * Typography for the amCharts plugin.
     */
    amCharts4?: TypographyStyleOptions

}

export enum TableRowHeightOptions {
    standard = "standard",
    compact = "compact",
}

export interface ic3Theme {

    id: string;
    caption: string;

    cssClass: string;

    loadFonts?: (continuation: () => void) => void;

    formatter: ThemeFormatters;

    /**
     * Icons used in tables and trees
     */
    icons: {
        none: (className: string) => ReactElement | string;
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
                 * tl ??? Top-left corner
                 * tr ??? Top-right corner
                 * bl ??? Bottom-left corner
                 * br ??? Bottom-right corner
                 */
                cornerRadius: [number, number, number, number];
                fill: string;  // Color of the icon
                stroke: string;  // Color of the stroke of the icon
                strokeWidth: number;  // Width of the stroke
                hoverColor: string;  // Color when hovering
                downColor: string;  // Color when mouse down on the button
            }
        },
    },

    /**
     * The first defined layout is used as the default one.
     */
    layouts: IWidgetLayoutDefinition[];

    /**
     * Default values (e.g., box options, chart options, etc..).
     */
    widgetDefaults?: IThemeWidgetDefaults;

    /**
     * Styling for the sparklines in the sparkline transformation and the KPI card
     */
    sparklineSettings: {
        /**
         * The width of the line in the sparkline
         */
        lineWidth: number;

        /**
         * The cursor when the user hovers over the sparkline
         */
        cursor: {
            color: Property.Color;

            /**
             * The radius of the dot when hovering
             */
            radius: number;

            /**
             * The width of the stroke when hovering
             */
            width: number;
        };
    }

    noSchemaRenderer?: (context: IPublicContext, options: INoSchemaRendererOptions) => ReactElement;

    /**
     * Theme settings for the editor (application & report).
     */
    editor: {
        /**
         * Editor logo. Defaults to icCubes logo.
         */
        logo: string;

        /**
         * Alt text for the logo image. Default = icCube.
         */
        logoAlt: string;

        /**
         * Top - Offset of dashboard page to the editor. Default 25.
         */
        viewPortOffsetTop: number;

        /**
         * Left - Offset of dashboard page to the editor. Default 25.
         */
        viewPortOffsetLeft: number;
    }

}

export interface ic3ThemeOptions {

    id: string;
    caption: string;

    cssClass?: string;

    loadFonts?: (continuation: () => void) => void;

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

    widgetBox?: {
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
    layouts?: IWidgetLayoutDefinition[];

    /**
     * Styling for the sparklines in the sparkline transformation and the KPI card
     */
    sparklineSettings?: {
        /**
         * The width of the line in the sparkline
         */
        lineWidth: number;

        /**
         * The cursor when the user hovers over the sparkline
         */
        cursor: {
            color: Property.Color;

            /**
             * The radius of the dot when hovering
             */
            radius: number;

            /**
             * The width of the stroke when hovering
             */
            width: number;
        };
    }

    noSchemaRenderer?: (context: IPublicContext, options: INoSchemaRendererOptions) => ReactElement;

    /**
     * Theme settings for the editor (application & report).
     */
    editor?: {
        /**
         * Editor logo. Defaults to icCubes logo.
         */
        logo?: string;

        /**
         * Alt text for the logo image. Default = icCube.
         */
        logoAlt?: string;

        /**
         * Top - Offset of dashboard page to the editor. Default 25.
         */
        viewPortOffsetTop?: number;

        /**
         * Left - Offset of dashboard page to the editor. Default 25.
         */
        viewPortOffsetLeft?: number;
    }
}


interface ic3BaseComponents {

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
    FilterCheckbox?: {
        styleOverrides?: ComponentsOverrides["FilterCheckbox"];
        variants?: ComponentsVariants["FilterCheckbox"];
    }
    FilterButtons?: {
        styleOverrides?: ComponentsOverrides["FilterButtons"];
        variants?: ComponentsVariants["FilterButtons"];
    }
    FilterPanel?: {
        variants?: ComponentsVariants['FilterPanel'];
        styleOverrides?: ComponentsOverrides["FilterPanel"];
    }
    FilterSlider?: {
        styleOverrides?: ComponentsOverrides["FilterSlider"];
        variants?: ComponentsVariants["FilterSlider"];
    }
    FilterTree?: {
        styleOverrides?: ComponentsOverrides["FilterTree"];
        variants?: ComponentsVariants["FilterTree"];
    }
    FilterDatePicker?: {
        styleOverrides?: ComponentsOverrides["FilterDatePicker"];
        variants?: ComponentsVariants["FilterDatePicker"];
    }
    FilterAutocomplete?: {
        styleOverrides?: ComponentsOverrides["FilterAutocomplete"];
        variants?: ComponentsVariants["FilterAutocomplete"];
    }
    GoogleMarker?: {
        variants?: ComponentsVariants['GoogleMarker'];
    }
    HtmlBox?: {
        styleOverrides?: ComponentsOverrides["HtmlBox"];
        variants?: ComponentsVariants["HtmlBox"];
    }
    KpiCard?: {
        styleOverrides?: ComponentsOverrides["KpiCard"];
        variants?: ComponentsVariants["KpiCard"];
    }
    Layout?: {
        styleOverrides?: ComponentsOverrides["Layout"];
    }
    LayoutPage?: {
        styleOverrides?: ComponentsOverrides["LayoutPage"];
    }
    PivotTable?: {
        variants?: ComponentsVariants['PivotTable'];
        styleOverrides?: ComponentsOverrides["PivotTable"];
    }
    ReportAppBar?: {
        styleOverrides?: ComponentsOverrides["ReportAppBar"];
    }
    ReportAppLeftPanel?: {
        styleOverrides?: ComponentsOverrides["ReportAppLeftPanel"];
    }
    Table?: {
        variants?: ComponentsVariants['Table'];
        styleOverrides?: ComponentsOverrides["Table"];
    }
    WidgetBox?: {
        variants?: ComponentsVariants['WidgetBox'];
        styleOverrides?: ComponentsOverrides["WidgetBox"];
    }
    WidgetBoxContentMessage?: {
        styleOverrides?: ComponentsOverrides["WidgetBoxContentMessage"];
    }
    AppMenuIcon?: {
        styleOverrides?: ComponentsOverrides["AppMenuIcon"];
    }
    QueryBuilderNode?: {
        styleOverrides?: ComponentsOverrides["QueryBuilderNode"]
    }
}

/**
 * For Typing purpose extending MUI Theme with ic3 components
 */
export interface ic3Components extends ic3BaseComponents, Components {

}


/**
 *
 * MUI Module augmentation
 *
 */

declare module "@mui/material/styles/createPalette" {

    interface Palette {

        ic3: ic3Palette;

        mdx: {
            annotation: string;
            comment: string;
            definitionKeyword: string;
            keyword: string;
            labelName: string;
            number: string;
            operator: string;
            propertyName: string;
            separator: string;
            string: string;
            variableName: string;
            dimension: string;
            hierarchy: string;
            level: string;
            member: string;
            measureGroup: string;
            measureFolder: string;
            measure: string;
            set: string;
            calcMeasure: string;
            event: string;
        }

    }

    interface PaletteOptions {

        ic3?: ic3PaletteOptions;

        mdx?: {
            annotation?: string;
            comment?: string;
            definitionKeyword?: string;
            keyword?: string;
            labelName?: string;
            number?: string;
            operator?: string;
            propertyName?: string;
            separator?: string;
            string?: string;
            variableName?: string;
            dimension?: string;
            hierarchy?: string;
            level?: string;
            member?: string;
            measureGroup?: string;
            measureFolder?: string;
            measure?: string;
            set?: string;
            calcMeasure?: string;
            event?: string;
        }

    }
}

declare module "@mui/material/styles/createTypography" {

    interface Typography {

        ic3: ic3Typography;

    }

    interface TypographyOptions {

        ic3?: ic3TypographyOptions;

    }

}

declare module '@mui/material/styles/createTheme' {

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
declare module '@mui/material/styles/components' {

    interface Components extends ic3BaseComponents {

    }

}

declare module '@mui/material/styles/overrides' {

    interface ComponentNameToClassKey {

        AlertDialog: AlertDialogClassKey;
        App: AppClassKey;

        DrilldownUserSelectMenu: DrilldownUserSelectMenuClassKey;

        ErrorRenderer: ErrorRendererClassKey;

        FilterCheckbox: FilterCheckboxRadioClassKey;
        FilterButtons: FilterButtonsClassKey;
        FilterPanel: FilterPanelClassesKey;
        FilterSlider: FilterSliderClassKey;
        FilterTree: FilterTreeClassKey;
        FilterDatePicker: DatePickerClassKey;
        FilterAutocomplete: FilterAutocompleteClassesKey;

        HtmlBox: HtmlBoxClassKey;
        KpiCard: KpiCardClassKey;
        Layout: LayoutClassKey;

        LayoutPage: LayoutPageClassKey;

        PivotTable: PivotTableClassKey;
        Table: TableClassKey;

        ReportAppBar: ReportAppBarClassKey;

        WidgetBox: WidgetBoxClassKey;
        WidgetBoxContentMessage: WidgetBoxContentMessageClassKey;

        ReportAppLeftPanel: ReportAppLeftPanelClassKey;

        AppMenuIcon: ThemeAppMenuIconClassKey;

        QueryBuilderNode: ThemeQueryBuilderNodeClassKey;

    }

}

declare module '@mui/material/styles/props' {

    interface ComponentsPropsList {

        FilterCheckbox: FilterCheckboxRadioChartOptions;
        FilterButtons: FilterButtonsChartOptions;
        FilterPanel: FilterPanelProps;
        FilterSlider: FilterSliderChartOptions;
        FilterTree: FilterTreeChartOptions;
        FilterDatePicker: DatePickerChartOptions;
        FilterAutocomplete: FilterAutocompleteChartOptions;

        HtmlBox: HtmlBoxProps;
        KpiCard: KpiCardProps;

        PivotTable: PivotTableProps;
        Table: TableProps;

        WidgetBox: Record<never, any>;

        GoogleMarker: GoogleMarkerVariantChartOptions;

        AppMenuIconStyled: AppMenuIconProps;

        App: AppDivProps;

        QueryBuilderNode: QueryBuilderNodeProps;
    }

}
