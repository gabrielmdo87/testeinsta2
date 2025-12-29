import { Shield, Lock } from "lucide-react";

const CTAFooter = () => {
  return (
    <div className="mx-4 mt-8 mb-8">
      {/* Guarantee badge */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-green-500 font-bold text-lg mb-1">
          Garantia de 07 Dias
        </h3>
        <p className="text-foreground/80 text-sm">
          Adquira a ferramenta Stalkea.ai com total segurança. Se não ficar satisfeito, 
          devolvemos 100% do seu dinheiro.
        </p>
      </div>
      
      {/* Security badges */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Lock className="w-4 h-4" />
          <span>Pagamento Seguro</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Shield className="w-4 h-4" />
          <span>Dados Protegidos</span>
        </div>
      </div>
      
      {/* Copyright */}
      <p className="text-center text-muted-foreground text-xs mt-6">
        © 2024 Stalkea.ai - Todos os direitos reservados
      </p>
    </div>
  );
};

export default CTAFooter;
