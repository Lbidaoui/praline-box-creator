import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Gift, Palette, MessageSquare } from 'lucide-react';
import logo from '@/assets/logo.png';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const features = [
    { icon: Gift, text: 'Choisissez votre coffret' },
    { icon: Palette, text: 'Composez chocolat par chocolat' },
    { icon: MessageSquare, text: 'Ajoutez un message personnel' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-cream relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-5 sm:top-20 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-gold/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-chocolate-praline/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-burgundy/5 blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-2xl"
        >
          {/* Logo - Responsive sizes */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <img 
              src={logo} 
              alt="La Maison du Praliné - Maître Chocolatier Français" 
              className="h-16 xs:h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto mx-auto object-contain"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground font-body text-base sm:text-lg md:text-xl max-w-md mx-auto mb-8 sm:mb-10 px-4"
          >
            Créez votre coffret personnalisé avec nos pralinés d'exception
          </motion.p>

          {/* Process preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-12 px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3 bg-card/60 backdrop-blur-sm rounded-full px-4 py-2.5 border border-gold/20 shadow-soft"
              >
                <feature.icon className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm font-body text-foreground whitespace-nowrap">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Button
              onClick={onStart}
              size="lg"
              className="bg-gradient-luxury text-primary-foreground px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-body rounded-full shadow-elevated hover:shadow-medium transition-all duration-300 hover:scale-105 group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-celebrate" />
              Commencer la création
            </Button>
          </motion.div>

          {/* Bottom badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-12 sm:mt-16 flex flex-wrap items-center gap-4 sm:gap-8 justify-center text-muted-foreground/60 text-xs sm:text-sm font-body"
          >
            <span className="flex items-center gap-1">✦ Fait main</span>
            <span className="flex items-center gap-1">✦ Ingrédients nobles</span>
            <span className="flex items-center gap-1">✦ Livraison soignée</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroScreen;
