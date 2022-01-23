import styled from 'styled-components'

type Props = {
    height: number
    width: number
}

export const Frame = styled.div<Props>`
    position: relative;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
`
