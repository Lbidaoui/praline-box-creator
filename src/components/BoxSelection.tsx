import { motion } from 'framer-motion';
import { BoxSize } from '@/types/chocolate';
import { boxSizes } from '@/data/chocolates';
import { ArrowLeft, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BoxSelectionProps {
  onSelect: (box: BoxSize) => void;
  onBack: () => void;
}

const BoxSelection = ({ onSelect, onBack }: BoxSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-cream py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Gift className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">
            Choisissez votre coffret
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Sélectionnez la taille parfaite pour votre création chocolatée
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
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
              <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50">
                {/* Box preview */}
                <div className="relative mb-6">
                  <div className="aspect-square bg-gradient-to-br from-chocolate-milk/20 to-chocolate-dark/10 rounded-xl p-4 flex items-center justify-center">
                    <div
                      className="grid gap-2 w-full max-w-[180px]"
                      style={{
                        gridTemplateRows: `repeat(${box.rows}, 1fr)`,
                      }}
                    >
                      {Array.from({ length: box.rows }).map((_, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex gap-2 justify-center"
                        >
                          {Array.from({ length: box.chocolatesPerRow }).map(
                            (_, colIndex) => (
                              <motion.div
                                key={colIndex}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  delay: 0.3 + (rowIndex * box.chocolatesPerRow + colIndex) * 0.05,
                                }}
                                className="w-6 h-6 rounded-lg bg-chocolate-dark/30 group-hover:bg-chocolate-milk transition-colors duration-300"
                              />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Gold ribbon effect */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/40 transition-colors duration-300" />
                </div>

                <h3 className="font-display text-2xl text-primary mb-2 group-hover:text-gold transition-colors">
                  {box.name}
                </h3>
                
                <p className="text-muted-foreground font-body text-sm mb-4">
                  {box.rows * box.chocolatesPerRow} chocolats artisanaux
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-body">
                    À partir de
                  </span>
                  <span className="font-display text-2xl text-gold">
                    {box.price.toFixed(2)}€
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full"
                >
                  Sélectionner
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoxSelection;
