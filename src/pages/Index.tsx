import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { AppStep, BoxSize, PlacedChocolate } from '@/types/chocolate';
import IntroScreen from '@/components/IntroScreen';
import BoxSelection from '@/components/BoxSelection';
import ChocolateCustomizer from '@/components/ChocolateCustomizer';
import MessageCard from '@/components/MessageCard';
import OrderConfirmation from '@/components/OrderConfirmation';
import SharedOrderView from '@/components/SharedOrderView';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState<AppStep>('intro');
  const [selectedBox, setSelectedBox] = useState<BoxSize | null>(null);
  const [placedChocolates, setPlacedChocolates] = useState<PlacedChocolate[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState<string | null>(null);
  const [sharedCode, setSharedCode] = useState<string | null>(null);

  // Check for shared order code in URL
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setSharedCode(code);
    }
  }, [searchParams]);

  const handleCloseSharedView = () => {
    setSharedCode(null);
    setSearchParams({});
  };

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

  // Show shared order view if code is present
  if (sharedCode) {
    return <SharedOrderView code={sharedCode} onClose={handleCloseSharedView} />;
  }

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
