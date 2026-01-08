"use client"

import {useState, useEffect} from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pause, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { endTurn, GameState, pauseGame, resumeGame } from "lib/gameState"

/*
  This is literally just the ticking clock being displayed with everything else around it being in clock/page.tsx
*/

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function ClockDisplay({state}:{state: GameState}){
   
    console.log(`State: ${state}`)
    const [gameState, setGameState] = useState<GameState>(state)
    const [time, setTime] = useState(gameState.activePlayer.timeRemaining)

    
    useEffect(() => {

      const activePlayer = gameState.activePlayer.name
      const activeFaction = gameState.activePlayer.faction

    }, [gameState])
    
    


    useEffect(() => {

      const interval = setInterval(() => {
          setTime(prev => prev - 1000)
      }, 1000)
      return () => clearInterval(interval)

        
    }, [])

    async function sendEndTurn() {
      const updated = await endTurn()
      setGameState(updated)
    }

    async function sendPause() {
      const updated = await pauseGame()
      setGameState(updated)
    }

    async function sendResume() {
      const updated = await resumeGame()
      setGameState(updated)
    }


    return (

        /*
        all the missing value need to come from data
        */

    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        {/*<h1 className="text-xl font-bold text-center">Round {gameState?.currentRound || 1}</h1>    nice, but unnecessary*/}
      </div>

      {/* Main Timer Display */}
      <div className="flex-1 flex items-center justify-center p-4">
        {(
          <Card className="w-full max-w-2xl border-2 border-primary shadow-lg">
            <CardContent className="pt-8 pb-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-block px-4 py-1 bg-primary/20 rounded-full">
                  <p className="text-sm font-medium text-primary">ACTIVE PLAYER</p>
                </div>
                <h2 className="text-3xl font-bold">{gameState.activePlayer.name}</h2>
                <p className="text-lg text-muted-foreground">{gameState.activePlayer.faction}</p>
              </div>

              <div className="text-center">
                <div className="text-7xl font-mono font-bold tracking-wider">
                  {formatTime(time)}
                </div>
              </div>

              
            </CardContent>
          </Card>
        )} 
        {/* (
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <p className="text-xl text-muted-foreground">Waiting for game to start...</p>
            </CardContent>
          </Card>
        )*/}
        
      </div>

      <div className="flex gap-4">
                    <Button
                      onClick={sendEndTurn}
                      size="lg"
                      className="flex-1 h-16 text-xl"
                      disabled={gameState?.isPaused}
                    >
                      End Turn
                    </Button>
                    {gameState?.isPaused ? (
                      <Button
                        onClick={sendResume}
                        size="lg"
                        variant="secondary"
                        className="h-16"
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    ) : (
                      <Button
                        onClick={sendPause}
                        size="lg"
                        variant="secondary"
                        className="h-16"
                      >
                        <Pause className="h-6 w-6" />
                      </Button>
                    )}
      </div>
    </div>
        
    )
    
}