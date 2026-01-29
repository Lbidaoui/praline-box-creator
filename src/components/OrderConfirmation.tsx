import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BoxSize, PlacedChocolate } from '@/types/chocolate';
import { Check, Sparkles, RotateCcw, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import ProcessSteps from '@/components/ProcessSteps';

interface OrderConfirmationProps {
  box: BoxSize;
  placedChocolates: PlacedChocolate[];
  message: string | null;
  recipientName: string | null;
  onNewOrder: () => void;
}

const formatWeight = (grams: number): string => {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 1)} kg`;
  }
  return `${grams} g`;
};

const OrderConfirmation = ({
  box,
  placedChocolates,
  message,
  recipientName,
  onNewOrder,
}: OrderConfirmationProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  const totalPrice = box.price;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cream relative overflow-hidden">
      <Header />
      <ProcessSteps currentStep={4} />

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                y: -20,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                rotate: 0,
              }}
              animate={{
                opacity: 0,
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
              className={cn(
                'absolute w-2 sm:w-3 h-2 sm:h-3 rounded-sm',
                i % 4 === 0 && 'bg-gold',
                i % 4 === 1 && 'bg-chocolate-raspberry',
                i % 4 === 2 && 'bg-chocolate-praline',
                i % 4 === 3 && 'bg-chocolate-pistachio'
              )}
            />
          ))}
        </div>
      )}

      <div className="py-8 px-4 sm:px-6 flex items-center justify-center">
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
            className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-elevated"
          >
            <Check className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary mb-3 sm:mb-4">
              Commande envoyée !
            </h2>
            <div className="flex items-center justify-center gap-2 text-gold mb-6 sm:mb-8">
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-body text-sm sm:text-base">Merci pour votre confiance</span>
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
          </motion.div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-medium border border-gold/20 mb-6 sm:mb-8"
          >
            <h3 className="font-display text-lg sm:text-xl text-primary mb-4">Récapitulatif</h3>
            
            <div className="space-y-3 text-left font-body">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Coffret</span>
                <span className="text-foreground">{box.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Chocolats</span>
                <span className="text-foreground">{placedChocolates.length} pièces</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Scale className="w-3 h-3" /> Poids
                </span>
                <span className="text-foreground">{formatWeight(box.weight)}</span>
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
                <span className="font-display text-xl sm:text-2xl text-gold">{totalPrice.toFixed(0)} DH</span>
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
              className="bg-gradient-luxury text-primary-foreground px-8 sm:px-10 py-5 sm:py-6 rounded-full shadow-medium hover:shadow-elevated transition-all hover:scale-105 text-sm sm:text-base"
            >
              <RotateCcw className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Créer un nouveau coffret
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground font-body"
          >
            Un email de confirmation vous sera envoyé prochainement
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
