import {FormFieldObject} from "../PublicTemplateForm";

export class AIWidgetChatBotClasses {

    public static root = "ic3AIWidgetChatBot-root";

    public static messages = "ic3AIWidgetChatBot-messages";

    public static message = "ic3AIWidgetChatBot-message";

    public static messageIcon = "ic3AIWidgetChatBot-messageIcon";

    public static messageContent = "ic3AIWidgetChatBot-messageContent";

    public static messageOngoing = "ic3AIWidgetChatBot-messageOngoing";

    public static input = "ic3AIWidgetChatBot-input";

    public static inputText = "ic3AIWidgetChatBot-inputText";

    public static inputClick = "ic3AIWidgetChatBot-inputClick";

    public static footer = "ic3AIWidgetChatBot-footer";

    public static warning = "ic3AIWidgetChatBot-warning";

    public static reset = "ic3AIWidgetChatBot-reset";

}

export declare type AIWidgetChatBotClassKey = keyof AIWidgetChatBotClasses;

/**
 * AI ChatBox Options (fields of the "Chart" tab in the widget editor).
 *
 * <pre>
 *      Plugin ID         : ic3
 *      Widget/Template ID: AIWidgetChatBot
 * </pre>
 *
 * @see WidgetTemplateChartOptions
 */
export interface AIWidgetChatBotOptions extends FormFieldObject {

    variant: AIWidgetChatBotVariant;

    /**
     * The widget this chatbot is talking about.
     */
    targetWidgetId: string;

    initialQuestion?: string;

    /**
     * In this mode, only the initial question is being sent.
     */
    frozen?: true;

    tableDataMaxRow?: number;

    tableDataCaptionPage0?: string;

    model?: string;

    systemPrompt?: string;

    initialPrompt?: string;

    initialPromptPage0?: string;

}

export type AIWidgetChatBotVariant =
    "plain"
    ;

export interface AIWidgetChatBotStyleProps {

    variant: AIWidgetChatBotVariant;

}

