import { useTCM } from '~/contexts'

import PokePanel from './PokePanel'

export const TeamDisplay = () => {
    const { team } = useTCM()
    return (
        <div>
            {team.map((slot) => (
                <PokePanel key={slot.pokemon.id} slot={slot} />
            ))}
        </div>
    )
}

export default TeamDisplay
