import {PublicIcEvent} from "./IcEvent";

export interface IEventPayLoad {
    nsId: string;
    widgetId: string;
    eventName: string;
    event: PublicIcEvent | null | undefined;
}

export interface IOnNewEventJsContext {

    /**
     * @see IPublicContext.isAppConsole
     */
    isAppConsole(): boolean;

    /**
     * @see IPublicContext.isAppReportViewer
     */
    isAppReportViewer(): boolean;

    /**
     @see IPublicContext.isAppReportAppViewer
     */
    isAppReportAppViewer(): boolean;

    /**
     @see IPublicContext.isAppViewer
     */
    isAppViewer(): boolean;

    /**
     * @see IPublicContext.isAppReportEditor
     */
    isAppReportEditor(): boolean;

    /**
     * @see IPublicContext.isAppReportEditorPreview
     */
    isAppReportEditorPreview(): boolean;

    /**
     * @see IPublicContext.isAppReportAppEditor
     */
    isAppReportAppEditor(): boolean;

    /**
     * @see IPublicContext.isAppGadgetEditor
     */
    isAppGadgetEditor(): boolean;

    /**
     * A context cache that persist over calls.
     */
    getCache(): Map<string, any>;

    /**
     * A dashboard level cache  (cleared each time a dashboard is loaded).
     */
    getDashboardCache(): Map<string, any>;

    /**
     * Report user name.
     */
    getUserName(): string;

    /**
     * Report tenant, if any.
     */
    getTenant(): string | undefined;

    /**
     * Reporting version.
     */
    getReportingVersion(): string;

    /**
     * Returns true if the event is empty.
     */
    isEmptyEvent(event: IEventPayLoad): boolean;

    /**
     * The name of the event/channel.
     */
    getEventName(event: IEventPayLoad): string;

    /**
     * The caption of the event (i.e. 'United Kingdom').
     */
    getEventCaption(event: IEventPayLoad): string | undefined;

    /**
     * The MDX of the event (i.e. [Geography].[Country].&[UK]).
     */
    getEventMdx(event: IEventPayLoad): string | undefined;

    /**
     * The widgetId from the widget the event was generated, if available.
     */
    getEventWidgetId(event: IEventPayLoad): string | undefined;

    /**
     * Returns the event for the event name / channel.
     */
    getEvent(eventName: string, nsId?: string): PublicIcEvent | undefined;

    /**
     * Dispatches an event on channel eventName with value and MDX.
     */
    dispatchEvent(eventName: string, value: string, mdx: string): void;

    /**
     * Returns the widget, jQuery object.
     *
     * Using JQuery might conflict with React's state.
     * Use with care as you will modify the DOM directly.
     */
    getWidget$(widgetId: string): any;

    /**
     * Returns a list of widgets, jQuery object.
     *
     * selector : can be a list of class names .class1.class2
     *
     * Using JQuery might conflict with React's state.
     * Use with care as you will modify the DOM directly.
     */
    getWidgets$(selector: string): any;

    /**
     * Returns the widget header jQuery object.
     *
     * Using JQuery might conflit with React's state.
     * Use with care as you will modify the DOM directly.
     */
    getWidgetHeader$(widgetId: string): any;

    /**
     * Returns the widget header jQuery object (you can user text() to modify the header's title).
     *
     * Using JQuery might conflit with React's state.
     * Use with care as you will modify the DOM directly.
     */
    getWidgetHeaderTitle$(widgetId: string): any;

    /**
     * Localize the tag using the content localization files.
     */
    localize(tag: string, ...args: any[]): string;

}