import instaespiaoLogo from "@/assets/instaespiao-logo.webp";

const CTAHeader = () => {
  return (
    <div className="py-6 px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <img 
          src={instaespiaoLogo} 
          alt="InstaEspião" 
          className="w-14 h-14 object-contain"
        />
      </div>
      <h1 className="text-xl font-bold text-foreground">
        A maior ferramenta de <span className="text-accent">Stalker</span> do Brasil
      </h1>
    </div>
  );
};

export default CTAHeader;
