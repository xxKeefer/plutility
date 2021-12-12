import { Col, Row } from 'antd'

import { PokemonForm, TeamDisplay } from '~/components'
import { TCMProvider } from '~/contexts'

const TrainerCardMaker = () => {
    return (
        <TCMProvider>
            <Row gutter={16} justify="center">
                <Col span={6}>
                    <header>Trainer Card Maker</header>
                    <PokemonForm />
                    <TeamDisplay />
                </Col>
            </Row>
        </TCMProvider>
    )
}

export default TrainerCardMaker
