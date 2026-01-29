import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoxSize, Chocolate, PlacedChocolate } from '@/types/chocolate';
import { chocolates } from '@/data/chocolates';
import { ArrowLeft, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChocolateCustomizerProps {
  box: BoxSize;
  onComplete: (placed: PlacedChocolate[]) => void;
  onBack: () => void;
}

const ChocolateCustomizer = ({ box, onComplete, onBack }: ChocolateCustomizerProps) => {
  const [placedChocolates, setPlacedChocolates] = useState<PlacedChocolate[]>([]);
  const [selectedChocolate, setSelectedChocolate] = useState<Chocolate | null>(null);

  const totalSlots = box.rows * box.chocolatesPerRow;
  const isFull = placedChocolates.length === totalSlots;

  const totalPrice = useMemo(() => {
    const chocolatePrice = placedChocolates.reduce((sum, p) => sum + p.chocolate.price, 0);
    return box.price + chocolatePrice;
  }, [placedChocolates, box.price]);

  const handleSlotClick = (rowIndex: number, position: number) => {
    const existingIndex = placedChocolates.findIndex(
      (p) => p.rowIndex === rowIndex && p.position === position
    );

    if (existingIndex !== -1) {
      // Remove existing chocolate
      setPlacedChocolates((prev) => prev.filter((_, i) => i !== existingIndex));
    } else if (selectedChocolate) {
      // Place new chocolate
      setPlacedChocolates((prev) => [
        ...prev,
        { rowIndex, position, chocolate: selectedChocolate },
      ]);
    }
  };

  const getPlacedChocolate = (rowIndex: number, position: number) => {
    return placedChocolates.find(
      (p) => p.rowIndex === rowIndex && p.position === position
    );
  };

  const clearAll = () => {
    setPlacedChocolates([]);
  };

  return (
    <div className="min-h-screen bg-gradient-cream py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl text-primary">
              {box.name}
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              {placedChocolates.length} / {totalSlots} chocolats
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right"
          >
            <p className="text-sm text-muted-foreground font-body">Total</p>
            <p className="font-display text-2xl text-gold">{totalPrice.toFixed(2)}€</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Box Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-card rounded-3xl p-6 md:p-8 shadow-elevated border border-gold/20">
              <div className="aspect-square bg-gradient-to-br from-chocolate-milk/10 to-chocolate-dark/5 rounded-2xl p-6 relative overflow-hidden">
                {/* Gold corners decoration */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/30 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-2xl" />

                <div className="h-full flex flex-col justify-center gap-4">
                  {Array.from({ length: box.rows }).map((_, rowIndex) => (
                    <motion.div
                      key={rowIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: rowIndex * 0.1 }}
                      className="flex gap-3 justify-center"
                    >
                      {Array.from({ length: box.chocolatesPerRow }).map((_, colIndex) => {
                        const placed = getPlacedChocolate(rowIndex, colIndex);
                        return (
                          <motion.button
                            key={colIndex}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSlotClick(rowIndex, colIndex)}
                            className={cn(
                              'w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 border-dashed transition-all duration-300 relative overflow-hidden',
                              placed
                                ? 'border-transparent'
                                : selectedChocolate
                                ? 'border-gold/50 hover:border-gold bg-gold/5'
                                : 'border-border hover:border-muted-foreground/30'
                            )}
                          >
                            <AnimatePresence>
                              {placed && (
                                <motion.div
                                  initial={{ scale: 0, y: -20 }}
                                  animate={{ scale: 1, y: 0 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                  className={cn(
                                    'absolute inset-1 rounded-lg shadow-md',
                                    placed.chocolate.color
                                  )}
                                />
                              )}
                            </AnimatePresence>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={clearAll}
                  disabled={placedChocolates.length === 0}
                  className="flex-1 rounded-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Tout effacer
                </Button>
                <Button
                  onClick={() => onComplete(placedChocolates)}
                  disabled={!isFull}
                  className="flex-1 rounded-full bg-gradient-luxury hover:opacity-90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Valider
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Chocolate Palette */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border/50 sticky top-8">
              <h3 className="font-display text-xl text-primary mb-2">
                Nos Pralinés
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-6">
                Sélectionnez un chocolat puis cliquez sur le coffret
              </p>

              <div className="grid grid-cols-2 gap-3">
                {chocolates.map((chocolate, index) => (
                  <motion.button
                    key={chocolate.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChocolate(chocolate)}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                      selectedChocolate?.id === chocolate.id
                        ? 'border-gold bg-gold/10 shadow-medium'
                        : 'border-border/50 hover:border-gold/30 hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg shadow-sm',
                          chocolate.color
                        )}
                      />
                      <span className="font-body font-medium text-sm text-foreground">
                        {chocolate.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body line-clamp-1">
                      {chocolate.description}
                    </p>
                    <p className="text-gold font-display text-sm mt-2">
                      +{chocolate.price.toFixed(2)}€
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChocolateCustomizer;
