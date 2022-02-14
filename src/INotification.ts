import {PaperOrientation, PaperSizeName} from "./ITypes";

export type AppNotificationType =
    "edit-report" |
    "print-report-dialog" |
    "print-report"
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

export interface AppPrintReportDialogNotification extends IAppNotification {

    readonly type: "print-report-dialog";

}

export interface AppPrintReportNotificationPayload {

    fileName?: string;

    paperSizeName?: PaperSizeName;
    layout?: PaperOrientation;

}

export interface AppPrintReportNotification extends IAppNotificationWithPayload<AppPrintReportNotificationPayload> {

    readonly type: "print-report";

}

export type AppNotification =
    AppEditReportNotification |
    AppPrintReportDialogNotification |
    AppPrintReportNotification
    ;