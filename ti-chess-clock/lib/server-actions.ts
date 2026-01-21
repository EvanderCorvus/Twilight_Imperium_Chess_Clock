'use server'

import { GameState } from "./index"
import { Player } from "./index"
import fs from "fs/promises"
import path from "path"

const GAME_FILE = path.join(process.cwd(), ".gameState.json")


export async function submitPlayers(players:Player[]) {

  if (players.length === 0) {
    throw new Error("submitPlayers: players array is empty")
  }

  const gameState: GameState = {
      players,
      activePlayer: players[0],
      speaker: players[0],
      isPaused: true,
      phase: "strategy",
  }

  await fs.writeFile(
      GAME_FILE,
      JSON.stringify(gameState, null, 2),
      "utf-8"
  )
    

}


export async function pauseGame() {

  const data = await getGameState()

  if(!data){
    throw new Error ("No Game State")
  }

  data.isPaused = true

  await fs.writeFile(
      GAME_FILE,
      JSON.stringify(data, null, 2),
      "utf-8"
  )
    
    
}


export async function getGameState ():Promise<GameState | undefined> {
  //getter for other files

  try {
    const data = await fs.readFile(GAME_FILE, "utf-8")
    return JSON.parse(data) as GameState
  } catch {
    return undefined
  }

    
}

export async function endTurn () {
    
  const data = await getGameState()
  if(!data){
    throw new Error ("No Game State")
  }

  data.activePlayer = findNextPlayer(data)

  await fs.writeFile(
      GAME_FILE,
      JSON.stringify(data, null, 2),
      "utf-8"
  ) 
}

export async function resumeGame(){

  const data = await getGameState()

  if(!data){
    throw new Error ("No Game State")
  }

  data.isPaused = false

  await fs.writeFile(
      GAME_FILE,
      JSON.stringify(data, null, 2),
      "utf-8"
  )
    
}

export async function passPlayer(){

  const data = await getGameState()
  if(!data){
    throw new Error ("No Game State")
  }

  data.activePlayer.isPassed = true
  const newActivePlayer = findNextPlayer(data)


  //TODO: Client needs to know about this to display the new phase and trigger reset of strategy cards and stuff like that
  if(newActivePlayer === data.activePlayer){
    //this means findNextPlayer didn't find a next player, therefore everyone has passed

    //we go to the next phase
    switch(data.phase){

      case "action":
        data.phase = "status"
        break

      case "status":
        data.phase = "agenda"
        break

      case "strategy":
        data.phase = "action"
        break

      case "agenda":
        data.phase = "strategy"
        break

      
    }
  }

  await fs.writeFile(
      GAME_FILE,
      JSON.stringify(data, null, 2),
      "utf-8"
  )  
}

const findNextPlayer = ((gs: GameState): Player => {
  const activePlayerTurnOrder = gs.activePlayer.strategyCard!
  const currentPlayer = gs.activePlayer
  let nextPlayer = gs.activePlayer
  
  // we start with currentPlayer and nextPlayer being the same

  let i = activePlayerTurnOrder
  while(currentPlayer === nextPlayer){

    //our control variable doesn't get bigger than 8
    i = i % 8 + 1

    if(i === activePlayerTurnOrder){
      //if this condition is met we've done a full loop of every possible strategy card
      //this means everyone is passed
      break
    }
    
    //find the player with the strategy card whose number is i
    //if none are found, the while loop runs again with the next number
    gs.players.forEach( player => {
      if(player.strategyCard! === i && !player.isPassed){
        nextPlayer = player
      }
    })
  }

  return nextPlayer


})

