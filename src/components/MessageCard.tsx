import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Send, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface MessageCardProps {
  onComplete: (message: string | null, recipientName: string | null) => void;
  onBack: () => void;
}

const MessageCard = ({ onComplete, onBack }: MessageCardProps) => {
  const [wantsMessage, setWantsMessage] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-cream py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
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
          className="text-center mb-10"
        >
          <Heart className="w-10 h-10 text-chocolate-raspberry mx-auto mb-4" />
          <h2 className="font-display text-4xl text-primary mb-4">
            Ajouter un message ?
          </h2>
          <p className="text-muted-foreground font-body">
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
              className="bg-gradient-luxury text-primary-foreground px-10 py-6 rounded-full shadow-medium hover:shadow-elevated transition-all hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2" />
              Oui, ajouter un message
            </Button>
            <Button
              onClick={() => onComplete(null, null)}
              size="lg"
              variant="outline"
              className="px-10 py-6 rounded-full border-primary/20 hover:bg-primary/5"
            >
              <SkipForward className="w-5 h-5 mr-2" />
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
            <div className="bg-card rounded-3xl p-8 shadow-elevated border border-gold/20 relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40" />

              <div className="relative z-10">
                <div className="mb-6">
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    Pour
                  </label>
                  <Input
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Nom du destinataire"
                    className="font-display text-xl border-0 border-b-2 border-border/50 rounded-none bg-transparent focus:ring-0 focus:border-gold placeholder:text-muted-foreground/40"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    Votre message
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez votre message personnel ici..."
                    rows={5}
                    maxLength={200}
                    className="font-body text-foreground border-0 border-b-2 border-border/50 rounded-none bg-transparent focus:ring-0 focus:border-gold resize-none placeholder:text-muted-foreground/40"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-right">
                    {message.length}/200 caractères
                  </p>
                </div>

                <div className="text-center font-display text-gold text-sm italic">
                  — La Maison du Praliné —
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 justify-center">
              <Button
                onClick={() => setWantsMessage(null)}
                variant="outline"
                className="px-8 rounded-full border-primary/20"
              >
                Annuler
              </Button>
              <Button
                onClick={() => onComplete(message || null, recipientName || null)}
                className="bg-gradient-luxury text-primary-foreground px-8 rounded-full shadow-medium hover:shadow-elevated transition-all hover:scale-105"
              >
                <Send className="w-4 h-4 mr-2" />
                Valider le message
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
