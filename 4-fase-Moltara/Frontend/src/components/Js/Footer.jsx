import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const siteMap = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog", "Contact"],
    },
    {
      title: "Products",
      links: ["Features", "Solutions", "Pricing", "Documentation", "Resources"],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
        "Security",
      ],
    },
    {
      title: "Support",
      links: ["Help Center", "Status", "API", "Community", "Feedback"],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "#" },
    { icon: <FaTwitter />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
    { icon: <FaLinkedin />, url: "#" },
    { icon: <FaGithub />, url: "#" },
  ];

  return (
    <footer className="bg-[#37474F] text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <span className="text-[20vw] font-bold text-[#a71111] whitespace-nowrap">
          MOLTARA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <p className="text-sm leading-6 border-l-2 border-[#2c9c49] pl-4 backdrop-blur-sm bg-gray-900/50 p-4 rounded-r-lg">
              Mais do que vender computadores, nós oferecemos soluções que
              impulsionam o seu potencial. Cada máquina que entregamos
              representa desempenho, inovação e confiança — seja para trabalhar,
              estudar ou jogar. Nosso compromisso é garantir que você tenha a
              tecnologia certa para transformar ideias em resultados.
            </p>
          </div>

          {siteMap.map((section, index) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-[#263238] p-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-[#BB252F] tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-sm hover:text-[#BB252F] transition-colors duration-300 hover:translate-x-2 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#2c9c49]/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#fff]">
              © {currentYear} Moltara, Inc. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-400 hover:text-[#2c9c49] transition-all duration-300 hover:scale-125"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
