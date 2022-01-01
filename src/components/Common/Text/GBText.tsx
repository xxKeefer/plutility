import styled from 'styled-components'

interface TextProps {
    fontSize: number
    children: string
}

export const GBText = ({ fontSize, children }: TextProps) => {
    const Text = styled.p`
        font-family: 'PKMN';
        font-size: ${fontSize}px;
    `

    return <Text>{children}</Text>
}
