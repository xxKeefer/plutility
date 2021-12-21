import { Col, Row } from 'antd'

import { useTCM } from '~/contexts'

import PokePanel from './PokePanel'

export const TeamDisplay = () => {
    const {
        data: { pokemon },
    } = useTCM()
    return (
        <Row justify="center">
            {pokemon.map((poke) => (
                <Col key={poke.name} style={{ display: 'flex' }}>
                    <PokePanel species={poke} />
                </Col>
            ))}
        </Row>
    )
}

export default TeamDisplay
