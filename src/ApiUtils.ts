import {IPluginDefinition} from "./IPluginDefinition";
import {IVersionedPluginDefinition} from "./IVersionedPluginDefinition";
import ReportingVersion from "./ReportingVersion";
import {FormFieldObject} from "./PublicTemplateForm";
import {
    IPublicWidgetJsTemplateDefinition,
    IPublicWidgetTemplateDefinition,
    IWrappedWidgetTemplateDefinition
} from "./PublicTemplate";
import {IWidgetPublicContext} from "./PublicContext";
import {WidgetTemplateIDs} from "./PublicTemplates";

export interface AmCharts4WrappedDefinition<WIDGET extends WidgetTemplateIDs> {

    /**
     * Some free text used while registering the wrapper (e.g., error purpose).
     */
    readonly registrationInfo: string;

    /**
     * e.g., amCharts4.AmCharts4DonutChart
     */
    readonly wrappedWidgetTemplateId: WIDGET;

    /**
     * New overall meta-information (e.g., id, groupId, image, etc...).
     */
    readonly props: Partial<IPublicWidgetTemplateDefinition<FormFieldObject>>;

    /**
     * Meta-information for the editing of the widget options as well as the actual processing of those options
     * (i.e., AmCharts 4 chart configuration). Lazy-loaded (and the underlying AmCharts 4 library) once required.
     *
     * <pre>
     *      export default {
     *
     *          hookChartOptionsMeta: () => {
     *              ...
     *          },
     *
     *          hookChartOptions: () => {
     *              ...
     *          },
     *
     *      }
     * </pre>
     */
    readonly hooks: Promise<any>;

}

export class ApiUtils {

    /**
     * Define the form field as being localized.
     */
    public static readonly TAG_I18N_FIELD = "ic3t_";

    public static makePlugin(definition: IPluginDefinition): () => IVersionedPluginDefinition {

        return (): IVersionedPluginDefinition => {

            return {

                apiVersion: new ReportingVersion(
                    "8.4.9" || "-",
                    "Fri, 23 Feb 2024 04:36:15 GMT" || "-"
                ),

                ...definition,

            }

        }
    }

    /**
     * A helper method to create a widget template using the resolveDefinition method.
     * Webpack lazy load of dependencies.
     *
     * @see IPublicWidgetJsTemplateDefinition#resolveDefinition
     */
    public static createLazyJsWidgetTemplateDefinition<OPTIONS extends FormFieldObject>(definition: Omit<IPublicWidgetJsTemplateDefinition<OPTIONS>, "jsCode">): IPublicWidgetJsTemplateDefinition<OPTIONS> {

        return {

            ...definition,

            jsCode: (context: IWidgetPublicContext, container: HTMLDivElement) => {
                throw new Error("JS Lazy: unexpected jsCode() call!");
            },

            reactComponent: false,

            withDrilldownPivotTableLikeAs: false,

        }

    }

    public static resolveAmCharts4WidgetTemplateDefinition<OPTIONS extends FormFieldObject>(definition: IPublicWidgetTemplateDefinition<OPTIONS>, wrapped: IPublicWidgetTemplateDefinition<any>): IPublicWidgetTemplateDefinition<OPTIONS> {

        return {

            ...wrapped,
            ...definition as any /* since Typescript 5.0.2 */,

            resolveDefinition: undefined,
            jsCode: wrapped.jsCode,

        } as IPublicWidgetTemplateDefinition<OPTIONS>

    }

    /**
     * A utility function creating a wrapper widget template definition for existing AmCharts 4 widgets.
     */
    public static makeAmCharts4WrappedWidgetTemplateDefinition<WIDGET extends WidgetTemplateIDs>(props: AmCharts4WrappedDefinition<WIDGET>): IWrappedWidgetTemplateDefinition<WIDGET> {

        return {

            registrationInfo: props.registrationInfo,
            wrappedWidgetTemplateId: props.wrappedWidgetTemplateId,

            wrapper: (wrapped) => {

                return {

                    ...wrapped /* unresolved */,

                    ...props.props /* e.g., id, groupId, etc... */,

                    /**
                     * amCharts 4 widgets are loading the amCharts 4 Javascript library on the fly.
                     *
                     * This extended widget has to use the resolveDefinition() mechanism as well to be able to re-use
                     * the lazy-loaded jsCode (widgets are implemented as IPublicWidgetJsTemplateDefinition).
                     */
                    resolveDefinition: function (wrappedR) {

                        const wrappedResolved = ApiUtils.resolveAmCharts4WidgetTemplateDefinition(this, wrappedR!);

                        return new Promise((resolve, reject) => {

                            props.hooks.then(definition => resolve({

                                ...wrappedResolved,

                                // our (lazy-loaded) widget meta-information and options hook.

                                chartOptionsMeta: definition.default.hookChartOptionsMeta(wrappedResolved.chartOptionsMeta),
                                hookChartOptions: definition.default.hookChartOptions,

                            })).catch(err => reject(err))
                        });

                    }
                }
            }

        } as IWrappedWidgetTemplateDefinition<WIDGET>;

    }

}