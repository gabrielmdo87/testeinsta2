import { AlertTriangle } from "lucide-react";

const CTAWarning = () => {
  return (
    <div className="mx-4 mt-4 bg-destructive/20 border border-destructive/50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <span className="text-destructive font-bold text-sm">Prazo se encerra agora!</span>
      </div>
      <p className="text-destructive/90 text-xs">
        Não saia desta página, a espionagem não pode ser realizada novamente no mesmo dispositivo.
      </p>
    </div>
  );
};

export default CTAWarning;
