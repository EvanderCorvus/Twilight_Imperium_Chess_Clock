'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pause, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Automatically determine WebSocket URL based on environment


const getWebSocketUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'ws://localhost:8080';
  }
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}`;
};


export default function GamePage () {
  const router = useRouter();     //for page routing
  const { toast } = useToast();   //for error handling I think
  const { isConnected, gameState, error, sendMessage } = useWebSocket(getWebSocketUrl());     //connection monitoring



  useEffect(() => {
    if (error) {
      toast({
        title: 'Connection Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const handleEndTurn = () => {
    sendMessage('end_turn', {});
  };

  const handlePause = () => {
    sendMessage('pause', {});
  };

  const handleResume = () => {
    sendMessage('resume', {});
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="animate-pulse">
              <h2 className="text-2xl font-bold">Connecting to server...</h2>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activePlayer = gameState?.players.find(p => p.isActive);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-center">Round {gameState?.currentRound || 1}</h1>
      </div>

      {/* Main Timer Display */}
      <div className="flex-1 flex items-center justify-center p-4">
        {activePlayer ? (
          <Card className="w-full max-w-2xl border-2 border-primary shadow-lg">
            <CardContent className="pt-8 pb-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-block px-4 py-1 bg-primary/20 rounded-full">
                  <p className="text-sm font-medium text-primary">ACTIVE PLAYER</p>
                </div>
                <h2 className="text-3xl font-bold">{activePlayer.name}</h2>
                <p className="text-lg text-muted-foreground">{activePlayer.faction}</p>
              </div>

              <div className="text-center">
                <div className="text-7xl font-mono font-bold tracking-wider">
                  {formatTime(activePlayer.timeRemaining)}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleEndTurn}
                  size="lg"
                  className="flex-1 h-16 text-xl"
                  disabled={gameState?.status === 'paused'}
                >
                  End Turn
                </Button>
                {gameState?.status === 'paused' ? (
                  <Button
                    onClick={handleResume}
                    size="lg"
                    variant="secondary"
                    className="h-16"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                ) : (
                  <Button
                    onClick={handlePause}
                    size="lg"
                    variant="secondary"
                    className="h-16"
                  >
                    <Pause className="h-6 w-6" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <p className="text-xl text-muted-foreground">Waiting for game to start...</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Player List */}
      <div className="p-4 border-t border-border space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">ALL PLAYERS</h3>
        <div className="grid gap-2">
          {gameState?.players.map((player) => (
            <div
              key={player.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                player.isActive ? 'bg-primary/20 border border-primary' : 'bg-secondary'
              }`}
            >
              <div>
                <p className="font-medium">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.faction}</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold">{formatTime(player.timeRemaining)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

