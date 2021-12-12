import { TYPE_COLOR } from '~/types'

export const typeColour = (type: string) =>
    TYPE_COLOR[type.toUpperCase() as keyof typeof TYPE_COLOR]
