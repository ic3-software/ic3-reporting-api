import ReportingVersion from "./ReportingVersion";
import {AppNotification} from "./INotification";

export interface IReportDefinition {

    getName(): string;

    getPath(): string;

    getDefaultSchemaName(): string;

    setDefaultSchemaName(name: string): void;

    getDefaultCubeName(): string | undefined;

    setDefaultCubeName(name: string): void;

    getThemeUID(): string;

    setThemeUID(uid: string): void;
}

export interface IReportAppDefinition {

}

export interface IEventContentItem {

    /**
     * Localized name or name.
     */
    caption: string;

    name: string;
    uniqueName: string;
}

export type IEventContent = IEventContentItem | IEventContentItem[]

/**
 * Used to setup filter initial selection.
 */
export interface IReportParam {
    channelName: string;
    value: IEventContent;
}

export interface IOpenReportOptions {

    embedded?: boolean;

    /**
     * Full path of the report (e.g., shared:/marc/my-report).
     */
    path: string;

    /**
     * Optional JSON object (i.e., constant / filter default value).
     */
    params?: IReportParam[];

    /**
     * Called before the report definition is actually applied. Give the opportunity
     * to change the definition (e.g., schema name).
     */
    onDefinition?: (report: IReportDefinition) => void;

    /**
     * If the method exist and return true then the default error dispatcher is not
     * being called. Give the caller the opportunity to render the error.
     */
    onError?: (error: any) => boolean;

}

export interface IOpenReportAppOptions {

    /**
     * Full path of the report app. (e.g., shared:/my-report).
     */
    path: string;

    /**
     * Called before the application definition is actually applied.
     * Give the opportunity to change the definition.
     */
    onDefinition?: (report: IReportAppDefinition) => void;

    /**
     * If the method exist and return true then the default error dispatcher is not
     * being called. Give the caller the opportunity to render the error.
     */
    onError?: (error: any) => boolean;
}

/**
 * An instance of icCube reporting application.
 */
export interface IReporting {

    getVersion(): ReportingVersion;

    /**
     * @param options
     * @param pushToHistory    defaulted to true
     * @param keepGlobalFilter defaulted to false
     */
    openReport(options: IOpenReportOptions, pushToHistory?: boolean, keepGlobalFilter?: boolean): void;

    /**
     * @param options
     * @param pushToHistory    defaulted to true
     */
    openReportApp(options: IOpenReportAppOptions, pushToHistory?: boolean): void;

    fireEvent(eventName: string, value: IEventContent | null): void;

    onEvent(eventName: string, callback: (value: IEventContent | null) => void): void;

    /**
     * e.g., print-report
     */
    fireAppNotification(notification: AppNotification): void;

}