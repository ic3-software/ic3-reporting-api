import {FormFieldObject} from "../PublicTemplateForm";
import {TidyTableColumnSelector} from "../PublicTidyTableTypes";

export interface GoogleMapCoordinateChartOptions extends FormFieldObject {

    /**
     * Location.
     *
     * A column/member with latitude/longitude properties.
     */
    location?: TidyTableColumnSelector;

    /**
     * Latitude.
     *
     * A column/member with latitude properties.
     */
    latitude?: TidyTableColumnSelector;

    /**
     * Longitude.
     *
     * A column/member with longitude properties.
     */
    longitude?: TidyTableColumnSelector;

}

/**
 * https://developers.google.com/maps/documentation/javascript/style-reference
 */
export enum GoogleMapFeaturesStyles {
    ALL = 'all',
    ADMINISTRATIVE = 'administrative',
    ADMINISTRATIVE_COUNTRY = 'administrative.country',
    ADMINISTRATIVE_LAND_PARCEL = 'administrative.land_parcel',
    ADMINISTRATIVE_LOCALITY = 'administrative.locality',
    ADMINISTRATIVE_NEIGHBORHOOD = 'administrative.neighborhood',
    ADMINISTRATIVE_PROVINCE = 'administrative.province',
    LANDSCAPE = 'landscape',
    LANDSCAPE_MAN_MADE = 'landscape.man_made',
    LANDSCAPE_NATURAL = 'landscape.natural',
    LANDSCAPE_NATURAL_LANDCOVER = 'landscape.natural.landcover',
    LANDSCAPE_NATURAL_TERRAIN = 'landscape_natural.terrain',
    POI = 'poi',
    POI_ATTRACTION = 'poi.attraction',
    POI_BUSINESS = 'poi.business',
    POI_GOVERNMENT = 'poi.government',
    POI_MEDICAL = 'poi.medical',
    POI_PARK = 'poi.park',
    POI_PLACE_OF_WORSHIP = 'poi.place_of_worship',
    POI_SCHOOL = 'poi.school',
    POI_SPORTS_COMPLEX = 'poi.sports_complex',
    ROAD = 'road',
    ROAD_ARTERIAL = 'road.arterial',
    ROAD_HIGHWAY = 'road.highway',
    ROAD_HIGHWAY_CONTROLLED_ACCESS = 'road.highway.controlled_access',
    ROAD_LOCAL = 'road.local',
    TRANSIT = 'transit',
    TRANSIT_LINE = 'transit.line',
    TRANSIT_STATION = 'transit.station',
    TRANSIT_STATION_AIRPORT = 'transit.station.airport',
    TRANSIT_STATION_BUS = 'transit.station.bus',
    TRANSIT_STATION_RAIL = 'transit.station.rail',
    WATER = 'water',
}

export enum GoogleMapTypeId {
    /**
     * This map type displays a transparent layer of major streets on satellite
     * images.
     */
    HYBRID = 'hybrid',
    /**
     * This map type displays a normal street map.
     */
    ROADMAP = 'roadmap',
    /**
     * This map type displays satellite images.
     */
    SATELLITE = 'satellite',
    /**
     * This map type displays maps with physical features such as terrain and
     * vegetation.
     */
    TERRAIN = 'terrain',
}

/**
 * google.maps.MapOptions
 */
export interface GoogleMapCommonFieldProps extends FormFieldObject {

    /**
     * Map Type.
     */
    mapType: GoogleMapTypeId[];

    /**
     * Features.
     */
    showFeatures: GoogleMapFeaturesStyles[];

    /**
     * Zoom.
     *
     * To set the currently displayed zoom open the widget's menu (top right) and click on 'Set Zoom & Center'.
     *
     * Integers between zero, and up to the supported <a href="https://developers.google.com/maps/documentation/javascript/maxzoom">maximum zoom level</a>.
     */
    zoom: number;

    /**
     * Latitude.
     *
     * To set the currently displayed latitude open the widget's menu (top right) and click on 'Set Zoom & Center'.
     */
    latitude: number;

    /**
     * Longitude.
     *
     * To set the currently displayed longitude open the widget's menu (top right) and click on 'Set Zoom & Center'.
     */
    longitude: number;

    /**
     * Zoom Control.
     */
    zoomControl?: boolean;

    /**
     * Full Screen Control.
     */
    fullscreenControl?: boolean;

    /**
     * Street View Control.
     */
    streetViewControl?: boolean;

}

export interface GoogleMapChartOptions extends FormFieldObject {

    /**
     * Internal usage.
     */
    groupsOrder?: string[];

    mapOptions: GoogleMapCommonFieldProps;

}
