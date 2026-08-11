import coverBook from "../assets/cover_book.jpg";
import type { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const getBackPath = () => {
    if (location.pathname === "/login") {
      return "/";
    }
    return "/login";
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center text-slate-900 bg-linear-to-r from-cyan-50 via-white to-indigo-50 p-4 md:p-8">
        <div className="flex flex-col items-start w-full max-w-5xl">
          <Link
            to={getBackPath()}
            className="flex items-center font-medium gap-2 mb-5 rounded-md hover:underline px-3 py-1"
          >
            <svg
              className="w-6 h-6 text-black inline-block"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
            Kembali
          </Link>
          <main className="w-full bg-white rounded-3xl shadow-xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
              <div className="hidden md:flex flex-col justify-center items-center w-full h-full">
                <img
                  src={coverBook}
                  alt="Berliterasi Bookstore Cover"
                  className="w-full h-auto max-h-125 object-cover rounded-2xl shadow-md"
                />
                <div className="flex flex-row gap-2">
                  <a href="#" className="mt-3 bg-black rounded-sm p-1">
                    <svg
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="mt-3 bg-black rounded-sm p-1">
                    <svg
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                    </svg>
                  </a>
                  <a href="#" className="mt-3 bg-black rounded-sm p-1">
                    <svg
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>

                <p className="font-light text-sm mt-2.5 text-center">
                  © 2026 Berliterasi Bookstore
                </p>
              </div>

              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
