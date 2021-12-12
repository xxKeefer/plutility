import React, { createContext, useContext, useEffect, useState } from 'react'

import { NamedPokemon } from '~/types'

type Data = {
    team: NamedPokemon[]
    trainer: string | undefined
    teamName: string | undefined
}

type Actions = {
    setTeam: React.Dispatch<React.SetStateAction<NamedPokemon[]>>
    setTrainer: React.Dispatch<React.SetStateAction<string | undefined>>
    setTeamName: React.Dispatch<React.SetStateAction<string | undefined>>
}

type Context = { data: Data; actions: Actions }

const initial: Context = {
    actions: {
        setTeam: () => undefined,
        setTrainer: () => undefined,
        setTeamName: () => undefined,
    },
    data: { team: [], teamName: undefined, trainer: undefined },
}

const TCMContext = createContext<Context>(initial)

function TCMProvider({ children }: { children: JSX.Element }) {
    const [team, setTeam] = useState<NamedPokemon[]>([])
    const [trainer, setTrainer] = useState<string>()
    const [teamName, setTeamName] = useState<string>()

    const data: Data = { team, trainer, teamName }

    const actions: Actions = { setTeam, setTrainer, setTeamName }

    const context = { data, actions }

    useEffect(() => {
        console.log({ team })
    }, [team])

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
