import styled from 'styled-components'

type PlacementProps = {
    top?: number
    left?: number
}
export const Placement = styled.div<PlacementProps>`
    position: absolute;
    top: ${(props) => props.top ?? 0}px;
    left: ${(props) => props.left ?? 0}px;
`
