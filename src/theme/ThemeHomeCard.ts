
export class HomeCardClasses {

    static readonly background = "ic3HomeCard-background";

    static readonly card = "ic3HomeCard-card";

    static readonly menuIcon = "ic3HomeCard-menuIcon";

}

export declare type HomeCardClassKey = keyof HomeCardClasses;

export interface HomeCardProps {
    appId: string;
}