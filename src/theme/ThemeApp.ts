
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
    static readonly toolbar: string = "ic3App-toolbar";
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
    static readonly bar: string = "ic3App-bar";
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
}

export declare type AppClassKey = keyof AppClasses;

export interface AppDivProps {
    topBarOptions: TopBarOptions;
    leftBarOptions: LeftBarOptions;
    viewer: boolean;
    opacity?: string;
    editorActive: boolean;
}

export enum TopBarOptions {
    None,
    Standard,
}

export enum LeftBarOptions {
    None,
    Standard,
    Filter,
}