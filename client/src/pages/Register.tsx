// import { useState } from 'react';
import AuthLayout from "../layouts/auth";
import Input from "../components/Input";

const Register = () => {
  // const [username, setUsername] = useState('');
  return (
    <AuthLayout>
      <form className="w-full max-w-lg flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-2 text-center">
          Berliterasi Bookstore
        </h1>
        <h4 className="text-small mb-6 font-medium text-slate-600 text-center">
          Daftar Akun
        </h4>

        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          fieldClassName="w-full max-w-lg"
        />
        <Input
          label="Nama Lengkap"
          type="text"
          id="nama_lengkap"
          name="nama_lengkap"
        />

        <div className="flex flex-row gap-2 w-full">
          <Input
            fieldClassName="flex-1"
            label="Password"
            type="password"
            id="password"
            name="password"
          />
          <Input
            fieldClassName="flex-1"
            label="Konfirmasi Password"
            type="password"
            id="konfirmasi-password"
            name="konfirmasi-password"
          />
        </div>

        <div className="flex items-center mt-4 w-full justify-start max-w-lg">
          <input
            type="checkbox"
            id="syarat"
            name="syarat"
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="syarat"
            className="inline-block ml-2 text-sm text-slate-700"
          >
            Saya menyetujui{" "}
            <a href="#" className="text-blue-600 hover:underline">
              syarat dan ketentuan
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="text-white w-full max-w-lg bg-blue-500 mt-6 border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg shadow-sm font-medium text-sm px-4 py-2.5 focus:outline-none transition-colors"
          disabled
        >
          Daftar
        </button>

        <p className="mt-6 text-sm text-slate-600">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="text-black underline hover:text-blue-600 font-medium"
          >
            Masuk
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
