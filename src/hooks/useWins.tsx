import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Win {
  id: string;
  text: string;
  date: string;
  created_at: string;
}

export const useWins = () => {
  const [wins, setWins] = useState<Win[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load wins from database
  const loadWins = async () => {
    if (!user) {
      setWins([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wins')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setWins(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading wins",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a new win
  const addWin = async (text: string) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('wins')
        .insert({
          user_id: user.id,
          text,
          date: today
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setWins(prev => [data, ...prev]);
        return data;
      }
    } catch (error: any) {
      toast({
        title: "Error adding win",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  // Delete a win
  const deleteWin = async (winId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wins')
        .delete()
        .eq('id', winId)
        .eq('user_id', user.id); // Extra security check

      if (error) throw error;

      // Update local state by removing the deleted win
      setWins(prev => prev.filter(win => win.id !== winId));
      
      toast({
        title: "Win deleted",
        description: "Your win has been removed successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error deleting win",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  // Calculate current streak
  const calculateStreak = () => {
    if (!wins.length) return 0;

    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    // Group wins by date
    const winsByDate = wins.reduce((acc, win) => {
      const date = win.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(win);
      return acc;
    }, {} as Record<string, Win[]>);

    // Check for consecutive days
    while (true) {
      const dateString = currentDate.toISOString().split('T')[0];
      
      if (winsByDate[dateString] && winsByDate[dateString].length > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  // Check if user has a win today
  const hasWinToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return wins.some(win => win.date === today);
  };

  useEffect(() => {
    loadWins();
  }, [user]);

  return {
    wins,
    loading,
    addWin,
    deleteWin,
    calculateStreak,
    hasWinToday,
    refreshWins: loadWins
  };
};