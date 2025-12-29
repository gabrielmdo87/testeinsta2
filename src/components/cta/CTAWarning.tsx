import { AlertTriangle } from "lucide-react";

const CTAWarning = () => {
  return (
    <div className="mx-4 mt-6">
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-foreground/90 text-sm">
            As informações acessadas são extremamente sensíveis. Use com responsabilidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTAWarning;
