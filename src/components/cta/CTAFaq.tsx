import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "A ferramenta realmente funciona?",
    answer: "Sim! Nossa ferramenta utiliza tecnologia avançada para acessar informações públicas e privadas de perfis do Instagram de forma totalmente segura e anônima.",
  },
  {
    question: "A pessoa vai saber que eu stalkeei o perfil dela?",
    answer: "Não. Todo o processo é 100% anônimo. A pessoa nunca saberá que você acessou as informações do perfil dela.",
  },
  {
    question: "Funciona em perfis privados?",
    answer: "Sim! Nossa tecnologia consegue acessar tanto perfis públicos quanto privados, incluindo stories, direct e localização.",
  },
  {
    question: "Preciso instalar alguma coisa?",
    answer: "Não! Tudo funciona diretamente pelo navegador. Você não precisa instalar nenhum aplicativo ou extensão.",
  },
  {
    question: "Como funciona a garantia?",
    answer: "Oferecemos garantia de 30 dias. Se não ficar satisfeito por qualquer motivo, devolvemos 100% do seu dinheiro sem perguntas.",
  },
  {
    question: "Quanto tempo tenho acesso?",
    answer: "O acesso é vitalício! Uma vez que você adquire, tem acesso para sempre às funcionalidades da plataforma.",
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
