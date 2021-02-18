import styled from 'styled-components'

import {
  Layout,
  RoundIconButton,
  Text,
  theme,
  Title,
  inputStyle,
} from '@habx/ui-core'

export const DatePickerFakeInput = styled.div`
  ${inputStyle};

  position: relative;
  color: ${theme.textColor()};
  display: flex;
  align-items: center;
  padding: 0 12px;
  max-height: 48px;
  min-height: 48px;
`

export const DatePickerPanelContainer = styled(Layout)`
  box-shadow: ${theme.shadow()};
  border-radius: 4px;

  --layout-left-padding: 36px;
  --layout-right-padding: 36px;
  --layout-top-padding: 24px;
  --layout-bottom-padding: 24px;
`

export const DatePickerMonthsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 18px;
  grid-row-gap: 12px;
`

export const MonthContainer = styled.div``

export const MonthHeader = styled.div`
  display: flex;
  margin-bottom: 12px;
`

export const MonthHeaderLabel = styled(Title).attrs(() => ({
  type: 'regular',
}))`
  flex: 1 1 100%;
  text-align: center;
`

export const MonthHeaderNavigationButton = styled(RoundIconButton)`
  opacity: 0;
  pointer-events: none;

  &[data-active='true'] {
    opacity: 1;
    pointer-events: unset;
  }
`

export const MonthTable = styled.div``

export const MonthTableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  margin-bottom: 6px;
`

export const MonthTableHeaderCell = styled(Text).attrs(() => ({
  variation: 'title',
}))`
  text-align: center;
`

export const MonthTableContent = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
`

export const DayContainer = styled.button`
  border: none;
  offset: none;
  padding: 8px;

  color: var(--day-color);
  background-color: var(--day-background-color);

  --day-color: ${theme.textColor()};
  --day-background-color: transparent;

  &[data-state='disabled'] {
    --day-background-color: transparent;
    --day-color: ${theme.neutralColor(300, {
      gradient: 'withIntensityFading',
    })};
  }

  &[data-state='within-hover-range'] {
    --day-color: ${theme.color('primary', {
      variation: 'contrastText',
    })};
    --day-background-color: ${theme.color('primary', { variation: 'calmer' })};
  }

  &[data-state='selected'] {
    --day-color: ${theme.color('primary', {
      variation: 'contrastText',
    })};
    --day-background-color: ${theme.color('primary', { variation: 'calm' })};
  }

  &[data-state='selected-start-or-end'] {
    --day-color: ${theme.color('primary', {
      variation: 'contrastText',
    })};
    --day-background-color: ${theme.color('primary')};
  }
`
