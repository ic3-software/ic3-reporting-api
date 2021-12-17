import {IPluginDefinition} from "./IPluginDefinition";
import {IVersionedPluginDefinition} from "./IVersionedPluginDefinition";
import ReportingVersion from "./ReportingVersion";
import {IPublicWidgetTemplateDefinition, IResolveDefinitionLibrary} from "./PublicTemplate";

export class ApiUtils {

    /**
     * Define the form field as being localized.
     */
    public static readonly TAG_I18N_FIELD = "ic3t_";

    static makePlugin(definition: IPluginDefinition): () => IVersionedPluginDefinition {

        return (): IVersionedPluginDefinition => {

            return {

                apiVersion: new ReportingVersion(
                    "8.0.0-rc.2" || "-",
                    "Fri, 17 Dec 2021 08:53:29 GMT" || "-"
                ),

                ...definition,

            }

        }
    }

    /**
     * Wrap the template from another widget. The widget can come from a plugin or from the included widgets.
     * Wrapping means that the template receives its not-defined settings from the template that is wrapped.
     * @param wrappedTemplateId the unique identifier of the template, e.g., amCharts4.AmCharts4DonutChart.
     * @param newDefinition definition of the new widget.
     * @param transformOptions create the available options using the options from the wrapped template.
     */
    static makeWidgetTemplateWrapper<T extends IPublicWidgetTemplateDefinition<any>>(
        wrappedTemplateId: string, newDefinition: T, transformOptions?: (old: T['chartOptionsMeta']) => void
    ): T {
        return {

            // New definition must have type, id, image & groupId for the widget selector.
            ...newDefinition,

            resolveDefinition: function (lib: IResolveDefinitionLibrary) {
                const self = newDefinition;
                return lib.wrapTemplateDefinition(wrappedTemplateId)
                    .then(definition => ApiUtils.resolveTemplateDefinition(self, definition, transformOptions))
            },

            jsCode: () => {
                throw Error("Wrapped widget template " + wrappedTemplateId + ": unexpected jsCode() call!");
            },

        }
    }

    private static resolveTemplateDefinition<T extends IPublicWidgetTemplateDefinition<any>>(
        self: T, definition: IPublicWidgetTemplateDefinition<any>, transformOptions?: (old: T["chartOptionsMeta"]) => void
    ): T {
        const newTemplate = {...definition, ...self, resolveDefinition: undefined};
        // TODO (tom) use deepClone for the optionsMeta.
        if (transformOptions != null) {
            transformOptions(newTemplate.chartOptionsMeta);
        }
        return newTemplate;
    }

}