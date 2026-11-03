import {Theme} from "@mui/material/styles";

export class AiUtils {

    public static transformToAiTheme(theme: Theme) {

        if (theme == null) {
            return undefined;
        }
        return {
            typography: Object.fromEntries(
                Object.entries(theme.typography).filter(
                    ([key, value]) => typeof value !== 'function' && key !== 'ic3'
                )
            ),
            palette: {
                primaryText: theme.palette.text.primary,
                secondaryText: theme.palette.text.secondary,
                disabledText: theme.palette.text.disabled,
                primary: theme.palette.primary.main,
                secondary: theme.palette.secondary.main,
                error: theme.palette.error.main,
                warning: theme.palette.warning.main,
                info: theme.palette.info.main,
                selected: theme.palette.ic3.selected,
                selectedText: theme.palette.ic3.selectedText,
                background: theme.palette.background.default,
                backgroundPaper: theme.palette.background.paper,
            },
            chartPalette: {
                ...theme.palette.ic3.chartPalettes
            }
        }
    }

}