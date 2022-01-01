import { Col, Row } from 'antd'
import styled from 'styled-components'

import { PokemonForm, TeamDisplay, TrainerCard } from '~/components'
import { TCMProvider } from '~/contexts'
import { MainLayout } from '~/layout'

const FrameRow = styled(Row)`
    padding: 16px;
    max-width: 100%;
`

const TrainerCardMaker = () => {
    return (
        <MainLayout>
            <TCMProvider>
                <FrameRow gutter={16} align="middle" justify="center">
                    <Col>
                        <PokemonForm />
                        <TeamDisplay />
                        <TrainerCard />
                    </Col>
                </FrameRow>
            </TCMProvider>
        </MainLayout>
    )
}

export default TrainerCardMaker
