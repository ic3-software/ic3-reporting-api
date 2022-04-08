import {PaperOrientation, PaperSizeName} from "./ITypes";

export type AppNotificationType =
    "edit-report" |
    "print-report-dialog" |
    "print-report" |
    "print-report-without-state" |
    "print-report-in-browser" |
    "save-state-to-localstorage" |
    "restore-state-from-localstorage" |
    "save-ownprops-to-localstorage" |
    "restore-ownprops-from-localstorage"
    ;

export interface IAppNotification {

    /**
     * E.g., print-report.
     */
    readonly type: AppNotificationType;

}

export interface IAppNotificationWithPayload<PAYLOAD> extends IAppNotification {

    /**
     * E.g., print-report.
     */
    readonly type: AppNotificationType;

    /**
     * E.g., print-report file name.
     */
    readonly payload: PAYLOAD;

}

export interface AppEditReportNotification extends IAppNotification {

    readonly type: "edit-report";

}

export interface AppPrintReportNotificationPayload {

    fileName?: string;

    paperSizeName?: PaperSizeName;
    layout?: PaperOrientation;

}

export interface IAppPrintReportNotification extends IAppNotificationWithPayload<AppPrintReportNotificationPayload> {

}

export interface AppPrintReportNotification extends IAppPrintReportNotification {

    readonly type: "print-report";

}

export interface AppPrintReportWithoutStateNotification extends IAppPrintReportNotification {

    readonly type: "print-report-without-state";

}

export interface AppPrintReportInBrowserNotification extends IAppPrintReportNotification {

    readonly type: "print-report-in-browser";

}

export interface AppPrintReportDialogNotification extends IAppNotification {

    readonly type: "print-report-dialog";

}

export interface SaveStateToLocalStorageNotification extends IAppNotification {

    readonly type: "save-state-to-localstorage";

}

export interface RestoreStateFromLocalStorageNotification extends IAppNotification {

    readonly type: "restore-state-from-localstorage";

}

export interface SaveOwnPropsToLocalStorageNotification extends IAppNotification {

    readonly type: "save-ownprops-to-localstorage";

}

export interface RestoreOwnPropsFromLocalStorageNotification extends IAppNotification {

    readonly type: "restore-ownprops-from-localstorage";

}

export type AppNotification =
    AppEditReportNotification |
    AppPrintReportDialogNotification |
    AppPrintReportNotification |
    AppPrintReportWithoutStateNotification |
    AppPrintReportInBrowserNotification |
    SaveStateToLocalStorageNotification |
    RestoreStateFromLocalStorageNotification |
    SaveOwnPropsToLocalStorageNotification |
    RestoreOwnPropsFromLocalStorageNotification
    ;