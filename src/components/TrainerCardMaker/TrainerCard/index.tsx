import { Col, Row, Space, Tag } from 'antd'
import styled from 'styled-components'

import { useTCM } from '~/contexts'
import { TrainerCardBackground } from '~/style/media'
import { capitalize, displayTypes, typeColour } from '~/utils'

const Banner = styled.div`
    width: 540px;
    height: 120px;
    position: absolute;
    top: 42px;
    left: 220px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const PokemonDisplay = styled.div`
    width: 700px;
    height: 310px;
    position: absolute;
    top: 115px;
    left: 65px;
`

const SmallTag = styled(Tag)`
    font-family: 'Roboto';
    color: white;
    font-size: 8px;
    line-height: 10px;
    border-radius: 2px;
    padding-top: 1px;
    border: none;
`

interface TextProps {
    fontSize: number
    children: string
}
const GBText = ({ fontSize, children }: TextProps) => {
    const Text = styled.p`
        font-family: 'PKMN';
        font-size: ${fontSize}px;
    `

    return <Text>{children}</Text>
}
const PokeText = ({ fontSize, children }: TextProps) => {
    const Text = styled.p`
        font-family: 'Pocket Monk';
        font-size: ${fontSize}px;
    `

    return <Text>{children}</Text>
}

export const TrainerCard = () => {
    const { data } = useTCM()
    const title = `${data.trainer}'s ${data.teamName}`

    const titleSize = title.length <= 25 ? 46 : 36
    console.log(titleSize)

    return (
        <div style={{ position: 'relative' }}>
            <TrainerCardBackground />
            {(!!data.trainer || !!data.teamName) && (
                <Banner>
                    <Row gutter={[0, 0]}>
                        <Col span={24}>
                            <PokeText fontSize={titleSize}>{title}</PokeText>
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
                                            style={{ maxHeight: 83 }}
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
                                        <GBText fontSize={10}>
                                            {capitalize(p.pokemon.name ?? '')}
                                        </GBText>
                                    </Col>
                                    <Col>
                                        <GBText
                                            fontSize={(p.nickname?.length ?? 0) <= 13 ? 13 : 10}
                                        >
                                            {capitalize(p.nickname ?? '')}
                                        </GBText>
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
