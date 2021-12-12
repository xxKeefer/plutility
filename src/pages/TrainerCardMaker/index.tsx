import { Col, Row } from 'antd'

import { PokemonForm, TeamDisplay, TrainerCard } from '~/components'
import { TCMProvider } from '~/contexts'

const TrainerCardMaker = () => {
    return (
        <TCMProvider>
            <Row gutter={16} align="middle" justify="center">
                <Col md={20} xl={12}>
                    <TrainerCard />
                </Col>
                <Col md={20} xl={12}>
                    {/* <header>Trainer Card Maker</header> */}
                    <PokemonForm />
                    <TeamDisplay />
                </Col>
            </Row>
        </TCMProvider>
    )
}

export default TrainerCardMaker
