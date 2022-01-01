import styled from 'styled-components'

interface TextProps {
    fontSize: number
}

export const PokeText = styled.p<TextProps>`
    font-family: 'Pocket Monk';
    font-size: ${(props) => props.fontSize}px;
`
