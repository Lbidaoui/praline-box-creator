import { motion } from 'framer-motion';
import { BoxSize } from '@/types/chocolate';
import { boxSizes } from '@/data/chocolates';
import { Gift, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ProcessSteps from '@/components/ProcessSteps';

interface BoxSelectionProps {
  onSelect: (box: BoxSize) => void;
  onBack: () => void;
}

const formatWeight = (grams: number): string => {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 1)} kg`;
  }
  return `${grams} g`;
};

const BoxSelection = ({ onSelect, onBack }: BoxSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-cream">
      <Header showBack onBack={onBack} />
      <ProcessSteps currentStep={1} />

      <div className="py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <Gift className="w-8 sm:w-10 h-8 sm:h-10 text-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary mb-3 sm:mb-4">
              Choisissez votre coffret
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto text-sm sm:text-base">
              Sélectionnez la taille parfaite pour votre création chocolatée
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {boxSizes.map((box, index) => (
              <motion.div
                key={box.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onSelect(box)}
                className="cursor-pointer group"
              >
                <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-gold/20 relative overflow-hidden">
                  {/* Luxury ribbon */}
                  {index === 2 && (
                    <div className="absolute -top-1 -right-8 bg-gold text-primary-foreground text-xs font-body px-8 py-1 rotate-45 shadow-md">
                      Populaire
                    </div>
                  )}

                  {/* Box preview */}
                  <div className="relative mb-6">
                    <div className="aspect-square bg-gradient-to-br from-chocolate-milk/10 via-gold/5 to-chocolate-dark/10 rounded-xl sm:rounded-2xl p-4 flex items-center justify-center border border-gold/10">
                      <div
                        className="grid gap-1.5 sm:gap-2 w-full max-w-[160px] sm:max-w-[180px]"
                        style={{
                          gridTemplateRows: `repeat(${box.rows}, 1fr)`,
                        }}
                      >
                        {Array.from({ length: box.rows }).map((_, rowIndex) => (
                          <div
                            key={rowIndex}
                            className="flex gap-1.5 sm:gap-2 justify-center"
                          >
                            {Array.from({ length: box.chocolatesPerRow }).map(
                              (_, colIndex) => (
                                <motion.div
                                  key={colIndex}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    delay: 0.3 + (rowIndex * box.chocolatesPerRow + colIndex) * 0.03,
                                  }}
                                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-chocolate-dark/30 group-hover:bg-chocolate-praline transition-colors duration-300 shadow-sm"
                                />
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Decorative glow */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/40 transition-colors duration-300" />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl text-primary mb-2 group-hover:text-gold transition-colors">
                    {box.name}
                  </h3>

                  {/* Info grid: rows + weight */}
                  <div className="flex items-center justify-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span className="font-display text-foreground">{box.rows}</span>
                      <span className="font-body">rangées</span>
                    </div>
                    <span className="text-border">•</span>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Scale className="w-3.5 h-3.5 text-gold" />
                      <span className="font-body">{formatWeight(box.weight)}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground font-body text-xs sm:text-sm mb-4">
                    {box.rows * box.chocolatesPerRow} chocolats artisanaux
                  </p>

                  {/* Price */}
                  <div className="text-center border-t border-border/50 pt-4 mb-4">
                    <span className="font-display text-2xl sm:text-3xl text-gold">
                      {box.price.toFixed(0)} DH
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-gold/30 hover:bg-gold hover:text-primary-foreground hover:border-gold transition-all duration-300 rounded-full font-body"
                  >
                    Sélectionner
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxSelection;
