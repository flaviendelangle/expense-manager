import styled from 'styled-components'

export const UpsertExpenseFormSubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 36px;

  & > * {
    min-width: 0;
  }
`

export const RefundToggleContainer = styled.div`
  margin: 24px 0 12px 0;
`
