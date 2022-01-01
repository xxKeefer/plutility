import { Button, Col, Input, Row, Select, Skeleton, Space, Spin, Tag } from 'antd'
import { Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import styled from 'styled-components'

import { useTCM } from '~/contexts'
import { SelectValue } from '~/types'
// import { NamedPokemon } from '~/types'
import { capitalize, debounce, typeColour } from '~/utils'

interface PokePanelProps {
    species: PokemonSpecies
}

const Del = styled(Button)`
    padding: 3px;
    svg {
        margin-top: 4px;
        display: inline;
        vertical-align: baseline;
    }
`

export const PokePanel = ({ species }: PokePanelProps) => {
    const [name, setName] = useState<string>(species.varieties[0].pokemon.name)
    const [nickname, setNickname] = useState('')
    const [pokemon, setPokemon] = useState<Pokemon>()
    const [loading, setLoading] = useState(true)

    const { actions, data } = useTCM()

    const displayTypes = (types: Pokemon['types']) => {
        return types.map((type) => type.type.name.toUpperCase())
    }

    const makeVarietyLabel = (raw: string) => {
        const parts = raw.split('-')
        if (parts.length === 1) return 'Regular'

        return parts.slice(1).map(capitalize).join(' ')
    }

    useEffect(() => {
        console.log({ name })

        ;(async () => {
            const pokeAPI = new PokemonClient()
            setLoading(true)
            await pokeAPI
                .getPokemonByName(name)
                .then((data) => setPokemon(data))
                .catch((error) => console.error(error))
            setLoading(false)
        })()
    }, [name])

    useEffect(() => {
        if (!pokemon) return
        // console.log({ team: data.team, pokemon })

        const filtered = data.team.filter((p) => p.pokemon.species.name !== pokemon.species.name)
        actions.setTeam([...filtered, { nickname, pokemon }])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemon, nickname])

    // useEffect(() => {
    //     console.log({ pokemon, species })
    // }, [pokemon, species])

    return (
        <Row
            align="middle"
            justify="start"
            gutter={8}
            style={{ border: '1px solid gray', margin: 2, padding: 2 }}
        >
            <Col>
                <Row align="middle" justify="center" gutter={8}>
                    <Col>
                        {loading ? (
                            <Spin size="large" spinning />
                        ) : (
                            <img
                                src={pokemon?.sprites?.front_default ?? undefined}
                                alt={species?.name ?? ''}
                            />
                        )}
                    </Col>
                </Row>
            </Col>
            <Col>
                <Space direction="vertical">
                    <Row align="middle" justify="start" gutter={8}>
                        <Col span={20}>
                            {loading ? (
                                <Skeleton.Input size="small" active style={{ width: 135 }} />
                            ) : (
                                <Input
                                    style={{ maxWidth: 135 }}
                                    size="small"
                                    bordered={false}
                                    placeholder="Nickname"
                                    defaultValue={nickname}
                                    onChange={(e) => {
                                        debounce((e: any) => setNickname(e.target.value), 1000)(e)
                                    }}
                                />
                            )}
                        </Col>
                        <Col span={4}>
                            <Del
                                type="primary"
                                shape="circle"
                                icon={<MdCancel />}
                                size="small"
                                onClick={() => {
                                    if (!pokemon) return
                                    const _team = data.team.filter((p) => p.pokemon.name !== name)
                                    const _pokemon = data.pokemon.filter(
                                        (p) => name.indexOf(p.name.toLowerCase()) < 0
                                    )
                                    actions.setTeam([..._team])
                                    actions.setPokemon([..._pokemon])
                                }}
                            />
                        </Col>
                    </Row>
                    <Row align="middle" justify="start" gutter={8}>
                        <Col>
                            {loading ? (
                                <Skeleton.Input size="small" style={{ width: 40 }} active />
                            ) : (
                                species?.id
                            )}
                        </Col>
                        <Col>
                            {loading ? (
                                <Skeleton.Input size="small" style={{ width: 80 }} active />
                            ) : (
                                capitalize(species?.name ?? '')
                            )}
                        </Col>
                    </Row>

                    <Row align="middle" justify="start" gutter={8}>
                        <Col>
                            {pokemon?.types &&
                                displayTypes(pokemon?.types).map((type) =>
                                    loading ? (
                                        <Skeleton.Input
                                            key={type}
                                            size="small"
                                            style={{ width: 40 }}
                                            active
                                        />
                                    ) : (
                                        <Tag key={type} color={typeColour(type)}>
                                            {type}
                                        </Tag>
                                    )
                                )}
                        </Col>
                    </Row>
                    <Row align="middle" justify="start" gutter={8}>
                        <Col>
                            {loading ? (
                                <Skeleton.Input size="small" style={{ width: 135 }} active />
                            ) : (
                                species?.varieties &&
                                species.varieties.length > 1 && (
                                    <Select
                                        style={{ width: 135 }}
                                        size="small"
                                        loading={!species}
                                        options={species.varieties.map((form) => ({
                                            label: makeVarietyLabel(form.pokemon.name),
                                            value: form.pokemon.name,
                                        }))}
                                        defaultValue={species.varieties[0].pokemon.name}
                                        // onSelect={setName}
                                        onSelect={(raw) => {
                                            //antd types for select value is bugged, overriding this to fix
                                            const { value } = raw as SelectValue
                                            setName(value)
                                        }}
                                    />
                                )
                            )}
                        </Col>
                    </Row>
                </Space>
            </Col>
        </Row>
    )
}

export default PokePanel
