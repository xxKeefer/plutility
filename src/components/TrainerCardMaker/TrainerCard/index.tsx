import { Col, Row, Space, Tag } from 'antd'
import styled from 'styled-components'

import { useTCM } from '~/contexts'
import { TrainerCardBackground } from '~/style/media'
import { capitalize, displayTypes, typeColour } from '~/utils'

const Banner = styled.div`
    // border: 2px solid magenta;
    width: 540px;
    height: 50px;
    position: absolute;
    top: 42px;
    left: 220px;
    text-align: right;
`

const PokemonDisplay = styled.div`
    width: 700px;
    height: 310px;
    position: absolute;
    top: 110px;
    left: 65px;
`
const PokeName = styled.h1`
    font-family: 'PKMN';
    font-size: 10px;
`
const PokeNickname = styled.h2`
    font-family: 'PKMN';
    font-size: 13px;
`
const PokeBanner = styled.p`
    font-family: 'Pocket Monk';
    font-size: 46px;
`

const SmallTag = styled(Tag)`
    font-size: 8px;
    line-height: 10px;
    border-radius: 2px;
    padding-top: 1px;
`

export const TrainerCard = () => {
    const { data } = useTCM()
    return (
        <div style={{ position: 'relative' }}>
            <TrainerCardBackground />
            {(!!data.trainer || !!data.teamName) && (
                <Banner>
                    <Row gutter={[0, 0]}>
                        <Col span={24}>
                            <PokeBanner>
                                {data.trainer}'s {data.teamName}
                            </PokeBanner>
                        </Col>
                    </Row>
                </Banner>
            )}
            <PokemonDisplay>
                <Row align="top" justify="center" gutter={[0, 0]}>
                    {data.team.map((p) => (
                        <Col style={{ width: '20%' }}>
                            <Row align="middle" justify="center" gutter={0}>
                                <Space direction="vertical" align="center" size={0}>
                                    <Col>
                                        <img
                                            style={{ maxHeight: 90 }}
                                            src={p.pokemon?.sprites?.front_default ?? undefined}
                                            alt={p.pokemon.species?.name ?? ''}
                                        />
                                    </Col>
                                    <Col>
                                        {p.pokemon.types &&
                                            displayTypes(p.pokemon.types).map((type) => (
                                                <SmallTag color={typeColour(type)}>{type}</SmallTag>
                                            ))}
                                    </Col>
                                    <Col>
                                        <PokeName>{capitalize(p.pokemon.name ?? '')}</PokeName>
                                    </Col>
                                    <Col>
                                        <PokeNickname>{capitalize(p.nickname ?? '')}</PokeNickname>
                                    </Col>
                                </Space>
                            </Row>
                        </Col>
                    ))}
                </Row>
            </PokemonDisplay>
        </div>
    )
}
