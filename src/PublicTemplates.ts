import {PivotTableChartOptions} from "./theme/ThemePivotTable";
import {DatePickerChartOptions} from "./theme/ThemeDatePicker";
import {ImageChartOptions} from "./theme/ThemeImage";
import {KpiBoxChartOptions} from "./theme/ThemeKpiBox";
import {KpiCartChartOptions} from "./theme/ThemeKpiCard";
import {EmbeddedReportChartOptions} from "./theme/ThemeEmbeddedReport";
import {MarkdownTextChartOptions} from "./theme/ThemeMarkdownText";
import {FilterPanelChartOptions} from "./theme/ThemeFilterPanel";
import {RepetitionWidgetChartOptions} from "./theme/ThemeRepetitionWidget";
import {GoogleHeatMapChartOptions} from "./theme/ThemeGoogleHeatMap";
import {GoogleMarkerChartOptions} from "./theme/ThemeGoogleMarker";
import {GoogleKmlLayerChartOptions} from "./theme/ThemeGoogleKmlLayer";
import {TableChartOptions} from "./theme/ThemeTable";
import {FormFieldObject} from "./PublicTemplateForm";
import {FilterButtonsChartOptions} from "./theme/ThemeFilterButtons";
import {FilterCheckboxRadioChartOptions} from "./theme/ThemeFilterCheckboxRadio";
import {FilterSliderChartOptions} from "./theme/ThemeFilterSlider";
import {FilterAutocompleteChartOptions} from "./theme/ThemeFilterAutocomplete";
import {FilterTreeChartOptions} from "./theme/ThemeFilterTree";
import {
    AmCharts4BubbleChartOptions,
    AmCharts4ComboChartOptions, AmCharts4DivergentBarChartOptions,
    AmCharts4DonutChartOptions, AmCharts4GanttChartOptions,
    AmCharts4GaugeChartOptions,
    AmCharts4HistogramOptions,
    AmCharts4RegularAreaChartOptions,
    AmCharts4RegularBarChartOptions,
    AmCharts4RegularColumnChartOptions,
    AmCharts4RegularLineChartOptions,
    AmCharts4SankeyDiagramOptions,
    AmCharts4ScatterPlotOptions,
    AmCharts4StackedAreaChartOptions,
    AmCharts4StackedBarChartOptions,
    AmCharts4StackedColumnChartOptions,
    AmCharts4TreemapOptions,
    GeoMapChartOptions
} from "./theme/ThemeAmCharts4";
import {PrintButtonChartOptions} from "./theme/ThemePrintButton";
import {AIWidgetChatBotOptions} from "./theme/ThemeAIWidgetChatBot";
import {FilterSwitchChartOptions} from "./theme/ThemeFilterSwitch";

interface IWidgetTemplateChartOptions {

    "ic3.AIChatBox": AIWidgetChatBotOptions,

    "ic3.DatePicker": DatePickerChartOptions,

    "ic3.EmbeddedReport": EmbeddedReportChartOptions,

    "ic3.FilterAutocomplete": FilterAutocompleteChartOptions,
    "ic3.FilterAutocompleteLazy": FilterAutocompleteChartOptions,
    "ic3.FilterButtons": FilterButtonsChartOptions,
    "ic3.FilterCheckboxRadio": FilterCheckboxRadioChartOptions,
    "ic3.FilterPanel": FilterPanelChartOptions,
    "ic3.FilterSlider": FilterSliderChartOptions,
    "ic3.FilterTree": FilterTreeChartOptions,
    "ic3.FilterSwitch": FilterSwitchChartOptions,

    "ic3.GoogleHeatMap": GoogleHeatMapChartOptions,
    "ic3.GoogleKmlLayer": GoogleKmlLayerChartOptions,
    "ic3.GoogleMarker": GoogleMarkerChartOptions,

    "ic3.Image": ImageChartOptions,

    "ic3.KpiBox": KpiBoxChartOptions,
    "ic3.KpiCard": KpiCartChartOptions,

    "ic3.MarkdownText": MarkdownTextChartOptions,

    "ic3.PrintButton": PrintButtonChartOptions,

    "ic3.PivotTable": PivotTableChartOptions,

    "ic3.RepetitionWidget": RepetitionWidgetChartOptions,

    "ic3.Table": TableChartOptions,

    // amCharts 4: XY

    "amCharts4.AmCharts4BubbleChart": AmCharts4BubbleChartOptions,
    "amCharts4.AmCharts4ComboChart": AmCharts4ComboChartOptions,
    "amCharts4.AmCharts4RegularAreaChart": AmCharts4RegularAreaChartOptions,
    "amCharts4.AmCharts4RegularBarChart": AmCharts4RegularBarChartOptions,
    "amCharts4.AmCharts4RegularColumnChart": AmCharts4RegularColumnChartOptions,
    "amCharts4.AmCharts4RegularLineChart": AmCharts4RegularLineChartOptions,
    "amCharts4.AmCharts4ScatterPlot": AmCharts4ScatterPlotOptions,
    "amCharts4.AmCharts4StackedAreaChart": AmCharts4StackedAreaChartOptions,
    "amCharts4.AmCharts4StackedBarChart": AmCharts4StackedBarChartOptions,
    "amCharts4.AmCharts4StackedColumnChart": AmCharts4StackedColumnChartOptions,

    // amCharts 4: Others

    "amCharts4.AmCharts4DonutChart": AmCharts4DonutChartOptions,
    "amCharts4.AmCharts4GaugeChart": AmCharts4GaugeChartOptions,
    "amCharts4.AmCharts4Histogram": AmCharts4HistogramOptions,
    "amCharts4.AmCharts4SankeyDiagram": AmCharts4SankeyDiagramOptions,
    "amCharts4.AmCharts4TreeMap": AmCharts4TreemapOptions,
    "amCharts4.AmCharts4GanttChart": AmCharts4GanttChartOptions,
    "amCharts4.AmCharts4DivergentBarChart": AmCharts4DivergentBarChartOptions,

    // amCharts 4: Geo.

    "amCharts4.AmCharts4GeoMap": GeoMapChartOptions,



}

export type WidgetTemplateChartOptions = IWidgetTemplateChartOptions & { [key: string]: FormFieldObject };
export type WidgetTemplateIDs = keyof IWidgetTemplateChartOptions;
