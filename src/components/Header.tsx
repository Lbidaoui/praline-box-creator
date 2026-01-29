import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

const Header = ({ showBack, onBack }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-4 px-4 sm:px-6 bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {showBack && onBack ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Retour</span>
          </motion.button>
        ) : (
          <div className="w-16" />
        )}

        <motion.img
          src={logo}
          alt="La Maison du Praliné"
          className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />

        <div className="w-16" />
      </div>
    </motion.header>
  );
};

export default Header;
