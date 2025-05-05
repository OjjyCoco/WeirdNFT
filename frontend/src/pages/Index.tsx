
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MintingInterface from '@/components/MintingInterface';
import NFTCard from '@/components/NFTCard';
import FAQ from '@/components/FAQ';
import { Link } from 'react-scroll';

// Sample NFT data
const nftCollection = [
  {
    id: "#15",
    title: "Weird Bro",
    image: "https://moccasin-general-crow-156.mypinata.cloud/ipfs/bafybeibcuex3mj7fbrybiri5wlrg3br5n5kdigqlgowhko36k7vrmuk7oi/15.png",
    price: "0.01",
    available: true
  },
  {
    id: "#33",
    title: "Weird Jetpacked",
    image: "https://moccasin-general-crow-156.mypinata.cloud/ipfs/bafybeibcuex3mj7fbrybiri5wlrg3br5n5kdigqlgowhko36k7vrmuk7oi/33.png",
    price: "0.01",
    available: true
  },
  {
    id: "#47",
    title: "Weird Blue",
    image: "https://moccasin-general-crow-156.mypinata.cloud/ipfs/bafybeibcuex3mj7fbrybiri5wlrg3br5n5kdigqlgowhko36k7vrmuk7oi/47.png",
    price: "0.01",
    available: false
  },
  {
    id: "#78",
    title: "Weird Golden",
    image: "https://moccasin-general-crow-156.mypinata.cloud/ipfs/bafybeibcuex3mj7fbrybiri5wlrg3br5n5kdigqlgowhko36k7vrmuk7oi/78.png",
    price: "0.01",
    available: true
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <HeroSection />
      
      <section id="collection" className="py-20 px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured <span className="gradient-text">Collection</span></h2>
          <p className="text-muted-foreground">Discover our weirdest digital collectibles</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nftCollection.map((nft) => (
            <NFTCard 
              key={nft.id}
              id={nft.id}
              title={nft.title}
              image={nft.image}
              price={nft.price}
              available={nft.available}
            />
          ))}
        </div>
      </section>
      
      <MintingInterface />
      
      <FAQ />
      
      <footer className="bg-secondary text-secondary-foreground py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">WeirdNFT</h2>
            <p className="text-white/70">The strangest NFTs in the metaverse</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <Link
              to="collection"
              smooth={true}
              duration={500}
              className="hidden md:block cursor-pointer hover:text-weird-purple transition-colors"
            >
              Collection
            </Link>
            <Link
              to="mint"
              smooth={true}
              duration={500}
              className="hidden md:block cursor-pointer hover:text-weird-purple transition-colors"
            >
              Mint
            </Link>
            <Link
              to="faq"
              smooth={true}
              duration={500}
              className="hidden md:block cursor-pointer hover:text-weird-purple transition-colors"
            >
              FAQ
            </Link>
            <Link
              to="herosection"
              smooth={true}
              duration={500}
              className="hidden md:block cursor-pointer hover:text-weird-purple transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} WeirdNFT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
