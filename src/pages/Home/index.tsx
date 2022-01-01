import styled from 'styled-components'
import { GBText, PokeText } from '~/components'

import { MainLayout } from '~/layout'

const Center = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
`

const HomePage = () => {
    return (
        <Center>
            <PokeText fontSize={70}>PLUtility</PokeText>
            <h4 style={{ fontSize: 46 }}>A tool to help my friends run Pokemon Showdown leagues</h4>
            <GBText fontSize={20}>made with love by xxKeefer</GBText>
        </Center>
    )
}

export default HomePage
