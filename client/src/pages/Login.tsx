// import { useState } from "react";
import AuthLayout from "../layouts/auth";
import Input from "../components/Input";
// import Alert from '../components/Alert';

const Login = () => {
  // const [username, setUsername] = useState('');
  return (
    <AuthLayout>
      <form className="w-full flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-2 text-center">
          Berliterasi Bookstore
        </h1>
        <h4 className="text-small mb-6 font-medium text-slate-600 text-center">
          Silakan masukkan email dan password untuk melanjutkan
        </h4>

        <Input label="Email" type="email" id="email" name="email" />
        <Input label="Password" type="password" id="password" name="password" />

        <a
          href="/forgot-password"
          className="mt-2 underline hover:text-blue-600 w-full max-w-lg text-right"
        >
          Lupa Kata Sandi?
        </a>

        <button
          type="submit"
          className="text-white w-full max-w-lg bg-blue-500 mt-6 border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg shadow-sm font-medium text-sm px-4 py-2.5 focus:outline-none transition-colors"
          disabled
        >
          Login
        </button>

        <p className="mt-5">Atau:</p>

        <button
          type="button"
          className="flex items-center gap-2 justify-center w-full max-w-lg bg-white mt-5 border border-gray-300 cursor-pointer hover:border-black focus:border-black disabled:bg-gray-100 disabled:text-gray-400 rounded-lg shadow-xs font-medium text-sm px-4 py-2.5 focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
              clip-rule="evenodd"
            />
          </svg>
          Masuk dengan Google
        </button>

        <p className="mt-6 text-sm text-slate-600">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-black underline hover:text-blue-600 font-medium"
          >
            Daftar
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
