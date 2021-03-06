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
     * When opening a report in viewer mode (i.e., /viewer URL) icCube is checking that the default schema
     * is being authorized and generates an error. When opening a report from a host application and changing
     * the default schema on the fly, you might want to disable that check.
     */
    disableDefaultSchemaAuthCheck?: boolean;

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
     * @param options            path, ...
     * @param pushToHistory      defaulted to true
     * @param keepGlobalFilter   defaulted to true. Apply the global filter to the newly opened report.
     *
     * @see IOpenReportOptions#onDefinition
     */
    openReport(options: IOpenReportOptions, pushToHistory?: boolean, keepGlobalFilter?: boolean): void;

    /**
     * @param options          path, ...
     * @param pushToHistory    defaulted to true
     *
     * @see IOpenReportOptions#onDefinition
     */
    openReportApp(options: IOpenReportAppOptions, pushToHistory?: boolean): void;

    /**
     * Publish a widget event to the dashboard.
     */
    fireEvent(eventName: string, value: IEventContent | null): void;

    /**
     * Subscribe to a widget event.
     */
    onEvent(eventName: string, callback: (value: IEventContent | null) => void): void;

    /**
     * Publish a application notification (e.g., print-report).
     */
    fireAppNotification(notification: AppNotification): void;

}