import { Col, Row } from 'antd'

import { PokemonForm } from '../../components'

const TrainerCardMaker = () => {
    return (
        <Row gutter={16} justify="center">
            <Col span={6}>
                <div>
                    <header>Trainer Card Maker</header>
                    <PokemonForm />
                </div>
            </Col>
        </Row>
    )
}

export default TrainerCardMaker
