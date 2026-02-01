import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Gift, Scale, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Leaderboard from '@/components/Leaderboard';
import { cn } from '@/lib/utils';
import { PlacedChocolate } from '@/types/chocolate';
import { chocolates } from '@/data/chocolates';

interface SharedOrder {
  id: string;
  code: string;
  name: string;
  box_name: string;
  box_price: number;
  box_weight: number;
  chocolates_count: number;
  chocolates_data: PlacedChocolate[];
  message: string | null;
  recipient_name: string | null;
  view_count: number;
  created_at: string;
}

interface SharedOrderViewProps {
  code: string;
  onClose: () => void;
}

const formatWeight = (grams: number): string => {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 1)} kg`;
  }
  return `${grams} g`;
};

const SharedOrderView = ({ code, onClose }: SharedOrderViewProps) => {
  const [order, setOrder] = useState<SharedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [leaderboardExpanded, setLeaderboardExpanded] = useState(true);

  useEffect(() => {
    fetchAndIncrementView();
  }, [code]);

  const fetchAndIncrementView = async () => {
    // Fetch the order
    const { data, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('code', code)
      .single();

    if (fetchError || !data) {
      setError(true);
      setLoading(false);
      return;
    }

    // Increment view count
    await supabase
      .from('orders')
      .update({ view_count: data.view_count + 1 })
      .eq('id', data.id);

    setOrder({
      ...data,
      chocolates_data: data.chocolates_data as unknown as PlacedChocolate[],
      view_count: data.view_count + 1,
    });
    setLoading(false);
  };

  const getChocolateColor = (chocolateId: string): string => {
    const chocolate = chocolates.find(c => c.id === chocolateId);
    return chocolate?.color || 'bg-chocolate-dark';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-cream flex items-center justify-center">
        <div className="text-center">
          <Gift className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
          <p className="font-display text-xl text-primary">Chargement de la création...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-cream flex items-center justify-center">
        <div className="text-center p-8">
          <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl text-primary mb-2">Création introuvable</h2>
          <p className="text-muted-foreground mb-6">
            Le code "{code}" ne correspond à aucune création.
          </p>
          <Button onClick={onClose} className="bg-gradient-luxury text-primary-foreground rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Créer mon coffret
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cream relative overflow-hidden">
      <Header />

      <div className="py-8 px-4 sm:px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg text-center"
        >
          {/* Creator badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-body text-sm text-gold">Création partagée</span>
          </motion.div>

          <h1 className="font-display text-3xl sm:text-4xl text-primary mb-2">
            {order.name}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground mb-6">
            <span className="font-mono text-gold">{order.code}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {order.view_count} vues
            </span>
          </div>

          {/* Chocolate preview grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-medium border border-gold/20 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-gold" />
              <h3 className="font-display text-lg text-primary">Aperçu du coffret</h3>
            </div>

            <div className="grid grid-cols-6 gap-2 max-w-xs mx-auto mb-4">
              {order.chocolates_data.slice(0, 18).map((placed, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={cn(
                    'aspect-square rounded-lg shadow-sm',
                    getChocolateColor(placed.chocolate.id)
                  )}
                />
              ))}
            </div>

            <div className="space-y-2 text-left font-body text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coffret</span>
                <span className="text-foreground">{order.box_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chocolats</span>
                <span className="text-foreground">{order.chocolates_count} pièces</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Scale className="w-3 h-3" /> Poids
                </span>
                <span className="text-foreground">{formatWeight(order.box_weight)}</span>
              </div>
              {order.recipient_name && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destinataire</span>
                  <span className="text-foreground">{order.recipient_name}</span>
                </div>
              )}
              {order.message && (
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Message</p>
                  <p className="text-sm text-foreground italic">"{order.message}"</p>
                </div>
              )}
              
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-medium text-foreground">Prix</span>
                <span className="font-display text-xl text-gold">{order.box_price.toFixed(0)} DH</span>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <Leaderboard
            isExpanded={leaderboardExpanded}
            onToggle={() => setLeaderboardExpanded(!leaderboardExpanded)}
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <Button
              onClick={onClose}
              size="lg"
              className="bg-gradient-luxury text-primary-foreground px-8 sm:px-10 py-5 sm:py-6 rounded-full shadow-medium hover:shadow-elevated transition-all hover:scale-105 text-sm sm:text-base"
            >
              <Share2 className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Créer ma propre création
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SharedOrderView;
