import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import testimonialMaria from "@/assets/testimonial-maria.webp";
import testimonialLuis from "@/assets/testimonial-luis.webp";
import testimonialGustavo from "@/assets/testimonial-gustavo.webp";
import testimonialElisa from "@/assets/testimonial-elisa.jpg";

const testimonials = [
  {
    name: "Maria",
    location: "São Paulo, SP",
    avatar: testimonialMaria,
    text: "gente eu tava desconfiada faz tempo e finalmente consegui ver tudo... agora sei oq tava acontecendo por trás. valeu muito a pena",
    rating: 5,
  },
  {
    name: "Luis",
    location: "Rio de Janeiro, RJ",
    avatar: testimonialLuis,
    text: "cara, funcionou em menos de 5 minutos. vi as conversas que eu precisava ver e agora to mais tranquilo. recomendo demais",
    rating: 5,
  },
  {
    name: "Gustavo",
    location: "Belo Horizonte, MG",
    avatar: testimonialGustavo,
    text: "eu tinha certeza que tinha algo errado e com isso aqui consegui confirmar. dói saber a verdade mas é melhor do que ficar no escuro né",
    rating: 5,
  },
  {
    name: "Elisa",
    location: "Curitiba, PR",
    avatar: testimonialElisa,
    text: "no começo achei que era golpe kkkk mas resolvi testar e funcionou real. consegui ver stories e tudo mais. super indico!!",
    rating: 5,
  },
];

const CTATestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="mx-4 mt-8">
      <h2 className="text-foreground font-bold text-lg mb-1 text-center">
        Veja o que falam as pessoas que usam o InstaEspião
      </h2>
      
      <div key={currentIndex} className="mt-4 bg-secondary rounded-2xl p-4 animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={current.avatar}
            alt={current.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <span className="font-semibold text-foreground">{current.name}</span>
            <p className="text-xs text-muted-foreground">{current.location}</p>
            <div className="flex gap-0.5">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-foreground/90 text-sm italic">"{current.text}"</p>
        
        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prevTestimonial}
            className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <div className="flex gap-1">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
      
      <button className="w-full mt-4 text-accent text-sm font-medium hover:underline">
        + Clique para ver mais relatos de compras
      </button>
    </div>
  );
};

export default CTATestimonials;
