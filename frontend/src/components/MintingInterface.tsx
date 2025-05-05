
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Wallet, Plus, Minus } from 'lucide-react';

const MintingInterface: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { toast } = useToast();

  const maxMint = 5;
  const price = 0.01;
  const totalPrice = price * quantity;

  const handleMint = () => {
    setIsMinting(true);
    
    // Simulate minting delay
    setTimeout(() => {
      setIsMinting(false);
      toast({
        title: "Success!",
        description: `You've minted ${quantity} WeirdNFT${quantity > 1 ? 's' : ''}!`,
        duration: 5000,
      });
    }, 2000);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxMint) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <section id="mint" className="py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Mint Your <span className="gradient-text">WeirdNFT</span></h2>
          <p className="text-muted-foreground">Join the weird revolution by minting your unique NFT today</p>
        </div>

        <Card className="backdrop-blur-sm border-weird-purple/20">
          <CardHeader>
            <CardTitle>Mint WeirdNFT</CardTitle>
            <CardDescription>Mint up to {maxMint} NFTs per transaction. Price: {price} ETH each</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Quantity</label>
                <span className="text-sm text-weird-purple">{quantity} of {maxMint}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseQuantity} 
                  disabled={quantity <= 1}
                  className="border-weird-purple/30 text-weird-purple"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Slider 
                  value={[quantity]} 
                  min={1} 
                  max={maxMint}
                  step={1}
                  onValueChange={(value) => setQuantity(value[0])}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseQuantity}
                  disabled={quantity >= maxMint}
                  className="border-weird-purple/30 text-weird-purple"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-secondary/5 rounded-lg border border-border">
              <div>
                <p className="text-sm">Total Cost</p>
                <p className="text-xl font-bold">{totalPrice.toFixed(2)} ETH</p>
              </div>
              <p className="text-sm text-muted-foreground">+ gas fees</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-gradient-weird hover:opacity-90 transition-opacity text-lg py-6"
              onClick={handleMint}
              disabled={isMinting}
            >
              {isMinting ? (
                <>
                  <span className="animate-spin mr-2">◌</span> Minting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" /> Mint Now
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 p-4 border border-yellow-200 rounded-lg bg-yellow-50 text-yellow-800 text-sm">
          <p className="font-medium">Note: This is a demo minting interface.</p>
          <p>In a real NFT project, this would connect to your wallet and interact with the blockchain.</p>
        </div>
      </div>
    </section>
  );
};

export default MintingInterface;
