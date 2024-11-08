import {CSSInterpolation} from "@mui/system";
import {Components} from "@mui/material/styles";

export enum EmbeddedThemeNames {

    Statos = "ic3-statos",

}

/**
 * Default values (e.g., box options, chart options, etc...).
 */
export interface IThemeWidgetDefaults {

    /**
     * Default values for widget boxes. Lookup order:
     *
     * <pre>
     *      plugin-id.template-id.option
     *      plugin-id.option
     *      option
     * </pre>
     *
     * @see WidgetBoxOptions (ThemeWidgetBox.ts)
     */
    box?: Record<string, any>;

    /**
     * Default values for widget chart options. Lookup order:
     *
     * <pre>
     *      plugin-id.template-id.option
     *      plugin-id.option
     *      option
     * </pre>
     *
     * @see IWidgetTemplateChartOptions (PublicTemplates.ts)
     */
    options?: Record<string, any>;

    /**
     * Default values for widget icons. These settings override the defaults set in the theme in `widgetIcons`.
     *
     * Lookup order:
     *
     * <pre>
     *      plugin-id.template-id.option
     *      plugin-id.option
     *      option
     * </pre>
     *
     * @see IWidgetIcons (PublicTheme.ts)
     */
    widgetIcons?: Record<string, any>;
}

/**
 * Sort of named set of predefined options.
 */

export type IThemeWidgetVariant = {
    props: { variant: string } & Record<string, string>;
    style: CSSInterpolation;
    defaultProps?: Record<string, any>;
} | {
    props: { variant: string } & Record<string, string>;
    defaultProps: Record<string, any>;
}

/**
 * Examples:
 * - Change the primary color of the theme to red: `theme.palette.primary.main = "#ff0000";`
 * - Change default chart color: `theme.palette.ic3.chartSingleColors.default = "#ff0000";`
 * - Change background: `theme.palette.ic3.pageBackgroundColor = "#ff0000";`
 * - Change selected color: `theme.palette.ic3.selected = "#ff0000";`
 */
export type IThemeProcessor = (theme: any, params?: any) => void;

export interface IThemeManager {

    /**
     * Used by IReportDefinition.setThemeProcessorCall().
     */
    registerThemeProcessor(name: string, processor: IThemeProcessor): void;

    /**
     * The theme decorator allows to setup the Theme.components and Theme.ic3 using the theme
     * created from its partial options (e.g., using palette, typography, spacing, etc...)
     */
    registerTheme(themeOptions: any, themeDecorator?: (theme: any) => Components, baseTheme?: EmbeddedThemeNames): void;

    /**
     * Register editor themes. Change the editor theme in ic3report-config.js by setting defaultEditorThemeId to a
     * themeId from a theme using this method.
     */
    registerEditorTheme(themeOptions: any, themeDecorator?: (theme: any) => Components): void;

}