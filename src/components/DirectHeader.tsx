import { ChevronLeft, Filter, SquarePen } from "lucide-react";

interface DirectHeaderProps {
  username: string;
  onBack: () => void;
}

const DirectHeader = ({ username, onBack }: DirectHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-foreground">
          <ChevronLeft className="w-7 h-7" strokeWidth={2} />
        </button>
        <h1 className="text-xl font-bold text-foreground">{username}</h1>
      </div>
      <div className="flex items-center gap-5">
        <button className="text-foreground">
          <Filter className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button className="text-foreground">
          <SquarePen className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default DirectHeader;
