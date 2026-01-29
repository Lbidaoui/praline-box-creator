import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BoxSize, PlacedChocolate } from '@/types/chocolate';
import { Check, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OrderConfirmationProps {
  box: BoxSize;
  placedChocolates: PlacedChocolate[];
  message: string | null;
  recipientName: string | null;
  onNewOrder: () => void;
}

const OrderConfirmation = ({
  box,
  placedChocolates,
  message,
  recipientName,
  onNewOrder,
}: OrderConfirmationProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  const totalPrice = box.price + placedChocolates.reduce((sum, p) => sum + p.chocolate.price, 0);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cream py-12 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                y: -20,
                x: Math.random() * window.innerWidth,
                rotate: 0,
              }}
              animate={{
                opacity: 0,
                y: window.innerHeight + 100,
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
              className={cn(
                'absolute w-3 h-3 rounded-sm',
                i % 4 === 0 && 'bg-gold',
                i % 4 === 1 && 'bg-chocolate-raspberry',
                i % 4 === 2 && 'bg-chocolate-praline',
                i % 4 === 3 && 'bg-chocolate-pistachio'
              )}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg text-center relative z-10"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-8 shadow-elevated"
        >
          <Check className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">
            Commande envoyée !
          </h2>
          <div className="flex items-center justify-center gap-2 text-gold mb-8">
            <Sparkles className="w-5 h-5" />
            <span className="font-body">Merci pour votre confiance</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </motion.div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-3xl p-6 shadow-medium border border-border/50 mb-8"
        >
          <h3 className="font-display text-xl text-primary mb-4">Récapitulatif</h3>
          
          <div className="space-y-3 text-left font-body">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Coffret</span>
              <span className="text-foreground">{box.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Chocolats</span>
              <span className="text-foreground">{placedChocolates.length} pièces</span>
            </div>
            {recipientName && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Destinataire</span>
                <span className="text-foreground">{recipientName}</span>
              </div>
            )}
            {message && (
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Message</p>
                <p className="text-sm text-foreground italic">"{message}"</p>
              </div>
            )}
            
            <div className="flex justify-between pt-4 border-t border-border">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-display text-2xl text-gold">{totalPrice.toFixed(2)}€</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onNewOrder}
            size="lg"
            className="bg-gradient-luxury text-primary-foreground px-10 py-6 rounded-full shadow-medium hover:shadow-elevated transition-all hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Créer un nouveau coffret
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-muted-foreground font-body"
        >
          Un email de confirmation vous sera envoyé prochainement
        </motion.p>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
