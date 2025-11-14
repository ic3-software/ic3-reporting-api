import {
    ic3BaseComponents,
    ic3ComponentNameToClassKey,
    ic3ComponentsPropsList,
    ic3Palette,
    ic3PaletteOptions,
    ic3Theme,
    ic3ThemeOptions,
    ic3Typography,
    ic3TypographyOptions
} from "./PublicTheme";

/**
 *
 * MUI Module augmentation
 *
 */
declare module "@mui/material/styles" {

    interface Palette {

        ic3: ic3Palette;

    }

    interface PaletteOptions {

        ic3?: ic3PaletteOptions;

    }

    interface TypographyVariants {

        ic3: ic3Typography;

    }

    interface TypographyVariantsOptions {

        ic3?: ic3TypographyOptions;

    }

    interface Theme {

        ic3: ic3Theme;

    }

    /**
     * Input of createTheme( {...} )
     */
    interface ThemeOptions {

        ic3: ic3ThemeOptions;

    }

    interface Components extends ic3BaseComponents {

    }

    interface ComponentNameToClassKey extends ic3ComponentNameToClassKey {

    }

    interface ComponentsPropsList extends ic3ComponentsPropsList {

    }

}
