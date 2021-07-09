import {IPluginDefinition} from "./IPluginDefinition";
import {IVersionedPluginDefinition} from "./IVersionedPluginDefinition";
import ReportingVersion from "./ReportingVersion";

export class ApiUtils {

    /**
     * Define the form field as being localized.
     */
    public static readonly TAG_I18N_FIELD = "ic3t_";

    static makePlugin(definition: IPluginDefinition): () => IVersionedPluginDefinition {

        return (): IVersionedPluginDefinition => {

            return {

                apiVersion: new ReportingVersion(
                    "8.0.0-alpha.9" || "-",
                    "Fri, 09 Jul 2021 08:23:42 GMT" || "-"
                ),

                ...definition,

            }

        }
    }

}