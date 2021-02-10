import styled from 'styled-components'

export const HomeContent = styled.div`
  --card-height: 480px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: var(--card-height);
  grid-row-gap: 24px;
  grid-column-gap: 36px;
`

export const HomeCardContent = styled.div`
  height: calc(var(--card-height) - 60px);
  padding: 24px;
`
