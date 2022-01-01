import styled from 'styled-components'

interface TextProps {
    fontSize: number
}

export const GBText = styled.p<TextProps>`
    font-family: 'PKMN';
    font-size: ${(props) => props.fontSize}px;
`
