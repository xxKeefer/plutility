import { Button, Col, Form, Input, Row } from 'antd'
import { PokemonClient } from 'pokenode-ts'

import { PokeSelect } from '~/components'
import { useTCM } from '~/contexts'
import { debounce } from '~/utils'

interface PokemonFormFields {
    pokemon: string
}

export const PokemonForm = () => {
    const { actions, data } = useTCM()

    const [form] = Form.useForm<PokemonFormFields>()

    const pokeAPI = new PokemonClient()

    const onSelect = async (value: string) => {
        await pokeAPI
            .getPokemonSpeciesByName(value.toLowerCase())
            .then((payload) => {
                actions.setPokemon([...data.pokemon, payload])
            })
            .catch((error) => console.error(error))
    }

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
                            onChange={(e) => {
                                debounce((e: any) => actions.setTeamName(e.target.value), 1000)(e)
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={16}>
                    <PokeSelect<PokemonFormFields>
                        disabled={data.team.length >= 10}
                        form={form}
                        onSelect={onSelect}
                    />
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
