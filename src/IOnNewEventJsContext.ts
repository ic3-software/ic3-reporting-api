import {PublicIcEvent} from "./IcEvent";

export interface IEventPayLoad {
    nsId: string;
    widgetId: string;
    eventName: string;
    event: PublicIcEvent | null | undefined;
}

export interface IOnNewEventJsContext {

    /**
     * A context cache that persist over calls.
     */
    getCache(): Map<string, any>;

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
     * Returns the widget jQuery object
     *
     * Using JQuery might conflit with React's state.
     * Use with care as you will modify the DOM directly.
     */
    getWidget$(widgetId: string): any;

    /**
     * Returns the widget header jQuery object.
     *
     * Using JQuery might conflit with React's state.
     * Use with care as you will modify the DOM directly.
     */
    getWidgetHeader$(widgetId: string): any;

    /**
     * Returns the widget header jQuery object (you can user text() to modify the header's title.
     *
     * Using JQuery might conflit with React's state.
     * Use with care as you will modify the DOM directly.
     */
    getWidgetHeaderTitle$(widgetId: string): any;

}