import { Empty, Form, FormInstance, Select } from 'antd'
import { useState } from 'react'

import { SelectValue } from '~/types'
import { debounce, pokeNames } from '~/utils'

type Props<FormType extends unknown> = {
    disabled?: boolean
    form: FormInstance<FormType>
    onSelect: (pokemonName: string) => Promise<void>
}

export const PokeSelect = <FormShape extends unknown>({
    disabled,
    form,
    onSelect,
}: Props<FormShape>) => {
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
        <Form.Item name="pokemon">
            <Select
                disabled={disabled ?? false}
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
                onSelect={async (raw) => {
                    //antd types for select value is bugged, overriding this to fix
                    const { value } = raw as SelectValue
                    await onSelect(value)
                    form.resetFields()
                }}
            />
        </Form.Item>
    )
}
