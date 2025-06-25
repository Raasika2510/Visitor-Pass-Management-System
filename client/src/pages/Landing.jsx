import { useNavigate, Outlet, useLocation } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRootPage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

   
      <header className="bg-violet-800 p-6 rounded-b-2xl shadow-lg text-center sticky top-0 z-50">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <img
            src="src/assets/College.png"
            alt="College Logo"
            className="w-32 h-32 object-contain rounded-full"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-50">
              GURU NANAK COLLEGE (AUTONOMOUS)
            </h1>
            <p className="text-amber-50 text-sm md:text-base font-medium">
              REACCREDITED AT “A++” GRADE BY NAAC | AFFILIATED TO UNIVERSITY OF MADRAS
            </p>
            <p className="text-amber-50 text-sm md:text-base font-medium">
              AN ISO 5001:2015 CERTIFIED INSTITUTE
            </p>
          </div>
        </div>
        <hr />
        <h2 className="text-2xl md:text-3xl font-bold text-amber-50 mt-6">
          VISITOR PASS MANAGEMENT SYSTEM
        </h2>
      </header>

 
      <main className="flex-grow p-8">
        <section className="max-w-6xl mx-auto">

          {/* Show Stakeholders only on root page */}
          {isRootPage ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                STAKEHOLDERS
              </h2>
              <div className="flex flex-col md:flex-row justify-center gap-8 bg-violet-400 shadow-xl rounded-2xl p-10">
                {[
                  { src: "gate.png", label: "Main Gate", to: "/security_login" },
                  { src: "setting.png", label: "Admin", to: "/admin_login" },
                  { src: "qr-code.png", label: "QR Access", to: "/scan_page" },
                ].map(({ src, label, to }) => (
                  <button
                    onClick={() => navigate(to)}
                    key={label}
                    className="flex flex-col items-center gap-4 w-44 md:w-52 p-6 bg-violet-600 rounded-2xl hover:bg-violet-700 transition-colors shadow-md"
                  >
                    <img
                      src={`src/assets/${src}`}
                      alt={label}
                      className="w-20 h-20 object-contain rounded-lg hover:scale-105 transition-transform duration-200"
                    />
                    <h3 className="text-lg font-medium text-white">{label}</h3>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <Outlet /> // Render nested routes like SecurityLogin
          )}
        </section>
      </main>

      <footer className="bg-violet-800 text-center p-4 rounded-t-2xl shadow-lg">
        <p className="text-amber-50 text-sm font-light">
          Developed by{" "}
          <a
            href="https://github.com/Raasika2510"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            Raasika M
          </a>
        </p>
      </footer>
    </div>
  );
}
