import * as React from 'react'

const DARK_MODE_KEY = 'darkMode'

type ThemePreset = 'light' | 'dark'

const getInitialValue = (): ThemePreset => {
  try {
    const item = window.localStorage.getItem(DARK_MODE_KEY)

    if (item != null) {
      return item === 'dark' ? 'dark' : 'light'
    }
  } catch {} // eslint-disable-line no-empty

  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

const ThemePresetContext = React.createContext<
  readonly [ThemePreset, (value: ThemePreset) => void]
>(['light', () => {}])

export const ThemePresetProvider: React.FunctionComponent<ThemePresetProviderProps> = ({
  children,
}) => {
  const [themePreset, setThemePreset] = React.useState(getInitialValue)

  const handleDarkModeChange = React.useCallback((value: ThemePreset) => {
    setThemePreset(value)

    try {
      localStorage.setItem(DARK_MODE_KEY, value)
      setThemePreset(value)
    } catch {} // eslint-disable-line no-empty
  }, [])

  const context = React.useMemo(
    () => [themePreset, handleDarkModeChange] as const,
    [handleDarkModeChange, themePreset]
  )

  return (
    <ThemePresetContext.Provider value={context}>
      {children(themePreset)}
    </ThemePresetContext.Provider>
  )
}

interface ThemePresetProviderProps {
  children: (preset: ThemePreset) => React.ReactNode
}

export const useThemePreset = () => React.useContext(ThemePresetContext)
