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
                    "8.0.0-alpha.15" || "-",
                    "Fri, 29 Oct 2021 12:14:28 GMT" || "-"
                ),

                ...definition,

            }

        }
    }

}