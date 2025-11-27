'use client'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <Timer className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-4xl">TI Chess Clock</CardTitle>
          <p className="text-muted-foreground">
            Twilight Imperium game timer with strategy card turn order
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => navigate('/setup')} 
            size="lg"
            className="w-full h-14 text-lg"
          >
            <Users className="mr-2 h-5 w-5" />
            Setup New Game
          </Button>
          <Button 
            onClick={() => navigate('/game')} 
            variant="secondary"
            size="lg"
            className="w-full h-14 text-lg"
          >
            Continue Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;