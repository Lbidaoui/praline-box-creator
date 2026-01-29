import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppStep, BoxSize, PlacedChocolate } from '@/types/chocolate';
import IntroScreen from '@/components/IntroScreen';
import BoxSelection from '@/components/BoxSelection';
import ChocolateCustomizer from '@/components/ChocolateCustomizer';
import MessageCard from '@/components/MessageCard';
import OrderConfirmation from '@/components/OrderConfirmation';

const Index = () => {
  const [step, setStep] = useState<AppStep>('intro');
  const [selectedBox, setSelectedBox] = useState<BoxSize | null>(null);
  const [placedChocolates, setPlacedChocolates] = useState<PlacedChocolate[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState<string | null>(null);

  const handleBoxSelect = (box: BoxSize) => {
    setSelectedBox(box);
    setStep('customize');
  };

  const handleCustomizeComplete = (placed: PlacedChocolate[]) => {
    setPlacedChocolates(placed);
    setStep('message');
  };

  const handleMessageComplete = (msg: string | null, name: string | null) => {
    setMessage(msg);
    setRecipientName(name);
    setStep('confirmation');
  };

  const handleNewOrder = () => {
    setStep('intro');
    setSelectedBox(null);
    setPlacedChocolates([]);
    setMessage(null);
    setRecipientName(null);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 'intro' && (
          <IntroScreen onStart={() => setStep('box-selection')} />
        )}

        {step === 'box-selection' && (
          <BoxSelection
            onSelect={handleBoxSelect}
            onBack={() => setStep('intro')}
          />
        )}

        {step === 'customize' && selectedBox && (
          <ChocolateCustomizer
            box={selectedBox}
            onComplete={handleCustomizeComplete}
            onBack={() => setStep('box-selection')}
          />
        )}

        {step === 'message' && selectedBox && (
          <MessageCard
            onComplete={handleMessageComplete}
            onBack={() => setStep('customize')}
          />
        )}

        {step === 'confirmation' && selectedBox && (
          <OrderConfirmation
            box={selectedBox}
            placedChocolates={placedChocolates}
            message={message}
            recipientName={recipientName}
            onNewOrder={handleNewOrder}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
