import { Pokemon } from 'pokenode-ts'

export const displayTypes = (types: Pokemon['types']) => {
    return types.map((type) => type.type.name.toUpperCase())
}
