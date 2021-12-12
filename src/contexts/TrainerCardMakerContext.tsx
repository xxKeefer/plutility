import React, { createContext, useContext, useEffect, useState } from 'react'

import { NamedPokemon } from '~/types'

const TCMContext = createContext<
    [NamedPokemon[], React.Dispatch<React.SetStateAction<NamedPokemon[]>>]
>([[], () => {}])

function TCMProvider({ children }: { children: JSX.Element }) {
    const [team, setTeam] = useState<NamedPokemon[]>([])

    useEffect(() => {
        console.log({ team })
    }, [team])

    return <TCMContext.Provider value={[team, setTeam]}>{children}</TCMContext.Provider>
}

function useTCM() {
    const context = useContext(TCMContext)

    if (context === undefined) {
        throw new Error('useTCM must be used within a TCMProvider')
    }

    const [team, setTeam] = context
    return { team, setTeam }
}

export { TCMProvider, useTCM }
