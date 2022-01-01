import { Button, Col, Empty, Form, Input, Row, Select } from 'antd'
import { PokemonClient } from 'pokenode-ts'
import { useState } from 'react'

import { useTCM } from '~/contexts'
import { SelectValue } from '~/types'
import { debounce, pokeNames } from '~/utils'

interface PokemonFormFields {
    pokemon: string
}

export const PokemonForm = () => {
    const { actions, data } = useTCM()

    const [form] = Form.useForm<PokemonFormFields>()
    const [filteredNames, setFilteredNames] = useState<string[]>([])

    const detect = (search: string) => {
        return (el: string) => el.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }

    const onSearch = debounce((search: string) => {
        if (search.length < 2) return
        const names = pokeNames.filter(detect(search))

        setFilteredNames(names)
    })

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ trainer: data.trainer, teamName: data.teamName }}
        >
            <Row justify="center" gutter={16}>
                <Col span={10}>
                    <Form.Item name="trainer">
                        <Input
                            placeholder="Trainer Name"
                            // defaultValue={data.trainer}
                            onChange={(e) => {
                                debounce((e: any) => actions.setTrainer(e.target.value), 1000)(e)
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item name="teamName">
                        <Input
                            placeholder="Team Name"
                            // defaultValue={data.teamName}
                            onChange={(e) => {
                                debounce((e: any) => actions.setTeamName(e.target.value), 1000)(e)
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={16}>
                    <Form.Item name="pokemon">
                        <Select
                            disabled={data.team.length >= 10}
                            placeholder="Start typing to search for a pokemon"
                            labelInValue
                            optionLabelProp="title"
                            notFoundContent={
                                <Empty description="Start typing to search for a pokemon" />
                            }
                            showSearch
                            allowClear
                            onSearch={onSearch}
                            filterOption={(input, option) => {
                                if (!option) return false

                                return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }}
                            options={filteredNames.map((name) => ({
                                label: name,
                                value: name,
                            }))}
                            onSelect={async (raw) => {
                                //antd types for select value is bugged, overriding this to fix
                                const { value } = raw as SelectValue
                                const pokeAPI = new PokemonClient()

                                await pokeAPI
                                    .getPokemonSpeciesByName(value.toLowerCase())
                                    .then((payload) => {
                                        actions.setPokemon([...data.pokemon, payload])
                                    })
                                    .catch((error) => console.error(error))

                                form.resetFields()
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Button
                        onClick={() => {
                            actions.setPokemon([])
                            actions.setTeam([])
                        }}
                        type="ghost"
                    >
                        Clear Team
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default PokemonForm
