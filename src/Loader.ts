import {IReporting} from "./IReporting";


export type AppType =
    "embedded-div-init" |
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
     * E.g., useful when using custom headers from the host application.
     */
    frameId: string;

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

/**
 * Support for embedding icCube via an iFrame.
 */
export function DashboardsLoaderFrame(params: IDashboardsLoaderFrameParams) {

    const {containerId, frameId, className, style, onReady, url} = params;

    const containerELT = document.getElementById(containerId);

    if (!containerELT) {
        throw new Error("[ic3loader] (iFrame) missing container [" + containerId + "]")
    }

    console.log("[Loader] (iFrame) icCube URL : " + url);
    console.log("[Loader] (iFrame)  container : " + containerId);
    console.log("[Loader] (iFrame)   callback : " + onReady);

    const wnd = (window as any);

    wnd.ic3loader = wnd.ic3loader || {};

    wnd.ic3loader[containerId] = (ic3: IReporting) => {

        console.log("[Loader] (iFrame)      ready : ", ic3);

        delete wnd.ic3loader[containerId];
        onReady && onReady(ic3);

    }

    // setup an iFrame passing a url w/   &cb=window.name.of.callback
    //      window. or parent. then in icCube ...

    const iFrame = document.createElement('iframe');

    frameId && (iFrame.id = frameId);
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

    console.log("[Loader] (iFrame)     iFrame : " + src);

    containerELT.appendChild(iFrame);

}

export interface IDashboardsLoaderParams {

    /**
     * Whether or not icCube is going to request custom HTTP headers from the host application.
     * The value is passed back to the message sent to the host.
     */
    customHeaders?: string;

    /**
     * A (possibly empty) string saying icCube is requiring some configuration.
     * The string itself is identifying how to configure the behavior (e.g., removing logout, ...).
     * An empty string means default embedded configuration.
     */
    configuration?: string;

    urlSuffix?: string;

}

export interface IDashboardsLoaderDivParams {

    /**
     * identifier of the IReporting instance
     */
    uid: string;

    /**
     * the container to put icCube
     */
    container: string | HTMLElement;

    /**
     * an optional container where icCube will set the height to fit the current report
     */
    resizingContainer?: HTMLElement;

    /**
     * The type of application  (default: 'viewer')
     */
    appType?: AppType;

}

/**
 * Support for embedding icCube via a DIV.
 *
 * icCube uses Webpack: loading the entry point (i.e., main.js) will start loading all initial chunks.
 *
 * You can create this context ASAP. Actually can be done at any point in your app life time before
 * any icCube rendering is required yet.
 *
 * Can be easily wrapped into a React context (see ic3-demo-embedded-react Github project).
 */
export class DashboardsLoaderDivContext {

    private static readonly crfCodeRE = /ic3_CSRF_token = "(.*)"/
    private static readonly mainJsCacheKeyRE = /main\.js\?(.*)">/
    private static readonly buildVersionRE = /ic3_build_version = "(.*)"/
    private static readonly buildTimestampRE = /ic3_build_timestamp = "(.*)"/

    /**
     * The URL path of the icCube index.html containing the Webpack main entry point (i.e., main.js).
     */
    private readonly indexHtmlUrl = "/icCube/report/console";

    /**
     * The URL path where icCube Webpack files are located:
     *
     * /icCube/report
     *      app                  -- public path
     *          index.html
     *          main.js
     *          chunks
     *          ...
     *      plugins              -- e.g., amCharts
     *          ...
     *
     */
    private readonly publicPath = "/icCube/report/app/";

    /**
     * Whether or not icCube is going to request custom HTTP headers from the host application.
     * The value is passed back to the message sent to the host.
     */
    private readonly customHeaders?: string;

    /**
     * A (possibly empty) string saying icCube is requiring some configuration.
     * The string itself is identifying how to configure the behavior (e.g., removing logout, ...).
     * An empty string means default embedded configuration.
     */
    private readonly configuration?: string;

    private readonly mainJsUrl: string;

    private buildVersion = "";
    private buildTimestamp = "";

    private libLoader: Promise<unknown> | undefined;

    constructor(options?: string | IDashboardsLoaderParams) {

        let suffix = "";
        let customHeaders;
        let configuration;

        if (typeof options === "string") {

            suffix = options;

        } else if (options) {

            customHeaders = options.customHeaders;
            configuration = options.configuration;

            suffix = options.urlSuffix || suffix;

        }

        this.customHeaders = customHeaders;
        this.configuration = configuration;
        this.indexHtmlUrl += suffix;
        this.mainJsUrl = this.publicPath + "main.js" + suffix;

        // Start loading all required initial libraries (in the background).
        this.libLoader = this.loadLibs();
    }

    private static extractMatch(indexHtml: string, regExp: RegExp, error?: string) {
        const match = indexHtml.match(regExp);
        if (match == null || match.length !== 2) {
            if (error != null)
                throw new Error(error);
            else
                return ""
        }
        const token = match[1];
        return token;
    }

    private static loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.onload = resolve
            script.onerror = reject
            script.src = src
            document.head.append(script)
        })
    }

    public getBuildVersion() {
        return this.buildVersion
    }

    public getBuildTimestamp() {
        return this.buildTimestamp
    }

    public loadLibsAndInitialize(options: IDashboardsLoaderDivParams): Promise<IReporting> {

        const {uid, container, appType, resizingContainer} = options;

        const loader = this.loadLibs();

        return loader.then((starter: any) => {

            return new Promise<IReporting>((resolve, reject) => {

                const start = performance.now();

                starter({

                    ...options,

                    uid,

                    appType: appType ?? "viewer",

                    container,

                    resizingContainer,

                    callback: (reporting: IReporting) => {

                        const timeDiff = Math.round(performance.now() - start);

                        console.log("[Loader] (div) loadLibsAndInitialize completed in " + timeDiff + " ms.");

                        resolve(reporting)
                    },

                });

            });

        }).catch(
            reason => Promise.reject(reason)
        )

    }

    /**
     * First step load main.js, associated chunks
     */
    private loadLibs() {

        if (this.libLoader == null) {

            const wnd = window as any;
            const start = performance.now();

            this.libLoader = fetch(this.indexHtmlUrl, {cache: 'no-cache'})
                .then(response => {

                    if (!response.ok) {
                        throw new Error(response.status + ":" + response.statusText + " (" + response.url + ")");
                    }

                    return response.text();

                }).then(indexHtml => {

                    // CSRF code.
                    //
                    // The server might have been configured with csrfOff=true meaning we should not fail here.
                    // Plus that token value is more or less sent (not clear in the server code). So let's use
                    // the value we get (anyway an error will be generated later => guess it's fine).
                    {
                        const token = DashboardsLoaderDivContext.extractMatch(indexHtml, DashboardsLoaderDivContext.crfCodeRE);
                        token && (wnd['ic3_CSRF_token'] = token);
                    }

                    // Webpack entry point (main.js) cache busting key
                    let cacheKey = "";
                    if (!this.mainJsUrl.includes("?")) {
                        cacheKey = "?" + DashboardsLoaderDivContext.extractMatch(indexHtml, DashboardsLoaderDivContext.mainJsCacheKeyRE, "Internal Error: missing main.js");
                    }

                    // Build information
                    this.buildVersion = DashboardsLoaderDivContext.extractMatch(indexHtml, DashboardsLoaderDivContext.buildVersionRE)
                    this.buildTimestamp = DashboardsLoaderDivContext.extractMatch(indexHtml, DashboardsLoaderDivContext.buildTimestampRE)

                    const scriptUrl = this.mainJsUrl + cacheKey;

                    // Load Webpack entry point: main.js
                    console.log("[Loader] (div) start loading library [version:" + this.buildVersion + "] [build:" + this.buildTimestamp + "]");

                    wnd["__ic3_div_embedded__"] = true;
                    wnd["__ic3_div_webpack_public_path__"] = this.publicPath;
                    wnd["__ic3_div_custom_headers__"] = this.customHeaders;
                    wnd["__ic3_div_configuration__"] = this.configuration;

                    wnd["__ic3_embedded__"] = true /* embedding a previous version */;
                    wnd["__ic3__webpack_public_path__"] = this.publicPath /* embedding a previous version */;

                    return DashboardsLoaderDivContext.loadScript(scriptUrl).catch(reason => Promise.reject("Error loading main.js script : " + scriptUrl))

                }).then(() => {

                    console.log("[Loader] (div) main.js loaded in " + Math.round(performance.now() - start) + " ms");

                    let count = 0;

                    return new Promise((resolve, reject) => {

                        // Busy wait till icCube has loaded all initial Webpack chunks and initialized itself.

                        (function waitUtil() {

                            if (wnd["__ic3_div_embedded_starter__"] !== undefined) {

                                const timeDiff = Math.round(performance.now() - start);

                                console.log("[Loader] (div) scripts ready in " + timeDiff + " ms");

                                resolve(wnd["__ic3_div_embedded_starter__"]);

                            } else {

                                if (count++ === 4) {
                                    console.log("[Loader] (div) scripts : waiting for icCube initialized");
                                    count = 0;
                                }

                                setTimeout(waitUtil, 250);
                            }

                        })();
                    })

                }).catch(
                    reason => Promise.reject(reason.message ?? reason)
                );
        }

        return this.libLoader;
    }

}