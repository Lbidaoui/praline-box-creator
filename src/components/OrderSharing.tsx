import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface OrderSharingProps {
  code: string;
  orderName: string;
  onNameChange: (name: string) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
  isSaved: boolean;
}

const OrderSharing = ({
  code,
  orderName,
  onNameChange,
  onSave,
  isSaving,
  isSaved,
}: OrderSharingProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}?code=${code}`;
  const shareText = `Découvrez ma création chocolatée "${orderName}" chez La Maison du Praliné! 🍫✨`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Lien copié !');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Impossible de copier');
    }
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-medium border border-gold/20 mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-gold" />
        <h3 className="font-display text-lg sm:text-xl text-primary">Partagez votre création</h3>
      </div>

      {!isSaved ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-body">
              Donnez un nom à votre coffret
            </label>
            <Input
              value={orderName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Ex: Coffret Gourmand de Marie"
              className="border-gold/30 focus:border-gold bg-background"
              maxLength={50}
            />
          </div>
          <Button
            onClick={onSave}
            disabled={!orderName.trim() || isSaving}
            className="w-full bg-gradient-luxury text-primary-foreground rounded-full"
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer et obtenir mon code'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Votre code unique</p>
            <p className="font-display text-3xl sm:text-4xl text-gold tracking-widest">{code}</p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="text-sm bg-muted/30 border-gold/20"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="icon"
              className="shrink-0 border-gold/30"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              onClick={shareToWhatsApp}
              variant="outline"
              size="icon"
              className="rounded-full border-gold/30 hover:bg-green-500/10 hover:border-green-500/50"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
            </Button>
            <Button
              onClick={shareToTwitter}
              variant="outline"
              size="icon"
              className="rounded-full border-gold/30 hover:bg-blue-400/10 hover:border-blue-400/50"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
            </Button>
            <Button
              onClick={shareToFacebook}
              variant="outline"
              size="icon"
              className="rounded-full border-gold/30 hover:bg-blue-600/10 hover:border-blue-600/50"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Partagez votre code pour grimper dans le classement ! 🏆
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default OrderSharing;
