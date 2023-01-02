import {FormFieldObject} from "../PublicTemplateForm";
import {TidyTableColumnSelector} from "../PublicTidyTableTypes";
import {
    CompareTextInterpretationType,
    SparkChartType,
    SparklinePosition,
    TargetTextIconSet,
    TargetTextPosition
} from "../ITypes";

export class KpiCardClasses {

    public static root = "ic3KpiCard-root";

    public static valuesContent = "ic3KpiCard-valuesContent";

    public static chartContent = "ic3KpiCard-chartContent";

    public static valueTitle = "ic3KpiCard-valueTitle";

    public static valueText = "ic3KpiCard-valueText";

    public static kpiCompareTextRoot = "ic3KpiCard-compareTextRoot";

    public static kpiCompareTextRootEmpty = "ic3KpiCard-emptyCompareTextEmpty";

    public static comparePercentageText = "ic3KpiCard-comparePercentageText";

    public static compareTargetText = "ic3KpiCard-compareTargetText";

    public static comparePercentZero = "ic3KpiCard-comparePercentZero";

    public static comparePercentUp = "ic3KpiCard-comparePercentUp";

    public static comparePercentDown = "ic3KpiCard-comparePercentDown";

}

export declare type KpiCardClassKey = keyof KpiCardClasses;

export interface KpiCardProps {

    /**
     * Variant defined in the theme. If the theme has variants, then the user can select one.
     */
    variant?: string;

    sparklinePosition: SparklinePosition;

    targetPosition: TargetTextPosition;

}

/**
 * KPI Card Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: KpiCard
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface KpiCartChartOptions extends SparkChartOptionsMeta {

    /**
     * Variant defined in the theme. If the theme has variants, then the user can select one.
     */
    variant?: string;

    /**
     * Value.
     *
     * The KPI value to show in the widget.
     */
    value: TidyTableColumnSelector;

    /**
     * Target.
     *
     * Compare the value with this target value.
     */
    target?: TidyTableColumnSelector;

    /**
     * Historical Data.
     *
     * The data for the sparkline. This must be a list of numbers, e.g., [43, 5, 2, 4].
     * The color of the sparkline depends on the trend of the sparkline.
     */
    data?: TidyTableColumnSelector;

    /**
     * Title Text.
     *
     * The text above the value.
     */
    titleText: string;

    /**
     * Value Text.
     *
     * The text for the value.
     */
    valueText: string;

    /**
     * Target Text.
     *
     * The text to display after the percentage difference.
     */
    targetText: string;

    /**
     * Interpretation.
     *
     * How to compare the value and the target.
     */
    targetInterpretation: CompareTextInterpretationType;

    /**
     * Target Position.
     *
     * Where to display the target.
     */
    targetPosition: TargetTextPosition;

    /**
     * Trend Icon.
     *
     * Display the trend icon?
     */
    includeTrendIcon: boolean;

    /**
     * Icon.
     *
     * The icon that indicate the trend.
     */
    iconSet: TargetTextIconSet;

    /**
     * Position.
     *
     * Where to display the sparkline.
     */
    sparklinePosition: SparklinePosition;
}

export interface SparkChartOptionsMeta extends FormFieldObject {
    /**
     * Sparkline Type.
     */
    sparkChartType: SparkChartType;

    /**
     * Tooltips.
     *
     * Enable tooltips when the user hovers over the sparkline.
     */
    sparklineTooltips: boolean;

    /**
     * Fill Mode.
     *
     * Fill the area under the sparkline.
     */
    sparklineHasArea: boolean;

    /**
     * Radius of the columns rounded corners.
     */
    columnSparkCornerRadius: number;

    /**
     * Space between columns.
     */
    columnSparkColumnSpacing: number;
}
