import { Col, Row } from 'antd'

import { useTCM } from '~/contexts'

import PokePanel from './PokePanel'

export const TeamDisplay = () => {
    const {
        data: { pokemon },
    } = useTCM()
    return (
        <Row justify="center" style={{ marginBottom: 16 }}>
            {pokemon.map((poke) => (
                <Col key={poke.id} style={{ display: 'flex' }}>
                    <PokePanel species={poke} />
                </Col>
            ))}
        </Row>
    )
}

export default TeamDisplay
