import { PokemonSpecies } from 'pokenode-ts'
import React, { createContext, useContext, useState } from 'react'

import { NamedPokemon } from '~/types'

type Data = {
    pokemon: PokemonSpecies[]
    team: NamedPokemon[]
    trainer: string | undefined
    teamName: string | undefined
}

type Actions = {
    setPokemon: React.Dispatch<React.SetStateAction<PokemonSpecies[]>>
    setTeam: React.Dispatch<React.SetStateAction<NamedPokemon[]>>
    setTrainer: React.Dispatch<React.SetStateAction<string | undefined>>
    setTeamName: React.Dispatch<React.SetStateAction<string | undefined>>
}

type Context = { data: Data; actions: Actions }

const initial: Context = {
    actions: {
        setPokemon: () => undefined,
        setTeam: () => undefined,
        setTrainer: () => undefined,
        setTeamName: () => undefined,
    },
    data: { pokemon: [], team: [], teamName: undefined, trainer: undefined },
}

const TCMContext = createContext<Context>(initial)

function TCMProvider({ children }: { children: JSX.Element }) {
    const [pokemon, setPokemon] = useState<PokemonSpecies[]>([])
    const [team, setTeam] = useState<NamedPokemon[]>([])
    const [trainer, setTrainer] = useState<string>()
    const [teamName, setTeamName] = useState<string>()

    const data: Data = { pokemon, team, trainer, teamName }

    const actions: Actions = { setPokemon, setTeam, setTrainer, setTeamName }

    const context = { data, actions }

    return <TCMContext.Provider value={context}>{children}</TCMContext.Provider>
}

function useTCM() {
    const context = useContext(TCMContext)

    if (context === undefined) {
        throw new Error('useTCM must be used within a TCMProvider')
    }

    return context
}

export { TCMProvider, useTCM }
