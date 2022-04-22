import {IReporting} from "./IReporting";


export type AppType =
    "console" /* shell for accessing the following applications */ |
    "viewer" /* report viewer */ |
    "editor" /* report editor */ |
    "admin" /* report administration */ |
    "appEditor" /* report application (i.e. lists of reports) editor */;


export interface IDashboardsLoaderFrameParams {

    /**
     * An unique ID (DOM) that is identifying the icCube dashboards instance.
     */
    containerId: string;

    /**
     * Optional CSS class of the created iFrame.
     */
    className?: string;

    /**
     * Optional CSS inline styling of the created iFrame.
     */
    style?: Partial<CSSStyleDeclaration>;

    onReady: (ic3: IReporting) => void;

    url: string;

}

export function DashboardsLoaderFrame(params: IDashboardsLoaderFrameParams) {

    const {containerId, className, style, onReady, url} = params;

    const containerELT = document.getElementById(containerId);

    if (!containerELT) {
        throw new Error("[ic3loader] (iFrame) missing container [" + containerId + "]")
    }

    console.log("[ic3loader] (iFrame) icCube URL : " + url);
    console.log("[ic3loader] (iFrame)  container : " + containerId);
    console.log("[ic3loader] (iFrame)   callback : " + onReady);

    const wnd = (window as any);

    wnd.ic3loader = wnd.ic3loader || {};

    wnd.ic3loader[containerId] = (ic3: IReporting) => {

        console.log("[ic3loader] (iFrame)      ready : ", ic3);

        delete wnd.ic3loader[containerId];
        onReady && onReady(ic3);

    }

    // setup an iFrame passing a url w/   &cb=window.name.of.callback
    //      window. or parent. then in icCube ...

    const iFrame = document.createElement('iframe');

    className && (iFrame.className = className);

    iFrame.width = "100%";
    iFrame.height = "100%";

    if (style) {
        for (const property in style) {
            (iFrame.style as any)[property] = style[property];
        }
    } else {
        iFrame.style.border = "0px none";
    }

    const sep = url.indexOf("?") === -1 ? "?" : "&";
    const src = url + sep + "ic3callback=ic3loader." + containerId;

    iFrame.setAttribute("src", src);

    console.log("[ic3loader] (iFrame)     iFrame : " + src);

    containerELT.appendChild(iFrame);

}