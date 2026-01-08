'use server'

//Strategy Phase?


export interface Player {
    seatingID: number
    name: string,
    faction: string,
    timeRemaining: number,
    isPassed: boolean,
    strategyCard?: number 

}

export interface GameState{
    players: Player[]
    turnOrder?: Player[]
    activePlayer: Player 
    speaker?: Player
    isPaused: boolean
    phase: "strategy" | "action" | "agenda" | "status"
}

//this seems fishy
let gameState: GameState | undefined = undefined

const GameState = () => {
    

    const sortClocks = (clocks: Player[]) => {
        //sort the players according to startegy cards
    }





    return null
}


//since these functions are all async and we will wait in the clock-page we can ensure gameState is initialized before passing it on.
export async function submitPlayers(players:Player[]) {
    
    gameState = {
        players,
        activePlayer: players[0],
        speaker: players[0],
        isPaused: true,
        phase: "strategy"
    }

}

export async function pauseGame() {
    gameState!.isPaused = true
    return gameState
    
}


export async function getGameState ():Promise<GameState | undefined> {
    //getter for other files

    return gameState
}

export async function endTurn () {
    //change the active PLayer
    return gameState

}

export async function resumeGame(){
    gameState!.isPaused = false
    return gameState
}

export async function passPlayer(){

    return gameState
}
