import styled from 'styled-components'

interface TextProps {
    fontSize: number
    children: string
}

export const PokeText = ({ fontSize, children }: TextProps) => {
    const Text = styled.p`
        font-family: 'Pocket Monk';
        font-size: ${fontSize}px;
    `

    return <Text>{children}</Text>
}
