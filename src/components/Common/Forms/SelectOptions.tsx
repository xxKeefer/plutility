interface SelectOptionsProps<DataType> {
    options: DataType[]
    createOpts: (opt: DataType) => JSX.Element
}

export const SelectOptions = <DataType extends unknown>({
    options,
    createOpts,
}: SelectOptionsProps<DataType>) => {
    return <>{options.map(createOpts)}</>
}

export default SelectOptions
