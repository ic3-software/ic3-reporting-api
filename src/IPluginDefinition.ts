import {ILocalizationManager} from "./ILocalizationManager";
import {IThemeManager} from "./IThemeManager";
import {IWidgetManager} from "./IWidgetManager";
import {ITidyTableTransformationManager} from "./ITidyTableTransformationManager";
import {IWidgetDefaultsManager} from "./IWidgetDefaultsManager";
import {Theme} from "@mui/material/styles";

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
    registerAmCharts4?: (callback: (am4core: any) => void) => void;

    registerLocalization?: (manager: ILocalizationManager) => void;

    registerThemes?: (manager: IThemeManager) => void;

    registerWidgets?: (manager: IWidgetManager) => void;

    registerTidyTableTransformations?: (manager: ITidyTableTransformationManager) => void;

    registerWidgetDefaults?: (theme: Theme, manager: IWidgetDefaultsManager) => void;

}