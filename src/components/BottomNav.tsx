import { Home, Search, Plus, Clapperboard } from "lucide-react";
import avatarMain from "@/assets/avatar-main.jpg";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/30 px-6 py-2.5 z-50">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <button className="text-foreground p-1">
          <Home className="w-7 h-7 fill-current" strokeWidth={2.5} />
        </button>
        <button className="text-foreground p-1">
          <Search className="w-7 h-7" strokeWidth={1.5} />
        </button>
        <button className="text-foreground p-1">
          <Plus className="w-7 h-7" strokeWidth={1.5} />
        </button>
        <button className="text-foreground p-1">
          <Clapperboard className="w-7 h-7" strokeWidth={1.5} />
        </button>
        <button className="p-1">
          <img
            src={avatarMain}
            alt="Profile"
            className="w-7 h-7 rounded-full object-cover"
          />
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
