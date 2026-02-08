const ContactPage = () => {
  return (
    <div className="container mx-auto px-8 pt-32 pb-20 sm:pt-36">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Cont&aacute;ctanos</h1>
        <p className="text-lg text-gray-400 mt-4">Nos encantar&iacute;a saber de ti. As&iacute; es como puedes contactarnos.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Hablemos</h2>
          <p className="text-gray-400 mb-6">Santo Domingo, Rep. Dom.</p>
          <div className="space-y-4 text-gray-300">
            <p>
              WhatsApp:{" "}
              <a href="https://wa.me/18093902905" className="text-white hover:text-blue-300">
                +1 809-390-2905
              </a>
            </p>
            <p>
              Llamadas:{" "}
              <a href="tel:+18097569944" className="text-white hover:text-blue-300">
                +1 809-756-9944
              </a>
            </p>
            <p>
              Correo electr&oacute;nico:{" "}
              <a href="mailto:lauradco@icloud.com" className="text-white hover:text-blue-300">
                lauradco@icloud.com
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a href="https://www.instagram.com/engagencyrd" className="text-white hover:text-blue-300" target="_blank" rel="noreferrer">
                @engagencyrd
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Env&iacute;anos un mensaje</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-400 mb-2">Nombre</label>
              <input type="text" id="name" name="name" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-400 mb-2">Correo electr&oacute;nico</label>
              <input type="email" id="email" name="email" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-400 mb-2">Mensaje</label>
              <textarea id="message" name="message" rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
