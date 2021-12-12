import { Col, Input, Row, Select, Space, Tag } from 'antd'
import { Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts'
import { useEffect, useState } from 'react'

import { useTCM } from '~/contexts'
import { NamedPokemon } from '~/types'
import { capitalize, debounce, typeColour } from '~/utils'

interface PokePanelProps {
    slot: NamedPokemon
}

export const PokePanel = ({ slot }: PokePanelProps) => {
    const [name, setName] = useState<string>(slot.pokemon.name)
    const [nickname, setNickname] = useState(slot.nickname)
    const [pokemon, setPokemon] = useState<Pokemon>()
    const [species, setSpecies] = useState<PokemonSpecies>()

    const { team, setTeam } = useTCM()

    const displayTypes = (types: Pokemon['types']) => {
        return types.map((type) => type.type.name.toUpperCase())
    }

    const makeVarietyLabel = (raw: string) => {
        const parts = raw.split('-')
        if (parts.length === 1) return 'Regular'

        return parts.slice(1).map(capitalize).join(' ')
    }

    useEffect(() => {
        ;(async () => {
            const pokeAPI = new PokemonClient()

            await pokeAPI
                .getPokemonByName(name.toLowerCase())
                .then((data) => setPokemon(data))
                .catch((error) => console.error(error))

            await pokeAPI
                .getPokemonSpeciesByName(name.toLowerCase().split('-')[0])
                .then((data) => setSpecies(data))
                .catch((error) => console.error(error))
        })()
    }, [name])

    useEffect(() => {
        if (!pokemon) return
        const filtered = team.filter((p) => p.pokemon.species.name !== pokemon.species.name)
        setTeam([...filtered, { nickname, pokemon }])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemon, nickname])

    useEffect(() => {
        console.log({ pokemon, species })
    }, [pokemon, species])

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
                        <img
                            src={pokemon?.sprites?.front_default ?? undefined}
                            alt={species?.name ?? ''}
                        />
                    </Col>
                </Row>
            </Col>
            <Col>
                <Space direction="vertical">
                    <Row align="middle" justify="start" gutter={8}>
                        <Col>
                            <Input
                                style={{ maxWidth: 135 }}
                                size="small"
                                bordered={false}
                                placeholder="Nickname"
                                defaultValue={nickname}
                                onChange={(e) => {
                                    debounce((e: any) => setNickname(e.target.value))(e)
                                }}
                            ></Input>
                        </Col>
                    </Row>
                    <Row align="middle" justify="start" gutter={8}>
                        <Col>{species?.id}</Col>
                        <Col>{capitalize(species?.name ?? '')}</Col>
                    </Row>

                    <Row align="middle" justify="start" gutter={8}>
                        <Col>
                            {pokemon?.types &&
                                displayTypes(pokemon?.types).map((type) => (
                                    <Tag color={typeColour(type)}>{type}</Tag>
                                ))}
                        </Col>
                    </Row>
                    <Row align="middle" justify="start" gutter={8}>
                        <Col>
                            {species?.varieties && species.varieties.length > 1 && (
                                <Select
                                    style={{ width: 135 }}
                                    size="small"
                                    loading={!species}
                                    options={species.varieties.map((form) => ({
                                        label: makeVarietyLabel(form.pokemon.name),
                                        value: form.pokemon.name,
                                    }))}
                                    defaultValue={
                                        species.varieties.find(
                                            (form) => form.pokemon.name === pokemon?.name
                                        )!.pokemon.name
                                    }
                                    onSelect={setName}
                                />
                            )}
                        </Col>
                    </Row>
                </Space>
            </Col>
        </Row>
    )
}

export default PokePanel
