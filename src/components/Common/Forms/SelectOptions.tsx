import { Select } from 'antd'

interface SelectOptionsProps<DataType> {
    options: DataType[]
    createOpts: (
        opt: DataType,
        index: number
    ) => ReturnType<typeof Select.Option>
}

export const SelectOptions = <DataType extends unknown>({
    options,
    createOpts,
}: SelectOptionsProps<DataType>) => {
    return <>{options.map(createOpts)}</>
}

export default SelectOptions
