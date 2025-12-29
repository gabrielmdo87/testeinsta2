import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import avatarUser2 from "@/assets/avatar-user2.jpg";
import avatarUser3 from "@/assets/avatar-user3.jpg";
import avatarStory5 from "@/assets/avatar-story5.jpg";
import avatarStory6 from "@/assets/avatar-story6.jpg";

const testimonials = [
  {
    name: "Maria S.",
    avatar: avatarUser2,
    text: "Descobri tudo que precisava saber. Incrível como funciona rápido!",
    rating: 5,
  },
  {
    name: "João P.",
    avatar: avatarUser3,
    text: "Ferramenta muito útil, consegui ver as conversas que suspeitava.",
    rating: 5,
  },
  {
    name: "Ana L.",
    avatar: avatarStory5,
    text: "Valeu cada centavo. Agora sei a verdade sobre meu relacionamento.",
    rating: 5,
  },
  {
    name: "Carlos M.",
    avatar: avatarStory6,
    text: "Funcionou perfeitamente, recomendo a todos!",
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
      
      <div className="mt-4 bg-secondary rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={current.avatar}
            alt={current.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <span className="font-semibold text-foreground">{current.name}</span>
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
