import { Col, Row } from 'antd'

import { useTCM } from '~/contexts'

import PokePanel from './PokePanel'

export const TeamDisplay = () => {
    const {
        data: { team },
    } = useTCM()
    return (
        <Row justify="center">
            {team.map((slot) => (
                <Col key={slot.pokemon.id} style={{ display: 'flex' }}>
                    <PokePanel slot={slot} />
                </Col>
            ))}
        </Row>
    )
}

export default TeamDisplay
