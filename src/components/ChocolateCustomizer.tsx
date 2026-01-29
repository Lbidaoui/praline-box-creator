import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoxSize, Chocolate, PlacedChocolate } from '@/types/chocolate';
import { chocolates } from '@/data/chocolates';
import { Trash2, Check, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import ProcessSteps from '@/components/ProcessSteps';

interface ChocolateCustomizerProps {
  box: BoxSize;
  onComplete: (placed: PlacedChocolate[]) => void;
  onBack: () => void;
}

const formatWeight = (grams: number): string => {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 1)} kg`;
  }
  return `${grams} g`;
};

const ChocolateCustomizer = ({ box, onComplete, onBack }: ChocolateCustomizerProps) => {
  const [placedChocolates, setPlacedChocolates] = useState<PlacedChocolate[]>([]);
  const [selectedChocolate, setSelectedChocolate] = useState<Chocolate | null>(null);

  const totalSlots = box.rows * box.chocolatesPerRow;
  const isFull = placedChocolates.length === totalSlots;

  const totalPrice = useMemo(() => {
    return box.price;
  }, [box.price]);

  const handleSlotClick = (rowIndex: number, position: number) => {
    const existingIndex = placedChocolates.findIndex(
      (p) => p.rowIndex === rowIndex && p.position === position
    );

    if (existingIndex !== -1) {
      setPlacedChocolates((prev) => prev.filter((_, i) => i !== existingIndex));
    } else if (selectedChocolate) {
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
    <div className="min-h-screen bg-gradient-cream">
      <Header showBack onBack={onBack} />
      <ProcessSteps currentStep={2} />

      <div className="py-6 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6 bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-gold/20 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <Scale className="w-4 h-4 text-gold" />
              <span className="text-sm font-body text-muted-foreground">
                {formatWeight(box.weight)}
              </span>
            </div>
            
            <div className="text-center">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl text-primary">
                {box.name}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-body">
                {placedChocolates.length} / {totalSlots} chocolats
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground font-body">Total</p>
              <p className="font-display text-lg sm:text-xl md:text-2xl text-gold">{totalPrice.toFixed(0)} DH</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Box Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-elevated border border-gold/20">
                <div className="aspect-square bg-gradient-to-br from-chocolate-milk/10 via-gold/5 to-chocolate-dark/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden">
                  {/* Gold corners decoration */}
                  <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-xl sm:rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-xl sm:rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-l-2 border-gold/30 rounded-bl-xl sm:rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-gold/30 rounded-br-xl sm:rounded-br-2xl" />

                  <div className="h-full flex flex-col justify-center gap-2 sm:gap-3 md:gap-4">
                    {Array.from({ length: box.rows }).map((_, rowIndex) => (
                      <motion.div
                        key={rowIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: rowIndex * 0.1 }}
                        className="flex gap-2 sm:gap-3 justify-center"
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
                                'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl border-2 border-dashed transition-all duration-300 relative overflow-hidden',
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
                                      'absolute inset-1 rounded-md sm:rounded-lg shadow-md',
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

                <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <Button
                    variant="outline"
                    onClick={clearAll}
                    disabled={placedChocolates.length === 0}
                    className="flex-1 rounded-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground text-sm sm:text-base"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Tout effacer</span>
                    <span className="sm:hidden">Effacer</span>
                  </Button>
                  <Button
                    onClick={() => onComplete(placedChocolates)}
                    disabled={!isFull}
                    className="flex-1 rounded-full bg-gradient-luxury hover:opacity-90 text-sm sm:text-base"
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
              <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-soft border border-gold/20 lg:sticky lg:top-32">
                <h3 className="font-display text-lg sm:text-xl text-primary mb-2">
                  Nos Pralinés
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-body mb-4 sm:mb-6">
                  Sélectionnez un chocolat puis cliquez sur le coffret
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
                        'p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-left',
                        selectedChocolate?.id === chocolate.id
                          ? 'border-gold bg-gold/10 shadow-medium'
                          : 'border-border/50 hover:border-gold/30 hover:bg-muted/50'
                      )}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <div
                          className={cn(
                            'w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg shadow-sm flex-shrink-0',
                            chocolate.color
                          )}
                        />
                        <span className="font-body font-medium text-xs sm:text-sm text-foreground line-clamp-1">
                          {chocolate.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-body line-clamp-1 hidden sm:block">
                        {chocolate.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChocolateCustomizer;
