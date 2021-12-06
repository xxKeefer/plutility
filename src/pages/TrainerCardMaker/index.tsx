import { Col, Row } from 'antd'

import { PokemonForm } from '../../components'
import { TCMProvider } from '../../contexts'

const TrainerCardMaker = () => {
    return (
        <TCMProvider>
            <Row gutter={16} justify="center">
                <Col span={6}>
                    <div>
                        <header>Trainer Card Maker</header>
                        <PokemonForm />
                    </div>
                </Col>
            </Row>
        </TCMProvider>
    )
}

export default TrainerCardMaker
