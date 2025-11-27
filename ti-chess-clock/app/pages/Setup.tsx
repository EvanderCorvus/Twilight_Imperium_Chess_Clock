'use client'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

const FACTIONS = [
  'The Arborec', 'The Barony of Letnev', 'The Clan of Saar', 'The Embers of Muaat',
  'The Emirates of Hacan', 'The Federation of Sol', 'The Ghosts of Creuss',
  'The L1Z1X Mindnet', 'The Mentak Coalition', 'The Naalu Collective',
  'The Nekro Virus', 'Sardakk N\'orr', 'The Universities of Jol-Nar',
  'The Winnu', 'The Xxcha Kingdom', 'The Yin Brotherhood', 'The Yssaril Tribes'
];

interface PlayerSetup {
  name: string;
  faction: string;
}

const Setup = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<PlayerSetup[]>([
    { name: '', faction: '' },
    { name: '', faction: '' },
    { name: '', faction: '' }
  ]);

  const addPlayer = () => {
    if (players.length < 8) {
      setPlayers([...players, { name: '', faction: '' }]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index: number, field: 'name' | 'faction', value: string) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const handleStartGame = () => {
    const validPlayers = players.filter(p => p.name.trim() && p.faction);
    if (validPlayers.length >= 2) {
      localStorage.setItem('ti-players', JSON.stringify(validPlayers));
      navigate('/game');
    }
  };

  const isValid = players.filter(p => p.name.trim() && p.faction).length >= 2;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl text-center">TI Chess Clock Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {players.map((player, index) => (
              <Card key={index} className="bg-secondary/50">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Player {index + 1}</h3>
                    {players.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePlayer(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      placeholder="Enter player name"
                      value={player.name}
                      onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`faction-${index}`}>Faction</Label>
                    <select
                      id={`faction-${index}`}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={player.faction}
                      onChange={(e) => updatePlayer(index, 'faction', e.target.value)}
                    >
                      <option value="">Select faction</option>
                      {FACTIONS.map(faction => (
                        <option key={faction} value={faction}>{faction}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-4">
              {players.length < 8 && (
                <Button onClick={addPlayer} variant="secondary" className="flex-1">
                  Add Player
                </Button>
              )}
              <Button 
                onClick={handleStartGame} 
                disabled={!isValid}
                className="flex-1"
              >
                Start Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;