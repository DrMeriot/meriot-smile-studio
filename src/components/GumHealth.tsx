const GumHealth = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8">
            Des gencives saines pour un sourire durable
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Les maladies parodontales commencent souvent par une simple gingivite : 
              gencives rouges, sensibles ou qui saignent. Bien traitée, elle disparaît rapidement.
            </p>
            
            <p>
              Sans prise en charge, elle peut évoluer en <strong className="text-foreground">parodontite</strong>, 
              une atteinte plus profonde pouvant entraîner un déchaussement des dents.
            </p>
            
            <p>
              Grâce à des traitements spécialisés, il est possible de stopper la maladie 
              et préserver votre sourire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GumHealth;
