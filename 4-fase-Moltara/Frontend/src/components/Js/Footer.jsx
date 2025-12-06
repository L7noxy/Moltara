import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import "../Css/Footer.css";

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
    <footer className="container-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>MOLTARA</h2>
          <p>
            Mais do que vender computadores, nós oferecemos soluções que
            impulsionam o seu potencial.
          </p>
        </div>

        <div className="footer-links-container">
          {siteMap.map((section, index) => (
            <div key={index} className="footer-section">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Moltara, Inc. All rights reserved.</p>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a key={index} href={social.url}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
