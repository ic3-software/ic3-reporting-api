import {CSSInterpolation} from "@mui/system";

type variantName = string;

export type IThemeRegisterVariant = Record<variantName, {
    /**
     * for styled MUI like components additional properties defining when the variant applies
     */
    props?: { variant: string } & Record<string, any>,
    /**
     * default properties for the fields/options of the widget
     */
    defaultProps: Record<string, any>

    /**
     * for styled MUI like components, css styles
     */
    style?: CSSInterpolation;
}>


export interface IWidgetVariantManager {

    registerVariants(variants: IThemeRegisterVariant): void;

}