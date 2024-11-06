import {ComponentsOverrides, ComponentsVariants, Interpolation, Theme} from "@mui/material";
import {IPublicWidgetTemplateDefinition} from "./PublicTemplate";
import {IWidgetLayoutDefinition} from "./PublicLayout";
import {IThemeWidgetDefaults} from "./IThemeManager";
import {AlertDialogClassKey} from "./theme/ThemeAlertDialog";
import {AppClassKey, AppDivProps} from "./theme/ThemeApp";
import {ErrorRendererClassKey} from "./theme/ThemeErrorRenderer";
import {HtmlBoxClassKey, StyledHtmlBoxProps} from "./theme/ThemeHtmlBox";
import {LayoutClassKey} from "./theme/ThemeLayout";
import {LayoutPageClassKey} from "./theme/ThemeLayoutPage";
import {ReportAppBarClassKey} from "./theme/ThemeReportAppBar";
import {WidgetBoxClassKey, WidgetBoxDivProps} from "./theme/ThemeWidgetBox";
import {WidgetBoxContentMessageClassKey} from "./theme/ThemeWidgetBoxContentMessage";
import * as React from "react";
import {ReactElement} from "react";
import {TypographyStyleOptions} from "@mui/material/styles/createTypography";
import {Property} from "csstype";
import {FilterButtonsClassKey, FilterButtonsProps} from "./theme/ThemeFilterButtons";
import {FilterSliderClassKey, FilterSliderProps} from "./theme/ThemeFilterSlider";
import {GoogleMarkerVariantChartOptions} from "./theme/ThemeGoogleMarker";
import {IPublicContext} from "./PublicContext";
import {TableClassKey, TableProps} from "./theme/ThemeTable";
import {PivotTableClassKey, PivotTableProps} from "./theme/ThemePivotTable";
import {Components} from "@mui/material/styles/components";
import {FilterPanelClassesKey, FilterPanelProps} from "./theme/ThemeFilterPanel";
import {FilterCheckboxProps, FilterCheckboxRadioClassKey} from "./theme/ThemeFilterCheckboxRadio";
import {ReportAppLeftPanelClassKey} from "./theme/ThemeReportAppLeftPanel";
import {
    FilterTreeClassKey,
    FilterTreePopOverClassKey,
    FilterTreePopOverProps,
    FilterTreeProps
} from "./theme/ThemeFilterTree";
import {
    DatePickerClassKey,
    DatePickerShortcut,
    DateRangePickerShortcut,
    FilterDatePickerProps
} from "./theme/ThemeDatePicker";
import {FilterAutocompleteClassesKey, FilterAutocompleteProps} from "./theme/ThemeFilterAutocomplete";
import {AppMenuIconClassKey, AppMenuIconProps} from "./theme/ThemeAppMenuIcon";
import {QueryBuilderNodeClassKey, QueryBuilderNodeProps} from "./theme/ThemeQueryBuilderNode";
import {KpiCardClassKey, KpiCardProps} from "./theme/ThemeKpiCard";
import {ListCounterClassKey, ListCounterProps} from "./theme/ThemeListCounter";
import {LazyTreeClassesClassKey, LazyTreeProps} from "./theme/ThemeLazyTreeClasses";
import {PrintButtonClassKey, StyledPrintButtonDivProps} from "./theme/ThemePrintButton";
import {CodeMirrorClassesKey} from "./theme/ThemeCodeMirror";
import {WidgetTemplateChartOptions} from "./PublicTemplates";
import {WidgetFilteredByClassesKey} from "./theme/ThemeWidgetFilteredBy";
import {IUserMenuOptions, IWidgetBoxIconsDefinition} from "./ITypes";
import {Ic3TableCellProps, ThemeIc3TableCellClassesKey} from "./theme/ThemeIc3TableCell";
import {RegexFilterClassesKey, RegexFilterProps} from "./theme/ThemeRegexFilter";
import {AIWidgetChatBotClassKey, AIWidgetChatBotStyleProps} from "./theme/ThemeAIWidgetChatBot";
import {FilterPanelViewsMenuClassesKey} from "./theme/ThemeFilterPanelViewsMenu";
import {Ic3TableCellDrilldownProps, ThemeIc3TableCellDrilldownClassesKey} from "./theme/ThemeIc3TableCellDrilldown";
import {FilterSwitchClassKey, FilterSwitchProps} from "./theme/ThemeFilterSwitch";

export type Ic3ChartVariants = {
    [Name in keyof WidgetTemplateChartOptions]?: Array<{
        props: { variant: string };
        /**
         * Default props define the default options for the widget.
         */
        defaultProps: Partial<WidgetTemplateChartOptions[Name]>;
    }>;
};

export type Ic3WidgetComponentVariants = Array<{
    props: { variant: string };
    style: Interpolation<{ theme: Theme }>;
}>;

export interface INoSchemaRendererOptions {

    missingSchema: string;

}

export type ThemeTextFormatter = {
    /**
     * Format used in the reporting application.
     */
    formatReport: ((value: any, locale: string) => string) | string;

    /**
     * Format used when exporting to Excel.
     */
    formatExcel?: string;
};

export type ThemeTextFormatters = Record<string, ThemeTextFormatter> & {

    /**
     * The default formatter for displaying date values.
     * Also used in the expressions when using $value.formatDate()$.
     *
     * Default: {
     *     formatReport: "yyyy-MM-dd"
     * }
     */
    defaultDate: ThemeTextFormatter;

    /**
     * The default formatter for displaying datetime values.
     * Also used in the expressions when using $value.formatDate()$.
     *
     * Default: {
     *     formatReport: "yyyy-MM-dd HH:mm:ss"
     * }
     */
    defaultDatetime: ThemeTextFormatter;

    /**
     * The default way to format any number that has no format defined.
     * Used in the expressions when using $value.formatNumber()$.
     *
     * Default: {
     *     formatReport: "#,###.####"
     * }
     */
    defaultNumber: ThemeTextFormatter;

    /**
     * Used in the expressions when using $value.formatAmount()$.
     *
     * Default: {
     *     formatReport: "#,###"
     * }
     */
    defaultAmount: ThemeTextFormatter;

    /**
     * Default formatter for percentage values.
     * Used in the expressions when using $value.formatPercentage()$.
     *
     * Default: {
     *     formatReport: "##.0%"
     * }
     */
    defaultPercentage: ThemeTextFormatter;

};

export interface ThemeFormatterPerLocale {
    /**
     * Fallback formatter for when no language is specified or a language is specified that is not defined in this
     * model.
     */
    default: ThemeFormatters;

    /**
     * A formatter per locale. Use JAVA locale tags for defining a formatter for that locale, e.g., en, en_US, nl, nl_NL, etc..
     * Longer tags have prio over shorter tags. For example, if the user has locale en_US, the dashboards first use
     * the en_US tag. If it isn't found, it will use the en tag. If that also isn't found, it will use the default.
     */
    [k: string]: ThemeFormatters;
}

export function isThemeFormatterPerLocale(x: DeepPartial<ThemeFormatterPerLocale | ThemeFormatters> | undefined): x is ThemeFormatterPerLocale {
    return x?.['default'] != null;
}


export type ThemeFormatters = {

    text: ThemeTextFormatters,

    amCharts4: Amcharts4ThemeDateFormatter;

    /**
     * When using #a in a formatter, large values get divided and a letter gets added. Here, you can specify the number
     * to divide by and which letter to add. E.g., 1.000 and 'k' divides numbers between 1.000 and 1.000.000 by a
     * thousand and adds an 'k'.
     */
    bigNumberPrefixes?: {
        number: number;
        suffix: string;
    }[];

    /**
     * When using #a in a formatter, small values get multiplied and a letter gets added. Here, you can specify the
     * multiplier and the letter. For example, { "number": 1e-6, "suffix": "μ" }, multiplies numbers between 1e-6 and
     * 1e-9 by 1e6 and adds the letter μ.
     */
    smallNumberPrefixes?: {
        number: number;
        suffix: string;
    }[];

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
     * For charts, you can define a function that derives the selected color from the color of the clicked item without
     * selection. For example, you can use darken(color) from Mui-Material to get a darker color.
     * @param color the color of the item without selection.
     * @Return the color for the item in the selected state.
     */
    selectedChart?: (color: Property.Color | undefined | null) => Property.Color;

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
        hierarchyFolder: string;
    }
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

    /**
     * For charts, you can define a function that derives the selected color from the color of the clicked item without
     * selection. For example, you can use darken(color) from Mui-Material to get a darker color.
     * @param color the color of the item without selection.
     * @Return the color for the item in the selected state.
     */
    selectedChart?: (color: Property.Color | undefined | null) => Property.Color;

    unSelectedOpacity?: number;

    hoverBackground?: Property.Color;

    chartPalettes?: { 'default': Property.Color[] } & Record<string, Property.Color[]>;
    chartSingleColors?: Partial<MandatorySingleColors> & Record<string, Property.Color>;

    reportAppMenu?: Property.Color;

    appColors?: { 'default'?: Property.Color } & Record<string, Property.Color>

    onHover?: (color: Property.Color) => Property.Color;

    mdx?: Partial<ic3Palette['mdx']>;

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
    small = "small"
}

export interface ic3Theme {

    id: string;
    caption: string;

    cssClass: string;

    waitForFonts?: () => Promise<any>;

    formatter: ThemeFormatterPerLocale
        /* for backwards compatibility */
        | ThemeFormatters;

    /**
     * Icons used in tables and trees
     */
    icons: {
        none: (className: string) => ReactElement | string;

        // MDX tree icons
        expanded: (className: string) => ReactElement | string;
        collapse: (className: string) => ReactElement | string;
        loading: (className: string) => ReactElement | string;

        // sorting icons
        sort: (className: string) => ReactElement | string;
        sortAsc: (className: string) => ReactElement | string;
        sortDesc: (className: string) => ReactElement | string;

        // Datepicker calender icons
        datePickerIcon?: React.ElementType;

        // Widget header icons
        menuIcon: JSX.Element;
        statusWaiting: JSX.Element;
        statusWaitingResult: JSX.Element;
        statusRendering: JSX.Element;
        statusDone: JSX.Element;
        queryError: JSX.Element;
        queryWarning: JSX.Element;
        helpIcon: JSX.Element;
        closeQueryIcon: JSX.Element;  // Icon for user to close the query (if it's running long)
        interactionModeSelection: JSX.Element;
        interactionModeDrilldown: JSX.Element;
        widgetFilterActive: React.ReactNode | undefined;  // Shown in widget header when the widget is filtered.

        // Autocomplete / dropdown filter
        autocompleteClearIcon: JSX.Element | undefined;
        autocompletePopupIcon: JSX.Element | undefined;

        // Tree
        nodeOpened: JSX.Element;
        nodeClosed: JSX.Element;

        // Radio / check boxes
        checkBoxUnselected: React.ReactNode | undefined;
        checkBoxSelected: React.ReactNode | undefined;
        checkIndeterminate: React.ReactNode | undefined;
        radioUnselected: React.ReactNode | undefined;
        radioSelected: React.ReactNode | undefined;
        hasDescendantsIndicatorIcon: React.ReactNode | undefined;

    };

    palette: {
        darken: (color: string, factor: number) => string;
        lighten: (color: string, factor: number) => string;
    }

    table: Record<TableRowHeightOptions, { rowHeight: number; headerRowHeight: number }>;

    treeFilter: {
        itemHeight: number;
    }

    googleMap: {
        options?: google.maps.MapOptions;
        markerClustererOptions?: MarkerClustererOptions;
    }

    drilldown?: {
        /* disables drilldown path in the header and hides the option (if true, like older versions)*/
        disableDrilldownInTitle?: boolean;
    },

    userMenu: {
        disableUserMenuEdition: boolean;
        userMenuFilter?: (options: IUserMenuOptions[], templateDef?: IPublicWidgetTemplateDefinition<any>) => IUserMenuOptions[];
    }

    widgetIcons?: IWidgetIcons;

    widgetBox: {

        extraHeight?: number;

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
        },
    },

    /**
     * A zoom applied to the widget content when rendered for printing.
     * Defaulted to 0.64.
     */
    widgetContentPrintScale?: number;

    /**
     * The first defined layout is used as the default one.
     */
    layouts: IWidgetLayoutDefinition[];

    /**
     * Default values (e.g., box options, chart options, etc...).
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
             * the width as percentage of the viewport of the cursor line when hovering
             */
            lineWidth: number;

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
    },

    /**
     * Options for date/range pickers. Filter panel / date picker filter.
     */
    datePicker: {
        shortcuts: Record<'default', {
            datePickerShortcuts: DatePickerShortcut[],
            rangePickerShortcuts: DateRangePickerShortcut[]
        }> & Record<string, {
            datePickerShortcuts: DatePickerShortcut[],
            rangePickerShortcuts: DateRangePickerShortcut[]
        }>
    }

    /**
     * Options for saving the state of all dashboard filters into local storage.
     */
    filterState?: {

        /**
         * Set to true to disable auto save for all dashboards/apps and make the option inactive.
         */
        disableFilterStateOption?: boolean;

        /**
         * The default value for auto-saving filter setting in the dashboards.
         */
        autosaveFilterStateToSessionStorage?: boolean;

        /**
         * The default value for auto-saving filter setting in the application filter panel.
         */
        autosaveReportAppFilterStateToSessionStorage?: boolean;

    }
}

export interface ic3ThemeOptions {

    /**
     * For editor theme, the id to use in your app-local/ic3report-config.js:
     *
     * <pre>
     *     options.defaultEditorThemeId = ...
     * </pre>
     */
    id: string;

    caption: string;

    cssClass?: string;

    /**
     * The recommended setup is to use document.fonts.ready here and put document.fonts.load(...) for all your added
     * fonts in the theme definition .ts file.
     */
    waitForFonts?: () => Promise<any>;

    formatter?: DeepPartial<ThemeFormatterPerLocale | ThemeFormatters>;

    icons?: Partial<ic3Theme['icons']>;

    table?: Record<TableRowHeightOptions, Partial<{
        rowHeight: number;
        headerRowHeight: number,
    }>>;

    treeFilter?: {
        /**
         * Define the height for an item in the tree. This cannot be done using css, because the tree is virtualized and
         * requires a fixed height setting.
         */
        itemHeight?: number;
    }

    googleMap?: {
        options?: google.maps.MapOptions;
    }

    /**
     * Change the settings for the user menu for some or all widgets.
     */
    userMenu?: {
        /**
         * Set to true to make the user menu option readonly (non-editable) for all widgets.
         */
        disableUserMenuEdition?: boolean;
        /**
         * Filter the items in the user menu. Return an empty array to disable and not show the user menu.
         */
        userMenuFilter?: (options: IUserMenuOptions[], templateDef?: IPublicWidgetTemplateDefinition<any>) => IUserMenuOptions[];
    }

    /**
     * Controls the icons to show for all widgets. To hide icons for a single widget, see `widgetDefaults`.
     * @see {ic3ThemeOptions.widgetDefaults}.
     */
    widgetIcons?: IWidgetIcons;

    widgetBox?: {

        /**
         * Used when computing the height of the widget when (vertical) auto-expand is being applied.
         * E.g., margins, paddings, ...
         */
        extraHeight?: number;

        contentOffset: {
            /**
             * Corresponds to the actual height as defined for WidgetBoxClasses.header.
             */
            top: number;
            left: number;
        };
    };

    /**
     * Default values (e.g., box options, chart options, etc...).
     */
    widgetDefaults?: IThemeWidgetDefaults;

    /**
     * Settings for the filter state.
     */
    filterState?: Partial<ic3Theme['filterState']>;

    /**
     * A scale applied to the widget content when rendered for printing.
     * Defaulted to 0.64.
     */
    widgetContentPrintScale?: number;

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
         * Editor logo.
         *
         * Default: icCube logo.
         */
        logo?: string;

        /**
         * Alt text for the logo image.
         *
         * Default: "icCube".
         */
        logoAlt?: string;

        /**
         * Top offset of the edited dashboard page in the editor.
         *
         * Default: 25.
         */
        viewPortOffsetTop?: number;

        /**
         * Left offset of the edited dashboard page in the editor.
         *
         * Default: 25.
         */
        viewPortOffsetLeft?: number;
    },

    amCharts4?: {
        icons?: {
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
        },
    },

    datePicker?: DeepPartial<ic3Theme['datePicker']>;

}

interface IWidgetIcons extends IWidgetBoxIconsDefinition {
    /**
     * Set to true to make the widget icon options readonly (non-editable) for all widgets. Also, this enforces to
     * always use the default values set in the theme.
     * @see {ic3ThemeOptions.widgetIcons}
     * @see {ic3ThemeOptions.widgetDefaults}
     */
    disableWidgetIconsEdition?: boolean;
}


interface ic3BaseComponents {

    AIWidgetChatBot?: {
        styleOverrides?: ComponentsOverrides["AIWidgetChatBot"];
        variants?: ComponentsVariants["AIWidgetChatBot"];
    }
    AlertDialog?: {
        styleOverrides?: ComponentsOverrides["AlertDialog"];
    }
    App?: {
        styleOverrides?: ComponentsOverrides["App"];
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
    LazyTreeViewStyled?: {
        styleOverrides?: ComponentsOverrides["LazyTreeViewStyled"];
        variants?: ComponentsVariants["LazyTreeViewStyled"];
    }
    FilterPanel?: {
        variants?: ComponentsVariants['FilterPanel'];
        styleOverrides?: ComponentsOverrides["FilterPanel"];
    }
    RegexFilter?: {
        variants?: ComponentsVariants['RegexFilter'];
        styleOverrides?: ComponentsOverrides["RegexFilter"];
    }
    FilterSlider?: {
        styleOverrides?: ComponentsOverrides["FilterSlider"];
        variants?: ComponentsVariants["FilterSlider"];
    }
    ListCounter?: {
        styleOverrides?: ComponentsOverrides["ListCounter"];
        variants?: ComponentsVariants["ListCounter"];
    }
    FilterTree?: {
        styleOverrides?: ComponentsOverrides["FilterTree"];
        variants?: ComponentsVariants["FilterTree"];
    },
    FilterTreePopOver?: {
        styleOverrides?: ComponentsOverrides["FilterTreePopOver"];
        variants?: ComponentsVariants["FilterTreePopOver"];
    }
    FilterDatePicker?: {
        styleOverrides?: ComponentsOverrides["FilterDatePicker"];
        variants?: ComponentsVariants["FilterDatePicker"];
    }
    FilterAutocomplete?: {
        styleOverrides?: ComponentsOverrides["FilterAutocomplete"];
        variants?: ComponentsVariants["FilterAutocomplete"];
    },
    FilterAutocompletePopper?: {
        styleOverrides?: ComponentsOverrides["MuiPopper"];
        variants?: ComponentsVariants["MuiPopper"];
    },
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
    PrintButton?: {
        styleOverrides?: ComponentsOverrides["PrintButton"];
        variants?: ComponentsVariants["PrintButton"];
    }
    CodeMirror?: {
        styleOverrides?: ComponentsOverrides["CodeMirror"];
    }
    WidgetBoxFilteredByTooltip?: {
        styleOverrides?: ComponentsOverrides["WidgetBoxFilteredByTooltip"];
    }
    Ic3TableCell?: {
        styleOverrides?: ComponentsOverrides["Ic3TableCell"];
    }
    Ic3TableCellDrilldown?: {
        styleOverrides?: ComponentsOverrides["Ic3TableCellDrilldown"];
    }
    Ic3TableCellError?: {
        styleOverrides?: ComponentsOverrides["Ic3TableCellError"];
    }
    Ic3FilterSwitch?: {
        styleOverrides?: ComponentsOverrides["Ic3FilterSwitch"];
        variants?: ComponentsVariants["Ic3FilterSwitch"];
    }
    "amCharts4.AmCharts4BubbleChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4BubbleChart"]
    }
    "amCharts4.AmCharts4ComboChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4ComboChart"]
    }
    "amCharts4.AmCharts4RegularAreaChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4RegularAreaChart"]
    }
    "amCharts4.AmCharts4RegularBarChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4RegularBarChart"]
    }
    "amCharts4.AmCharts4RegularColumnChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4RegularColumnChart"]
    }
    "amCharts4.AmCharts4RegularLineChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4RegularLineChart"]
    }
    "amCharts4.AmCharts4ScatterPlot"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4ScatterPlot"]
    }
    "amCharts4.AmCharts4StackedAreaChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4StackedAreaChart"]
    }
    "amCharts4.AmCharts4StackedBarChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4StackedBarChart"]
    }
    "amCharts4.AmCharts4StackedColumnChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4StackedColumnChart"]
    }
    "amCharts4.AmCharts4DonutChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4DonutChart"]
    }
    "amCharts4.AmCharts4GaugeChart"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4GaugeChart"]
    }
    "amCharts4.AmCharts4Histogram"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4Histogram"]
    }
    "amCharts4.AmCharts4SankeyDiagram"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4SankeyDiagram"]
    }
    "amCharts4.AmCharts4TreeMap"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4TreeMap"]
    }
    "amCharts4.AmCharts4GeoMap"?: {
        variants?: Ic3ChartVariants["amCharts4.AmCharts4GeoMap"]
    }
}

/**
 * For Typing purpose extending MUI Theme with ic3 components.
 * @deprecated Please use `Components` with `import { Components } from "@mui/material/styles";`.
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

    }

    interface PaletteOptions {

        ic3?: ic3PaletteOptions;

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

        AIWidgetChatBot: AIWidgetChatBotClassKey;

        AlertDialog: AlertDialogClassKey;
        App: AppClassKey;

        ErrorRenderer: ErrorRendererClassKey;

        FilterCheckbox: FilterCheckboxRadioClassKey;
        FilterButtons: FilterButtonsClassKey;
        LazyTreeViewStyled: LazyTreeClassesClassKey;
        FilterPanel: FilterPanelClassesKey;
        FilterPanelViewsMenu: FilterPanelViewsMenuClassesKey;
        RegexFilter: RegexFilterClassesKey;
        FilterSlider: FilterSliderClassKey;
        ListCounter: ListCounterClassKey;
        FilterTree: FilterTreeClassKey;
        Ic3FilterSwitch: FilterSwitchClassKey;
        FilterTreePopOver: FilterTreePopOverClassKey;
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

        AppMenuIcon: AppMenuIconClassKey;

        QueryBuilderNode: QueryBuilderNodeClassKey;

        PrintButton: PrintButtonClassKey;

        CodeMirror: CodeMirrorClassesKey;

        WidgetBoxFilteredByTooltip: WidgetFilteredByClassesKey;
        Ic3TableCell: ThemeIc3TableCellClassesKey;
        Ic3TableCellDrilldown: ThemeIc3TableCellDrilldownClassesKey;
        Ic3TableCellError: ThemeIc3TableCellClassesKey;

    }

}

declare module '@mui/material/styles/props' {

    interface ComponentsPropsList {

        AIWidgetChatBot: AIWidgetChatBotStyleProps;

        FilterCheckbox: FilterCheckboxProps;
        FilterButtons: FilterButtonsProps;
        LazyTreeViewStyled: LazyTreeProps;
        FilterPanel: FilterPanelProps;
        RegexFilter: RegexFilterProps;
        FilterSlider: FilterSliderProps;
        ListCounter: ListCounterProps;
        FilterTree: FilterTreeProps;
        Ic3FilterSwitch: FilterSwitchProps;
        FilterTreePopOver: FilterTreePopOverProps;
        FilterDatePicker: FilterDatePickerProps;
        FilterAutocomplete: FilterAutocompleteProps;

        HtmlBox: StyledHtmlBoxProps;
        KpiCard: KpiCardProps;

        PivotTable: PivotTableProps;
        Table: TableProps;

        WidgetBox: WidgetBoxDivProps;

        GoogleMarker: GoogleMarkerVariantChartOptions;

        AppMenuIconStyled: AppMenuIconProps;

        App: AppDivProps;

        QueryBuilderNode: QueryBuilderNodeProps;

        PrintButton: StyledPrintButtonDivProps;
        Ic3TableCell: Ic3TableCellProps;
        Ic3TableCellDrilldown: Ic3TableCellDrilldownProps;
        Ic3TableCellError: Ic3TableCellProps;
    }

}
