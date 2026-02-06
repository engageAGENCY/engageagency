import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative text-white py-14 px-6 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.35),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.35),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(236,72,153,0.35),transparent_30%),radial-gradient(circle_at_0%_60%,rgba(52,211,153,0.25),transparent_28%),#0b0b0f] bg-[length:400%_100%] animate-gradient-wave opacity-90" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Acerca de Nosotros</h3>
          <p className="text-gray-200/80">
            Somos un equipo altamente capacitado. Con el conocimiento y el granito de arena de cada miembro,
            construimos una gran familia que aporta y genera las mejores ideas para sus proyectos.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Enlaces R&aacute;pidos</h3>
          <ul className="space-y-2 text-gray-200/80">
            <li><Link href="/career" className="hover:text-white">Carrera</Link></li>
            <li><Link href="/about" className="hover:text-white">Acerca de Nosotros</Link></li>
            <li><Link href="/faq" className="hover:text-white">Preguntas Frecuentes</Link></li>
            <li><Link href="/contact" className="hover:text-white">Cont&aacute;ctanos</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Informaci&oacute;n de Contacto</h3>
          <p className="text-gray-200/80">Ubicaci&oacute;n: Santo Domingo, Rep. Dom.</p>
          <p className="text-gray-200/80">
            WhatsApp:{" "}
            <a href="https://wa.me/18093902905" className="text-white/90 hover:text-white">
              +1 809-390-2905
            </a>
          </p>
          <p className="text-gray-200/80">
            Tel&eacute;fono:{" "}
            <a href="tel:+18097569944" className="text-white/90 hover:text-white">
              +1 809-756-9944
            </a>
          </p>
          <p className="text-gray-200/80">
            Correo:{" "}
            <a href="mailto:lauradco@icloud.com" className="text-white/90 hover:text-white">
              lauradco@icloud.com
            </a>
          </p>
          <p className="text-gray-200/80">
            Instagram:{" "}
            <a href="https://www.instagram.com/engagencyrd" className="text-white/90 hover:text-white" target="_blank" rel="noreferrer">
              @engagencyrd
            </a>
          </p>
        </div>
        <div className="md:col-span-4 text-center mt-8 border-t border-white/10 pt-8">
          <p className="text-sm text-white font-semibold inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur">
            Construido por
            <a href="https://www.planosweb.com" className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave font-bold" target="_blank" rel="noreferrer">
              Planosweb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
