import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Eye, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  id: string;
  code: string;
  name: string;
  view_count: number;
  box_name: string;
  created_at: string;
}

interface LeaderboardProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

const Leaderboard = ({ isExpanded = true, onToggle }: LeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('id, code, name, view_count, box_name, created_at')
      .order('view_count', { ascending: false })
      .limit(10);

    if (!error && data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-muted-foreground">{index + 1}</span>;
    }
  };

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30';
      case 1:
        return 'bg-gradient-to-r from-gray-300/20 to-gray-400/10 border-gray-400/30';
      case 2:
        return 'bg-gradient-to-r from-amber-600/20 to-orange-500/10 border-amber-600/30';
      default:
        return 'bg-muted/30 border-border';
    }
  };

  if (loading) {
    return (
      <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-medium border border-gold/20">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-gold animate-pulse" />
          <span className="font-display text-lg text-primary">Chargement...</span>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-medium border border-gold/20 text-center">
        <Sparkles className="w-8 h-8 text-gold mx-auto mb-2" />
        <p className="font-display text-lg text-primary mb-1">Soyez le premier !</p>
        <p className="text-sm text-muted-foreground">
          Créez et partagez votre coffret pour apparaître ici
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl sm:rounded-3xl shadow-medium border border-gold/20 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" />
          <h3 className="font-display text-lg sm:text-xl text-primary">Classement des créations</h3>
        </div>
        {onToggle && (
          isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-2">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02]',
                getRankStyle(index)
              )}
            >
              <div className="shrink-0">
                {getRankIcon(index)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate text-sm sm:text-base">
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.box_name} • <span className="font-mono text-gold">{entry.code}</span>
                </p>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">{entry.view_count}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Leaderboard;
