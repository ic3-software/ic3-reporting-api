import {CSSInterpolation} from "@mui/system";
import {ic3Components} from "./PublicTheme";

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

export interface IThemeManager {

    /**
     * The theme decorator allows to setup the Theme.components and Theme.ic3 using the theme
     * created from its partial options (e.g., using palette, typography, spacing, etc...)
     */
    registerTheme(themeOptions: any, themeDecorator?: (theme: any) => ic3Components, baseTheme?: EmbeddedThemeNames): void;

    /**
     * Register editor themes. Change the editor theme in ic3report-config.js by setting defaultEditorThemeId to a
     * themeId from a theme using this method.
     */
    registerEditorTheme(themeOptions: any, themeDecorator?: (theme: any) => ic3Components): void;

}