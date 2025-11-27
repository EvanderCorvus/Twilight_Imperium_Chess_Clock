'use client'
import { useEffect, useRef, useState } from 'react';

export interface GameState {
  status: 'setup' | 'playing' | 'paused' | 'finished';
  currentRound: number;
  activePlayerId: string | null;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  faction: string;
  timeRemaining: number;
  strategyCard: number | null;
  isActive: boolean;
}

export interface WebSocketMessage {
  type: 'game_state' | 'timer_update' | 'error';
  data: any;
}

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url || url.trim() === '') {
      console.log('No WebSocket URL provided');
      setIsConnected(false);
      return;
    }

    console.log('Connecting to WebSocket:', url);
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        
        if (message.type === 'game_state') {
          setGameState(message.data);
        } else if (message.type === 'timer_update') {
          setGameState(prev => prev ? { ...prev, ...message.data } : null);
        } else if (message.type === 'error') {
          setError(message.data.message);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('Connection error');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (type: string, data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, data }));
    } else {
      console.error('WebSocket not connected');
    }
  };

  return { isConnected, gameState, error, sendMessage };
};
