import { Button, Empty, Form, Select } from 'antd'
import pokemon from 'pokemon'
import { PokemonClient } from 'pokenode-ts'
import { useState } from 'react'

import { useTCM } from '~/contexts'
import { SelectValue } from '~/types'
import { debounce } from '~/utils'

interface PokemonFormFields {
    pokemon: string
}

export const PokemonForm = () => {
    const { team, setTeam } = useTCM()

    const [form] = Form.useForm<PokemonFormFields>()
    const [filteredNames, setFilteredNames] = useState<string[]>([])

    const onSubmit = () => {
        return console.log({ team })
    }

    const onSearch = debounce((search: string) => {
        if (search.length < 2) return
        const names = pokemon
            .all()
            .filter((poke) => poke.toLowerCase().indexOf(search.toLowerCase()) !== -1)

        setFilteredNames(names)
    })

    return (
        <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item label="Pokemon" name="pokemon">
                <Select
                    placeholder="Start typing to search for a pokemon"
                    labelInValue
                    optionLabelProp="title"
                    notFoundContent={<Empty description="Start typing to search for a pokemon" />}
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
                    onSelect={async ({ value }: SelectValue) => {
                        const pokeAPI = new PokemonClient()

                        await pokeAPI
                            .getPokemonByName(value.toLowerCase())
                            .then((data) => setTeam([...team, { pokemon: data }]))
                            .catch((error) => console.error(error))

                        form.resetFields()
                    }}
                />
            </Form.Item>
            <Button onClick={form.submit} type="primary">
                Submit Team
            </Button>
            <Button onClick={() => setTeam([])} type="ghost">
                Clear Team
            </Button>
        </Form>
    )
}

export default PokemonForm
