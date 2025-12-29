import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "A ferramenta é realmente funcional?",
    answer: "Sim! Nossa ferramenta utiliza tecnologia avançada para acessar informações públicas e privadas de perfis do Instagram de forma totalmente segura e anônima.",
  },
  {
    question: "A pessoa vai saber que eu estou espionando?",
    answer: "Não. Todo o processo é 100% anônimo. A pessoa nunca saberá que você acessou as informações do perfil dela.",
  },
  {
    question: "Funciona em perfis privados?",
    answer: "Sim! Nossa tecnologia consegue acessar tanto perfis públicos quanto privados, incluindo stories, direct e localização.",
  },
  {
    question: "Posso espionar qualquer pessoa?",
    answer: "Sim, você pode espionar qualquer perfil do Instagram, independente das configurações de privacidade.",
  },
  {
    question: "Quanto tempo para ter acesso?",
    answer: "O acesso é liberado em até 5 minutos após a confirmação do pagamento. Você receberá tudo por email.",
  },
  {
    question: "O que me garante segurança?",
    answer: "Oferecemos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro sem perguntas.",
  },
];

const CTAFaq = () => {
  return (
    <div className="mx-4 mt-8">
      <h2 className="text-foreground font-bold text-lg mb-4 text-center">
        Perguntas Frequentes
      </h2>
      
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-secondary rounded-xl border-none px-4"
          >
            <AccordionTrigger className="text-foreground text-sm font-medium hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CTAFaq;
