import { Theme } from "@mui/material/styles";


export class AppClasses {
    /**
     * Style applied to
     */
    static readonly root: string = "ic3App-root";
    /**
     * Style applied to
     */
    static readonly topMenu: string = "ic3App-topMenu";
    /**
     * Style applied to
     */
    static readonly leftToolbar: string = "ic3App-toolbar";
    /**
     * Style applied to
     */
    static readonly drawer: string = "ic3App-drawer";

    static readonly drawerSmall: string = "ic3App-drawer-small";
    /**
     * Dashboard in viewer mode
     */
    static readonly payload: string = "ic3App-payload";
    /**
     * Style applied to
     */
    static readonly error: string = "ic3App-error";
    /**
     * Style applied to
     */
    static readonly topBar: string = "ic3App-bar";
    static readonly topBarInFloating: string = "ic3App-bar-floating";
    /**
     * Style applied to
     */
    static readonly leftFilter: string = "ic3App-leftFilter";
    /**
     * Style applied to the root div containing the edited dashboard pages.
     */
    static readonly dashboard: string = "ic3App-dashboard";
    /**
     * Style applied to
     */
    static readonly zoomWidget: string = "ic3App-zoomWidget";
    /**
     * Class added to root when the left filter panel is collapsed.
     */
    static readonly leftPanelCollapsed: string = "ic3LeftPanelCollapsed";
}

export declare type AppClassKey = keyof AppClasses;

export interface AppDivProps {
    dashboardTheme: Theme;
    topBarOptions: TopBarOptions;
    leftBarOptions: LeftBarOptions;
    opacity?: string;
    drawerW: string;
}

export enum TopBarOptions {
    None,
    EditorMode,
    AppViewerTopFilter,
    AppViewerTopMenu,
    AppViewerTopMenuFloating
}

export enum LeftBarOptions {
    None,
    EditorMode,
    AppViewerLeftFilter,
    AppViewerRightFilter,
}