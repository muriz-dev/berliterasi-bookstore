import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Input } from '@headlessui/react'
import { Button } from '@headlessui/react'



const Navbar = () => {
  return (
    <nav className="container-fluid border-b border-gray-300 bg-white text-black px-6 py-4">
      <div className="grid grid-cols-12">
        {/* Logo */}
        <h1 className="flex items-center justify-center text-xl font-bold col-span-2">Berliterasi-BookStore</h1>
        {/* Ini DropDown Kategori */}
        <div className=" col-span-8 px-8 flex justify-center">
          <Menu>
            <MenuButton className="flex items-center justify-between w-32 px-3 py-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg> Category
            </MenuButton>
            <MenuItems anchor="bottom">
              <MenuItem>
                <a className="block data-focus:bg-blue-100" href="/settings">
                  Tes
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>

          {/* Ini Search */}
          <Input name="full_name" className="mx-10 ps-5 w-full border rounded border-gray-300" type="text" placeholder="Cari Buku" />


          {/* Ini Catalognya */}
          <a href="" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </a>

        </div>


        {/* Ini Button Login, Daftar */}
        <div className="col-span-2 flex items-center justify-center">
          <Button className="justify-center inline-flex items-center gap-2 w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
            Login
          </Button>
          <Button className="justify-center text-center ms-2 inline-flex items-center w-20 gap-2 rounded-md bg-sky-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
            Daftar
          </Button>
        </div>
      </div>
    </nav>
  );
};



export default Navbar;
