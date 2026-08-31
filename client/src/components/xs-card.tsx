import ScrollContainer from 'react-indiana-drag-scroll';

const XSCard = () => {
    return (
        <div className="mt-4 w-full">
          
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Kategori Terlaris
            </h2>

            
            <ScrollContainer className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">

              
                <div className="relative w-55 md:w-62.5 h-32.5 rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
                    <img
                        src="../public/img/cover-buku1.jpeg"
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

                
                <div className="relative w-55 md:w-62.5 h-32.5 rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
                    <img
                        src="../public/img/Flag_of_Germany_(1935–1945).svg.webp"
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
                
                <div className="relative w-55 md:w-62.5 h-32.5 rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
                    <img
                        src="../public/img/cover-buku1.jpeg"
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

                
                <div className="relative w-55 md:w-62.5 h-32.5 rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
                    <img
                        src="../public/img/Flag_of_Germany_(1935–1945).svg.webp"
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

                <div className="relative w-55 md:w-62.5 h-32.5 rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
                    <img
                        src="../public/img/cover-buku1.jpeg"
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

                
                <div className="relative w-55 md:w-62.5 h-32.5 rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
                    <img
                        src="../public/img/Flag_of_Germany_(1935–1945).svg.webp"
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

               
                
        
            </ScrollContainer>
            
        </div>
    )
}
export default XSCard;