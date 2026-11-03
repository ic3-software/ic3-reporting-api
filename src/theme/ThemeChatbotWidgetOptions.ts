import {FormFieldObject} from "../PublicTemplateForm";

export class Ic3ChatbotWidgetClasses {

    static readonly chatBotWidgetContent = "ic3ChatBotWidget-content";
}

export declare type Ic3ChatbotWidgetClassesKey = keyof Ic3ChatbotWidgetClasses;

export interface ChatbotWidgetOptions extends FormFieldObject {

    /**
     * Name of a variant. Note that a variant is possibly overriding defined options.
     */
    variant?: string;

    useOnlyDataFromWidgets?: string;

    tableDataMaxRow?: number;

    resetOnDataChange: boolean;

    initialQuestion?: string;

    initialSuggestions?: { suggestion: string }[];

    showInitialQuestion?: boolean;

    disableConversation?: boolean;

    messageShowStats?: boolean;

    inputPlaceholder?: string;

    showFooter: boolean;

    footerDisclaimer?: string;

    footerShowStats: boolean;

    footerShowReset: boolean;

}

export interface ChatbotWidgetProps {
    variant?: string;
}