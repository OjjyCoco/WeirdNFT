
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll"

const HeroSection: React.FC = () => {
  return (
    <section id="herosection" className="min-h-[90vh] pt-24 flex flex-col md:flex-row items-center justify-center px-6 md:px-12">
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left mb-12 md:mb-0">
        <h1 className="text-5xl md:text-7xl font-bold">
          Welcome to{' '}
          <span className="gradient-text">WeirdNFT</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-md">
          The strangest digital collectibles in the metaverse. Mint your unique piece of weirdness today.
        </p>
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center md:justify-start">
        <Link to="collection" smooth={true} duration={500}>
          <Button
            size="lg"
            className="bg-gradient-weird hover:opacity-90 transition-opacity"
            asChild
          >
            <a className="cursor-pointer">Explore Collection</a>
          </Button>
        </Link>
          <Button size="lg" variant="outline" className="border-weird-purple text-weird-purple hover:bg-weird-purple/10">
            Learn More
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 bg-gradient-weird rounded-2xl blur-3xl opacity-30 animate-pulse-soft"></div>
          <div className="relative w-full h-full bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-weird-purple/50 glow animate-float">
            <img 
              src="https://moccasin-general-crow-156.mypinata.cloud/ipfs/bafybeibcuex3mj7fbrybiri5wlrg3br5n5kdigqlgowhko36k7vrmuk7oi/0.png" 
              alt="Featured NFT" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white font-bold">#00 Weird Genesis</p>
              <p className="text-white/70 text-sm">The first of its kind</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
