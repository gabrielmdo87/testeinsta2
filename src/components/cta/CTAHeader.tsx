import { Search } from "lucide-react";

const CTAHeader = () => {
  return (
    <div className="py-6 px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
          <Search className="w-6 h-6 text-accent-foreground" />
        </div>
        <span className="text-2xl font-bold text-foreground">STALKEA.AI</span>
      </div>
      <h1 className="text-xl font-bold text-foreground">
        A maior ferramenta de <span className="text-accent">Stalker</span> do Brasil
      </h1>
    </div>
  );
};

export default CTAHeader;
