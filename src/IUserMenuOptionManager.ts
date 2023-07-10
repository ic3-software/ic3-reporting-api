export interface IUserMenuOptionDefinition {

    /**
     * IUserMenuOptions.
     */
    option: string;

    /**
     * WidgetNotificationType.
     */
    notification: string;

}

export interface IUserMenuOptionManager {

    registerUserMenuOption(option: IUserMenuOptionDefinition): void;

}
