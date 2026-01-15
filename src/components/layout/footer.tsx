import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold text-white">Cloudrix</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Expert software and cloud engineering solutions for European businesses.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/cloudrix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/cloudrix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/how-we-work" className="text-sm hover:text-white transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-sm hover:text-white transition-colors">
                  Cloud Architecture
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-white transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-white transition-colors">
                  DevOps & Automation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-white transition-colors">
                  Cloud Migration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Tunisia (serving EU clients)</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@cloudrix.io" className="text-sm hover:text-white transition-colors">
                  hello@cloudrix.io
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <a href="tel:+21600000000" className="text-sm hover:text-white transition-colors">
                  +216 XX XXX XXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Cloudrix. All rights reserved. GDPR Compliant.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
