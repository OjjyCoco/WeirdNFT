
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is WeirdNFT?",
    answer: "WeirdNFT is a collection of eccentric digital collectibles living on the Ethereum blockchain and made for showcasing development skills. Each NFT is algorithmically generated with various traits of different rarities."
  },
  {
    question: "How do I mint a WeirdNFT?",
    answer: "To mint a WeirdNFT, you need to connect your Ethereum wallet, select how many NFTs you'd like to mint, and then confirm the transaction. Gas fees will apply as with any Ethereum transaction. You also need to be registered on the whitelist to be able to mint."
  },
  {
    question: "How many WeirdNFTs can I mint?",
    answer: "You can mint as much NFT as you like, there's no limit to how many transactions you can make until we sell out."
  },
  {
    question: "What is the total supply?",
    answer: "The total supply of WeirdNFTs is limited to 100 unique collectibles. For testing purpose, the owner of the WeirdNFT contract has already minted the first WeirdNFT#00"
  },
  {
    question: "When will I receive my WeirdNFT after minting?",
    answer: "Once your transaction is confirmed on the Ethereum blockchain, your NFT will appear in your connected wallet and on marketplaces like OpenSea."
  }
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 px-6 md:px-12 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="text-muted-foreground">Everything you need to know about WeirdNFT</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
