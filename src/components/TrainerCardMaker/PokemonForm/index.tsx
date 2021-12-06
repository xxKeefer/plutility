import { Empty, Form, Select } from 'antd'
import pokemon from 'pokemon'
import { useState } from 'react'

import { SelectOptions } from '../../../components'
import { debounce, scrollToFirstError } from '../../../utils'

interface PokemonFormFields {
    pokemon: string
}

export const PokemonForm = () => {
    const [form] = Form.useForm<PokemonFormFields>()
    const [filteredNames, setFilteredNames] = useState<string[]>([])
    // const [selectedPokemon, setSelectedPokemon] = useState<string[]>([])

    const onSubmit = (data: PokemonFormFields) => {
        return console.log({ data })
    }

    const onSearch = debounce(async (search: string) => {
        if (search.length < 3) return
        setFilteredNames(
            pokemon.all().filter((poke) => poke.indexOf(search) === -1)
        )
    })

    const createOpts = (opt: string) => (
        <Select.Option key={opt} value={opt}>
            <span>{opt}</span>
        </Select.Option>
    )

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            onFinishFailed={(args) => scrollToFirstError(args, form)}
            initialValues={undefined}
        >
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: 'Please specify pokemon',
                    },
                ]}
                label="Pokemon"
                name="pokemon"
            >
                <Select
                    labelInValue
                    optionLabelProp="title"
                    notFoundContent={
                        <Empty description="Start typing to search for a pokemon" />
                    }
                    showSearch
                    allowClear
                    onClear={() => undefined}
                    onSearch={onSearch}
                    filterOption={(input, option) => {
                        if (!option) return false
                        console.log({ input, option })

                        return (
                            option.title
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        )
                    }}
                    // onChange={(_, option) =>
                    //     setSelectedPokemon([...selectedPokemon, option.values])
                    // }
                    onChange={(value, options) =>
                        console.log({ value, options })
                    }
                    onSelect={(value, option) => console.log({ value, option })}
                >
                    <SelectOptions<string>
                        options={filteredNames}
                        createOpts={createOpts}
                    />
                </Select>
            </Form.Item>
        </Form>
    )
}

export default PokemonForm
