import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import ProcessSteps from '@/components/ProcessSteps';

interface MessageCardProps {
  onComplete: (message: string | null, recipientName: string | null) => void;
  onBack: () => void;
}

const MessageCard = ({ onComplete, onBack }: MessageCardProps) => {
  const [wantsMessage, setWantsMessage] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-cream">
      <Header showBack onBack={onBack} />
      <ProcessSteps currentStep={3} />

      <div className="py-8 px-4 sm:px-6 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10"
          >
            <Heart className="w-8 sm:w-10 h-8 sm:h-10 text-chocolate-raspberry mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl text-primary mb-3 sm:mb-4">
              Ajouter un message ?
            </h2>
            <p className="text-muted-foreground font-body text-sm sm:text-base">
              Personnalisez votre coffret avec un message pour votre destinataire
            </p>
          </motion.div>

          {wantsMessage === null ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => setWantsMessage(true)}
                size="lg"
                className="bg-gradient-luxury text-primary-foreground px-8 sm:px-10 py-5 sm:py-6 rounded-full shadow-medium hover:shadow-elevated transition-all hover:scale-105 text-sm sm:text-base"
              >
                <Heart className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Oui, ajouter un message
              </Button>
              <Button
                onClick={() => onComplete(null, null)}
                size="lg"
                variant="outline"
                className="px-8 sm:px-10 py-5 sm:py-6 rounded-full border-gold/30 hover:bg-gold/10 hover:border-gold text-sm sm:text-base"
              >
                <SkipForward className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Non, continuer
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              {/* Card design */}
              <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-elevated border border-gold/20 relative overflow-hidden">
                {/* Decorative corners */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-gold/40" />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-gold/40" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-gold/40" />
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-gold/40" />

                <div className="relative z-10">
                  <div className="mb-6">
                    <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                      Pour
                    </label>
                    <Input
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Nom du destinataire"
                      className="font-display text-lg sm:text-xl border-0 border-b-2 border-border/50 rounded-none bg-transparent focus:ring-0 focus:border-gold placeholder:text-muted-foreground/40"
                    />
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <label className="block text-xs sm:text-sm font-body text-muted-foreground mb-2">
                      Votre message
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Écrivez votre message personnel ici..."
                      rows={4}
                      maxLength={200}
                      className="font-body text-foreground border-0 border-b-2 border-border/50 rounded-none bg-transparent focus:ring-0 focus:border-gold resize-none placeholder:text-muted-foreground/40 text-sm sm:text-base"
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-right">
                      {message.length}/200 caractères
                    </p>
                  </div>

                  <div className="text-center font-display text-gold text-xs sm:text-sm italic">
                    — La Maison du Praliné —
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center">
                <Button
                  onClick={() => setWantsMessage(null)}
                  variant="outline"
                  className="px-6 sm:px-8 rounded-full border-gold/30 text-sm sm:text-base"
                >
                  Annuler
                </Button>
                <Button
                  onClick={() => onComplete(message || null, recipientName || null)}
                  className="bg-gradient-luxury text-primary-foreground px-6 sm:px-8 rounded-full shadow-medium hover:shadow-elevated transition-all hover:scale-105 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Valider le message
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
