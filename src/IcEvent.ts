export const emptySet = "∅"

export enum IcEventType {
    TIDY_SELECTION,
    TIDY_FIRE,
    TIDY_ACTION,
    API,
}

/**
 * Event mandatory events as sent by the widgets -> @{eventName}
 */
export interface PublicIcEvent {

    /**
     * The value of the event
     */
    readonly value: string;

    /**
     * The MDX version of the events
     */
    readonly mdx: string;

    /**
     * If available the key of the MDX member
     */
    readonly key?: any | any[];

    /**
     * These two strings together define an unique id for a widget in a report
     */
    sourceNid?: string;
    sourceWid?: string;

    /**
     * special 'tag' to
     */
    isEmpty?: boolean;

    /**
     * the type of event
     */
    readonly type?: IcEventType;
}

export interface TidyActionEvent extends PublicIcEvent {

    readonly type: IcEventType.TIDY_ACTION;

    readonly tidyIdxHint: number

}

export enum WidgetNotificationType {

    doAllEvents = "ic3doAllEvents",

    doCustomAction = "ic3doCustomAction",

    doExportWidgetData = "ic3exportWidgetData",

    doExportToExcel = "ic3exportToExcel",
    doExportToPNG = "ic3exportToPNG",
    doExportToSVG = "ic3exportToSVG",

    toInitialSelection = 'ic3toInitialSelection',

    clearSelection = "ic3clearSelection",
    clearState = "ic3clearState",

    doTemplateUserMenuAction = "ic3doTemplateUserMenuAction",

    doPrintReport = "ic3doPrintReport",
    onWidgetZoom = "ic3onWidgetZoom"
}

export type WidgetNotificationHandler = { type: WidgetNotificationType; handler: (type: WidgetNotificationType, event: PublicIcEvent) => void }
