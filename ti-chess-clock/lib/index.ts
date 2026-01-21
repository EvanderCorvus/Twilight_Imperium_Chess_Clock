export interface Player {
    seatingID: number
    name: string,
    faction: string,
    timeRemaining: number,
    isPassed: boolean,
    strategyCard?: number 

}


export interface GameState{
    // maybe use ids instead of objects?
    players: Player[]
    turnOrder?: Player[]
    activePlayer: Player 
    speaker?: Player
    isPaused: boolean
    phase: "strategy" | "action" | "agenda" | "status"
}

export const Factions = [
     "The Federation of Sol"
    , "The Arborec"
    , "The Barony of Letnev"
    , "The Clan of Saar"
    , "The Embers of Muaat"
    , "The Emirates of Hacan"
    , "The Ghosts of Creuss"
    , "The L1Z1X Mindnet"
    , "The Mentak Coalition"
    , "The Naalu Collective"
    , "The Nekro Virus"
    , "Sardakk N\'orr"
    , "The Universities of Jol-Nar"
    , "The Winnu"
    , "The Xxcha Kingdom"
    , "The Yin Brotherhood"
    , "The Yssaril Tribes"
    , "The Argent Flight"
    , "The Empyrean"
    , "The Mahact Gene-Sorcerers"
    , "The Naaz-Rokha Alliance"
    , "The Nomad"
    , "The Titans of Ul"
    , "The Vuil'Raith Cabal"
    , "The Council Keleres"
    , "The Crimson Rebellion"
    , "The Deepwrought Scholarate"
    , "The Firmament/The Obsidian"
    , "The Ral Nel Consortium"
    , "Last Bastion"]

