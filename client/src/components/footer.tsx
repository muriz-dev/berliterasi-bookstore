const Footer = () => {
    return (
        <div className="bg-gray-200 text-black py-4">
            <div className="grid grid-cols-12 pb-5">
                <div className="flex justify-evenly col-span-8">
                   <ul className = "list-none">
                    <li className ="font-bold">Produk MyBookStore</li>
                    <li><a href="">MyBookStore Affiliate</a></li>
                    <li><a href="">Mitra MyBookStore</a></li>
                   </ul>
                    <ul className = "list-none mx-10">
                    <li className ="font-bold">Tentang MyBookStore</li>
                    <li><a href="">Tentang Kami</a></li>
                    <li><a href="">Toko Kami</a></li>
                   </ul>
                     <ul className = "list-none">
                    <li className ="font-bold">Lainnya</li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">Syarat & Ketentuan</a></li>
                    <li><a href="">Kebijakan Privasi</a></li>
                    <li><a href="">Hubungi Kami</a></li>
                    <li><a href="">Kerja Sama</a></li>
                   </ul>
                </div>
                <div className="col-span-4">
                  
                </div>
                <div className="col-span-4">
                 
                </div>
            </div>

            
            <div className="flex justify-center border-t border-gray-300 pt-4">
            © 2026 MyBookStore. All rights reserved.
            </div>
        </div>
    )
}

export default Footer;