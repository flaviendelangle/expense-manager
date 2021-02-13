import { Theme } from '@nivo/core'
import * as React from 'react'

import {
  stringifyColor,
  useThemeVariant,
  useCurrentBackground,
  isColorDark,
  palette,
} from '@habx/ui-core'

interface NivoCustomization {
  theme: Theme
  colors: string[]
}

export const useNivoCustomization = () => {
  const background = useCurrentBackground()
  const themeVariant = useThemeVariant()

  return React.useMemo<NivoCustomization>(() => {
    const theme: Theme = {
      textColor: stringifyColor(themeVariant.typography.colors.text),
      tooltip: {
        container: {
          backgroundColor: stringifyColor(background),
        },
      },
      labels: {
        text: {
          color: 'green',
        },
      },
    }

    let colors: string[]

    if (isColorDark(background)) {
      colors = [
        palette.greenEmerald[700],
        palette.redRazzmatazz[700],
        palette.greenNorthernLight[800],
        palette.blueMoon[700],
        palette.purpleDawn[700],
      ]
    } else {
      colors = [
        palette.greenEmerald[400],
        palette.redRazzmatazz[400],
        palette.greenNorthernLight[400],
        palette.blueMoon[400],
        palette.purpleDawn[400],
      ]
    }

    return {
      theme,
      colors,
      labelTextColor: stringifyColor(themeVariant.typography.colors.text),
    }
  }, [themeVariant, background])
}
