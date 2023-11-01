export interface IMigrationManager {

    registerLayoutConfigId(from: string, to: string): void;
    registerTemplateId(from: string, to: string): void;

}
