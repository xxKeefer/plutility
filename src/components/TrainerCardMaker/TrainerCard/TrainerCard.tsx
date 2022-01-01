import { Col, Row, Space, Tag } from 'antd'
import styled from 'styled-components'

import { Frame, GBText, Placement, PokeText } from '~/components'
import { useTCM } from '~/contexts'
import { TrainerCardBackground } from '~/style/media'
import { capitalize, displayTypes, typeColour } from '~/utils'

const Wrap = styled.div`
    display: flex;
    justify-content: center;
`

const Banner = styled.div`
    width: 540px;
    height: 120px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const PokemonDisplay = styled.div`
    width: 700px;
    height: 310px;
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

type Props = {
    ref: React.RefObject<HTMLDivElement>
}

export const TrainerCard = ({ ref }: Props) => {
    const { data } = useTCM()
    const title = `${data.trainer}'s ${data.teamName}`

    const titleSize = title.length <= 25 ? 46 : 36
    console.log(titleSize)

    return (
        <Wrap>
            <Frame ref={ref} style={{ minWidth: '800px' }}>
                <Placement>
                    <TrainerCardBackground />
                </Placement>
                {(!!data.trainer || !!data.teamName) && (
                    <Placement top={42} left={220}>
                        <Banner>
                            <Row gutter={[0, 0]}>
                                <Col span={24}>
                                    <PokeText fontSize={titleSize}>{title}</PokeText>
                                </Col>
                            </Row>
                        </Banner>
                    </Placement>
                )}
                <Placement top={115} left={65}>
                    <PokemonDisplay>
                        <Row align="top" justify="center" gutter={[0, 0]}>
                            {data.team.map((p) => (
                                <Col style={{ width: '20%' }}>
                                    <Row align="middle" justify="center" gutter={0}>
                                        <Space direction="vertical" align="center" size={0}>
                                            <Col>
                                                <img
                                                    style={{ maxHeight: 83 }}
                                                    src={
                                                        p.pokemon?.sprites?.front_default ??
                                                        undefined
                                                    }
                                                    alt={p.pokemon.species?.name ?? ''}
                                                />
                                            </Col>
                                            <Col>
                                                {p.pokemon.types &&
                                                    displayTypes(p.pokemon.types).map((type) => (
                                                        <SmallTag color={typeColour(type)}>
                                                            {type}
                                                        </SmallTag>
                                                    ))}
                                            </Col>
                                            <Col>
                                                <GBText fontSize={10}>
                                                    {capitalize(p.pokemon.species.name ?? '')}
                                                </GBText>
                                            </Col>
                                            <Col>
                                                <GBText
                                                    fontSize={
                                                        (p.nickname?.length ?? 0) <= 13 ? 13 : 10
                                                    }
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
                </Placement>
            </Frame>
        </Wrap>
    )
}
