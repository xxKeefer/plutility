import React, { createContext, useContext, useReducer } from 'react'

const TCMContext = createContext<[State, React.Dispatch<Action>]>([
    { selectedPokemon: [] },
    () => {},
])

interface State {
    selectedPokemon: string[]
}

type Action = {
    type: 'updateTeam'
    data: { team: string[] }
}

function tcmReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'updateTeam': {
            return { ...state, selectedPokemon: action.data.team }
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`)
        }
    }
}

function TCMProvider({ children }: { children: JSX.Element }) {
    const [state, dispatch] = useReducer(tcmReducer, {
        selectedPokemon: [],
    })

    return (
        <TCMContext.Provider value={[state, dispatch]}>
            {children}
        </TCMContext.Provider>
    )
}

function useTCM() {
    const context = useContext(TCMContext)

    if (context === undefined) {
        throw new Error('useTCM must be used within a TCMProvider')
    }

    const [{ selectedPokemon: team }, dispatch] = context
    const updateTeam = (team: string[]) =>
        dispatch({ type: 'updateTeam', data: { team } })
    return { team, updateTeam }
}

export { TCMProvider, useTCM }
