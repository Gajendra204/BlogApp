import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../Logo";


function Footer() {
 

  return (
    <section className="py-16 bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Copyright */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <Logo width="100px" />
            </div>
            <p className="text-sm">&copy; 2023 DevUI. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.linkedin.com/in/gajendra-sharma-269756226/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-2/3 flex flex-wrap justify-between">
            {/* Company Links */}
            <div className="w-1/3 md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">
                Company
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="hover:text-white transition" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="hover:text-white transition" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="hover:text-white transition" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="w-1/3 md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">
                Support
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="hover:text-white transition" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="hover:text-white transition" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="hover:text-white transition" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="w-1/3 md:w-1/4">
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">
                Legals
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="hover:text-white transition" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="hover:text-white transition" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
