import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavBarLinkContainer = styled(Link)`
  &[data-bottom='true'] {
    margin-top: auto;
  }

  &[data-bottom='true'] + [data-bottom='true'] {
    margin-top: initial;
  }
`
