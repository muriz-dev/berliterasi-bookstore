const Card_sm = () => {
    return (

        <div className="flex flex-wrap gap-4 md:gap-5 justify-start">

            <div className="max-w-50 bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex flex-col gap-4 transition-all hover:shadow-lg">


                <div className="relative aspect-2/3 w-full bg-white rounded-lg flex items-center justify-center p-3 border border-gray-100">


                    <img src="../public/img/cover-buku1.jpeg" alt="Cover" className="h-full object-contain" />


                    <span className="absolute top-2 left-2 flex items-center gap-1 bg-gray-50 text-gray-700 text-xs font-medium px-2 py-0.5 rounded border">
                        ID
                    </span>


                    <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col gap-2">

                    <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                        <p>1rb+ terjual</p>
                        <p>Adolf Hitler</p>
                    </div>


                    <h3 className="font-semibold text-sm text-black line-clamp-2 leading-tight">
                        Main Kampf
                    </h3>

                    <div className="mt-1.5 flex items-end gap-2.5 flex-wrap">
                        <p className="font-bold text-lg text-black">Rp95.200</p>
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-sm text-gray-400 line-through">Rp119.000</p>
                            <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">20%</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="max-w-50 bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex flex-col gap-4 transition-all hover:shadow-lg">


                <div className="relative aspect-2/3 w-full bg-white rounded-lg flex items-center justify-center p-3 border border-gray-100">


                    <img src="../public/img/cover2.jpg" alt="Cover" className="h-full object-contain" />


                    <span className="absolute top-2 left-2 flex items-center gap-1 bg-gray-50 text-gray-700 text-xs font-medium px-2 py-0.5 rounded border">
                        ID
                    </span>


                    <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col gap-2">

                    <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                        <p>1rb+ terjual</p>
                        <p>Adolf Hitler</p>
                    </div>


                    <h3 className="font-semibold text-sm text-black line-clamp-2 leading-tight">
                        1000+ Fakta Nazi Jerman yang Tidak Diketahui Banyak Orang
                    </h3>

                    <div className="mt-1.5 flex items-end gap-2.5 flex-wrap">
                        <p className="font-bold text-lg text-black">Rp95.200</p>
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-sm text-gray-400 line-through">Rp119.000</p>
                            <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">20%</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Card_sm;