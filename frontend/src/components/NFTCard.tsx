
import React from 'react';
import { Button } from "@/components/ui/button";

interface NFTCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
  available: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ id, title, image, price, available }) => {
  return (
    <div className="card-hover bg-background rounded-xl overflow-hidden border border-border shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {!available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold px-4 py-2 bg-weird-purple rounded-md">SOLD OUT</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{id}</p>
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <div className="bg-weird-purple/10 px-3 py-1 rounded-full">
            <p className="text-weird-purple font-medium">{price} ETH</p>
          </div>
        </div>
        <Button 
          className={`w-full ${available ? 'bg-gradient-weird hover:opacity-90' : 'bg-muted cursor-not-allowed'}`} 
          disabled={!available}
        >
          {available ? 'Mint Now' : 'Sold Out'}
        </Button>
      </div>
    </div>
  );
};

export default NFTCard;
