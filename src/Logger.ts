export type LoggerComponent =

    "AlertDialog" |
    "AmCharts4" |
    "AmCharts4GeoMap" |
    "AmCharts5" |
    "App" |
    "AppCustomHeaders" |
    "AppStarter" |
    "AppStatus" |
    "ChartTemplateWidget" |
    "Demo" |
    "EmbeddedReport" |
    "ErrorRenderer" |
    "Font" |
    "General" |
    "GoogleMap" |
    "Help" |
    "History" |
    "Keyboard" |
    "Layout" |
    "LayoutPage" |
    "LayoutRender" |
    "Loader" |
    "Localization" |
    "Other" |
    "PivotTable" |
    "PivotTablePagingView" |
    "Plugin" |
    "Profiler" |
    "ReportAppBar" |
    "ReportAppMenu" |
    "ReportInitializer" |
    "ReportStarter" |
    "RepetitionWidget" |
    "Request" |
    "SchemaDataUpdate" |
    "Storage" |
    "Table" |
    "WidgetBox" |
    "WidgetBoxWrapper" |
    "WidgetTemplateLibrary"
    ;


export interface ILogger {

    resetTime(): void;

    disable(component: LoggerComponent): void;

    enable(component: LoggerComponent): void;

    isEnabled(logger: LoggerComponent): boolean;

    disabled(): Set<LoggerComponent>;

    info(component: LoggerComponent, message: string, ...extra: any): void;

    warn(component: LoggerComponent, message: string, ...extra: any): void;

    error(component: LoggerComponent, message: string, ...extra: any): void;

    infoWidget(component: LoggerComponent, nsId: string, widgetId: string, message: string, ...extra: any): void;

    errorWidget(component: LoggerComponent, nsId: string, widgetId: string, message: string, ...extra: any): void;

}
