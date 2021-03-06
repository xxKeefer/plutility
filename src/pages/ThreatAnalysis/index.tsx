import { Form, Skeleton, Table, TableColumnProps, Tag } from 'antd'
import { Move, MoveClient, Pokemon, PokemonClient } from 'pokenode-ts'
import Queue from 'queue-promise'
import React from 'react'
import styled from 'styled-components'

import { PokeSelect } from '~/components'
import { typeColour } from '~/utils'

const TypeTag = styled(Tag)`
    font-family: 'Roboto';
    color: white;
    border-radius: 2px;
    padding-top: 1px;
    border: none;
`
const Faded = styled.span`
    color: #ccc;
    font-family: 'Roboto';
`

const TableTitle = styled.span`
    font-family: 'Roboto';
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
`

const ThreatAnalysis = () => {
    const [form] = Form.useForm<any>()

    const [threats, setThreats] = React.useState<Move[]>([])
    const [pokemon, setPokemon] = React.useState<Pokemon>()
    const [loading, setLoading] = React.useState(false)

    const pokeAPI = new PokemonClient()
    const moveApi = new MoveClient()

    // split string on "-" make elements title case
    const titleCase = (str: string) => {
        return str
            .split('-')
            .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1)
            })
            .join(' ')
    }

    const determineAttack = (pokemon?: Pokemon): 'physical' | 'mixed' | 'special' | 'unknown' => {
        if (!pokemon) return 'unknown'
        const att = pokemon.stats.find((s) => s.stat.name === 'attack')
        const spa = pokemon.stats.find((s) => s.stat.name === 'special-attack')
        if (!att || !spa) return 'unknown'
        if (att.base_stat === spa.base_stat) return 'mixed'
        return att.base_stat > spa.base_stat ? 'physical' : 'special'
    }

    const determineDefense = (pokemon?: Pokemon): 'physical' | 'mixed' | 'special' | 'unknown' => {
        if (!pokemon) return 'unknown'
        const def = pokemon.stats.find((s) => s.stat.name === 'defense')
        const spd = pokemon.stats.find((s) => s.stat.name === 'special-defense')
        if (!def || !spd) return 'unknown'
        if (def.base_stat === spd.base_stat) return 'mixed'
        return def.base_stat > spd.base_stat ? 'physical' : 'special'
    }

    const META_MOVES = ['acrobatics']

    const onSelect = async (value: string) => {
        let scaryMoves: Move[] = []
        await pokeAPI
            .getPokemonByName(value.toLowerCase())
            .then((payload) => {
                setPokemon(payload)
                console.log(payload)

                const hasSkillLink = payload.abilities
                    .map((entry) => entry.ability.name)
                    .includes('skill-link')
                const queue = new Queue({ concurrent: 5, interval: 1000 })

                queue.on('start', () => setLoading(true))
                queue.on('stop', () => setLoading(false))

                queue.on('resolve', (move: Move) => {
                    if (!move.accuracy || !move.power) return
                    if (META_MOVES.includes(move.name)) return scaryMoves.push(move)
                    if (move.priority >= 1) return scaryMoves.push(move)
                    if (hasSkillLink && !!move.meta?.min_hits) return scaryMoves.push(move)
                    if (move.accuracy < 80) return
                    if (move.power < 80) return
                    return scaryMoves.push(move)
                })
                queue.on('reject', (error) => console.error(error))
                queue.on('end', () => {
                    console.log(scaryMoves)

                    setThreats([...scaryMoves])
                })

                payload.moves.forEach((moveSet) => {
                    queue.add(() => moveApi.getMoveByName(moveSet.move.name))
                })
            })
            .catch((error) => console.error(error))
    }

    const columns: TableColumnProps<Move>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text) => titleCase(text),
        },
        {
            title: 'Power',
            dataIndex: 'power',
            sorter: (a, b) => (a.power ?? 0) - (b.power ?? 0),
        },
        {
            title: 'Accuracy',
            dataIndex: 'accuracy',
            sorter: (a, b) => (a.accuracy ?? 0) - (b.accuracy ?? 0),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.name.localeCompare(b.type.name),
            render: (_, move) => {
                const stab = pokemon?.types.map((entry) => entry.type.name).includes(move.type.name)
                const type = move.type.name.toLocaleUpperCase()

                return (
                    <>
                        <TypeTag color={typeColour(type)}>{type}</TypeTag>
                        {stab && <Faded>(STAB)</Faded>}
                    </>
                )
            },
        },

        {
            title: 'Priority',
            dataIndex: 'priority',
            sorter: (a, b) => (a.priority ?? 0) - (b.priority ?? 0),
        },
        {
            title: 'Damage',
            dataIndex: 'damage_class',
            render: (_, move) => <span>{titleCase(move?.damage_class?.name ?? '')}</span>,
            sorter: (a, b) =>
                (a.damage_class?.name ?? '').localeCompare(b.damage_class?.name ?? ''),
        },
        {
            title: 'Notes',
            dataIndex: 'flavor_text_entries',
            render: (_, move) => {
                const desc = move.flavor_text_entries.find((entry) => entry.language.name === 'en')
                return <span>{desc?.flavor_text ?? ''}</span>
            },
        },
        {
            title: 'Hits',
            dataIndex: 'meta',
            render: (_, move) => {
                if (!move.meta?.min_hits) return <span>No Skill Link</span>
                return (
                    <span>
                        {move.meta.min_hits} - {move.meta.max_hits}
                    </span>
                )
            },
        },
    ]
    return (
        <Form form={form} layout="vertical">
            <PokeSelect<any> form={form} onSelect={onSelect} />
            <Skeleton active loading={loading}>
                <Table
                    title={() => {
                        if (!pokemon) return <TableTitle>Search for a pokemon above.</TableTitle>
                        return (
                            <TableTitle>
                                {`${pokemon?.name} is a ${determineAttack(
                                    pokemon
                                )} attacker and a ${determineDefense(pokemon)} defender.`}
                            </TableTitle>
                        )
                    }}
                    columns={columns}
                    dataSource={threats}
                />
            </Skeleton>
        </Form>
    )
}

export default ThreatAnalysis
