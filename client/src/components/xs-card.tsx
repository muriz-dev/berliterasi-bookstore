const XSCard = () => {
    return (

        <div className="mt-12 w-full">
            {/* 1. Judul Section */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Kategori Terlaris
            </h2>

            {/* 2. Container Pembungkus (Horizontal Scroll) */}
            {/* overflow-x-auto bikin bisa di-scroll ke samping, pb-4 ngasih jarak bawah */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">

                {/* CARD 1 */}
                {/* shrink-0 itu WAJIB biar card-nya ga memendek otomatis pas layarnya kurang lebar */}
                <div className="relative w-[220px] md:w-[250px] h-[130px] rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
                    {/* Gambar Background (Gua tambahin efek zoom pas di-hover biar cakep) */}
                    <img
                        src="https://via.placeholder.com/400x200?text=Komik"
                        alt="Komik Aksi & Petualangan"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Efek Gradasi Gelap (Gradient Overlay) */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

                    {/* Teks Kategori */}
                    <div className="absolute bottom-0 left-0 p-3 md:p-4">
                        <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                            Komik Aksi & Petualangan
                        </h3>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="relative w-[220px] md:w-[250px] h-[130px] rounded-xl overflow-hidden group cursor-pointer shrink-0 snap-start">
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

                {/* Silakan copy-paste Card di atas sebanyak yang lu butuhin... */}

            </div>
        </div>
    )
}
export default XSCard;