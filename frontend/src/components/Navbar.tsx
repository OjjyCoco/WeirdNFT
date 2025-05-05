import React from 'react';
import { Link } from 'react-scroll';
import ConnectWalletButton from "@/components/ConnectWalletButton";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-background/80 backdrop-blur-sm fixed top-0 z-50">
        <Link
          to="herosection"
          smooth={true}
          duration={500}
          className="text-2xl font-bold gradient-text cursor-pointer"
        >
          WeirdNFT
        </Link>
      <div className="flex items-center space-x-4">
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
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
