const XSCard = () => {
    return (

        <div className="mt-12 w-full">
          
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Kategori Terlaris
            </h2>

        
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">

                <div className="relative w-[220px] md:w-[250px] h-[130px] rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
           
                    <img
                        src="https://via.placeholder.com/400x200?text=Komik"
                        alt="Komik Aksi & Petualangan"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

            
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

                  
                    <div className="absolute bottom-0 left-0 p-3 md:p-4">
                        <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                            Komik Aksi & Petualangan
                        </h3>
                    </div>
                </div>

              
                <div className="relative w-55 md:w-[250px] h-[130px] rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
                    <img
                        src="https://via.placeholder.com/400x200?text=Romantis"
                        alt="Fiksi Romantis"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 md:p-4">
                        <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                            Fiksi Romantis
                        </h3>
                    </div>
                </div>

               

            </div>
        </div>
    )
}
export default XSCard;