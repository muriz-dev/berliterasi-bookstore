// import { useState } from "react";
import AuthLayout from "../layouts/auth";
import Input from "../components/Input";
// import Alert from '../components/Alert';

const ForgotPassword = () => {
  // const [username, setUsername] = useState('');
  return (
    <AuthLayout>
      <form className="w-full flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-2 text-center">
          Berliterasi Bookstore
        </h1>
        <h4 className="text-small mb-2 font-medium text-slate-600 text-center">
          Lupa Kata Sandi?
        </h4>
        <p className="font-light text-center mb-3">
          Masukkan email Anda. Kami akan mengirimkan tautan untuk mengatur ulang
          kata sandi Anda.
        </p>

        <Input label="Email" type="email" id="email" name="email" />

        <button
          type="submit"
          className="text-white w-full max-w-lg bg-blue-500 mt-6 border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg shadow-sm font-medium text-sm px-4 py-2.5 focus:outline-none transition-colors"
          disabled
        >
          Kirim
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
