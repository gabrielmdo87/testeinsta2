import { X, Crown, Lock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface VIPModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  onViewPlans?: () => void;
}

const VIPModal = ({ isOpen, onClose, feature, onViewPlans }: VIPModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-secondary border-border max-w-[320px] rounded-2xl">
        <AlertDialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-accent" />
            </div>
          </div>
          <AlertDialogTitle className="text-foreground text-lg font-bold text-center">
            Conteúdo VIP
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-center text-sm">
            Seja membro VIP para ter acesso {feature}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={onViewPlans}
            className="w-full bg-accent hover:bg-accent/90 py-3 rounded-xl text-sm font-semibold text-accent-foreground transition-colors flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Ver planos VIP
          </button>
          <button
            onClick={onClose}
            className="w-full bg-muted hover:bg-muted/80 py-2.5 rounded-xl text-sm text-muted-foreground transition-colors"
          >
            Voltar
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VIPModal;
