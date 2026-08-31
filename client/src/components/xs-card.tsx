<div className="relative w-[250px] h-[150px] rounded-xl overflow-hidden group cursor-pointer">
  
  {/* 1. GAMBAR (Background) */}
  <img 
    src="url-gambar-anda.jpg" 
    alt="Kategori" 
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* 2. GRADIENT OVERLAY (Efek Gelap di Bawah) */}
  {/* bg-gradient-to-t artinya gradasi bergerak ke atas (to top) */}
  {/* from-black/80 artinya mulai dari hitam pekat 80%, to-transparent artinya memudar hilang */}
  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

  {/* 3. TEKS (Berada di Atas Gradasi) */}
  <div className="absolute bottom-0 left-0 p-4">
    <h3 className="text-white font-bold text-lg">
      Komik Aksi & Petualangan
    </h3>
  </div>

</div>