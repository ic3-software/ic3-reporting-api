import {ILocalizationManager} from "./ILocalizationManager";
import {IThemeManager} from "./IThemeManager";
import {IWidgetManager} from "./IWidgetManager";
import {ITidyTableTransformationManager} from "./ITidyTableTransformationManager";
import {IWidgetDefaultsManager} from "./IWidgetDefaultsManager";
import {Theme} from "@mui/material/styles";
import {WidgetTemplateIDs} from "./PublicTemplates";
import {FormFieldObject} from "./PublicTemplateForm";
import {IPublicWidgetTemplateDefinition} from "./PublicTemplate";
import {ILogger} from "./Logger";
import {IUserMenuOptionManager} from "./IUserMenuOptionManager";

export interface IPluginDefinition {

    /**
     * Keep that id simple (i.e., ASCII letter without any dot, space, separator, etc...) as it will be used
     * as a folder name (once deployed into an icCube server), Webpack module name, localization id, etc...
     *
     * That name must be unique across all the plugins loaded into an icCube server.
     */
    id: string;

    /**
     * When defining new widgets using amCharts 4, this method registers the icCube license.
     */
    registerAmCharts4?: (logger: ILogger, callback: (am4core: any) => void) => void;

    registerLocalization?: (logger: ILogger, manager: ILocalizationManager) => void;

    registerUserMenuOptions?: (logger: ILogger, manager: IUserMenuOptionManager) => void;

    registerThemes?: (logger: ILogger, manager: IThemeManager) => void;

    registerWidgets?: (logger: ILogger, manager: IWidgetManager) => void;

    registerTidyTableTransformations?: (logger: ILogger, manager: ITidyTableTransformationManager) => void;

    /**
     * Register widget defaults for all themes.
     */
    registerWidgetDefaults?: (logger: ILogger, theme: Theme, manager: IWidgetDefaultsManager) => void;

    /**
     * Allows for selecting the available widgets.
     *
     * @param id pluginId.widgetId (e.g., ic3.Table)
     */
    acceptWidget?: (id: WidgetTemplateIDs | string, widget: IPublicWidgetTemplateDefinition<FormFieldObject>) => boolean;

}