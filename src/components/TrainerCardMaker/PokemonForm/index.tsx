import { Button, Empty, Form, Select } from 'antd'
import pokemon from 'pokemon'
import { useState } from 'react'

import { debounce } from '../../../utils'

interface PokemonFormFields {
    pokemon: string
}

export const PokemonForm = () => {
    const [form] = Form.useForm<PokemonFormFields>()
    const [filteredNames, setFilteredNames] = useState<string[]>([])
    const [selectedPokemon, setSelectedPokemon] = useState<string[]>([])

    const onSubmit = () => {
        return console.log({ selectedPokemon })
    }

    const onSearch = debounce((search: string) => {
        if (search.length < 3) return
        const names = pokemon
            .all()
            .filter(
                (poke) =>
                    poke.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )

        setFilteredNames(names)
    })

    return (
        <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item label="Pokemon" name="pokemon">
                <Select
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

                        return (
                            option.value
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        )
                    }}
                    options={filteredNames.map((name) => ({
                        label: name,
                        value: name,
                    }))}
                    onSelect={(value: any) => {
                        setSelectedPokemon([...selectedPokemon, value.label])
                        form.resetFields()
                    }}
                />
            </Form.Item>
            <Button onClick={form.submit} type="primary">
                Submit Team
            </Button>
            <Button onClick={() => setSelectedPokemon([])} type="ghost">
                Clear Team
            </Button>
        </Form>
    )
}

export default PokemonForm
