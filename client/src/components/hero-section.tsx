const HeroBanner = () => {
  return (
   
    <div className="w-full mt-6 mb-8 max-w-7xl mx-auto px-4">
      
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group h-50 lg:h-70">
          <img 
            src="https://placehold.co/800x400/e53e3e/white?text=Diskon+Merdeka+70%" 
            alt="Promo Utama" 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="lg:col-span-1 grid grid-rows-2 gap-4 h-62.5 lg:h-70">
          
          <div className="relative rounded-2xl overflow-hidden cursor-pointer group h-full">
            <img 
              src="https://placehold.co/400x190/38a169/white?text=Buku+Religi" 
              alt="Promo Religi" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="relative rounded-2xl overflow-hidden cursor-pointer group h-full">
            <img 
              src="https://placehold.co/400x190/319795/white?text=Novel+Fiksi" 
              alt="Promo Novel" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

        </div>

      </div>

    </div>
  )
}

export default HeroBanner;