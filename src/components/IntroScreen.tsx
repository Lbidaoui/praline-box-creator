import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-cream relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-chocolate-praline/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-gold text-sm font-body tracking-[0.3em] uppercase">
            Artisan Chocolatier
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-display text-5xl md:text-7xl text-primary mb-4 leading-tight"
        >
          La Maison
          <br />
          <span className="text-gradient-gold">du Praliné</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-muted-foreground font-body text-lg md:text-xl max-w-md mx-auto mb-12"
        >
          Créez votre coffret personnalisé avec nos pralinés d'exception
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-luxury text-primary-foreground px-10 py-6 text-lg font-body rounded-full shadow-elevated hover:shadow-medium transition-all duration-300 hover:scale-105 group"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-celebrate" />
            Commencer la création
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex items-center gap-8 justify-center text-muted-foreground/60 text-sm font-body"
        >
          <span>✦ Fait main</span>
          <span>✦ Ingrédients nobles</span>
          <span>✦ Livraison soignée</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
