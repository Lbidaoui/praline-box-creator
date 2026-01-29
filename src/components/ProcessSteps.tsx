import { motion } from 'framer-motion';
import { Gift, Palette, MessageSquare, CheckCircle } from 'lucide-react';

interface ProcessStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, icon: Gift, label: 'Coffret', description: 'Choisir la taille' },
  { id: 2, icon: Palette, label: 'Création', description: 'Composer votre box' },
  { id: 3, icon: MessageSquare, label: 'Message', description: 'Personnaliser' },
  { id: 4, icon: CheckCircle, label: 'Confirmer', description: 'Valider commande' },
];

const ProcessSteps = ({ currentStep }: ProcessStepsProps) => {
  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress line background */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-border hidden sm:block" />
          
          {/* Progress line filled */}
          <motion.div
            className="absolute top-6 left-0 h-0.5 bg-gold hidden sm:block"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center relative z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-gold text-primary-foreground shadow-medium' : ''}
                    ${isActive ? 'bg-primary text-primary-foreground shadow-elevated ring-4 ring-gold/30' : ''}
                    ${!isActive && !isCompleted ? 'bg-card border-2 border-border text-muted-foreground' : ''}
                  `}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                
                <div className="mt-3 text-center">
                  <p className={`
                    font-display text-sm transition-colors
                    ${isActive ? 'text-primary' : isCompleted ? 'text-gold' : 'text-muted-foreground'}
                  `}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
