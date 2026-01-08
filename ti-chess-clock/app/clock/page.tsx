
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pause, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ClockDisplay from '@/clock/ClockDisplay';
import { endTurn, GameState, getGameState, pauseGame, resumeGame } from 'lib/gameState';




export default async function ClockPage () {
  //const { toast } = useToast();   //for error handling I think


  let gameState:GameState = await getGameState()

  


  return(
    //fill in placeholder
    //ClockDisplay only gets the time and then counts down. Everything else happens here

    <div>

    
      <ClockDisplay state={gameState} />


    

      

    </div>
  )}

 

