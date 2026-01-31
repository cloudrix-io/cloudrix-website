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
                <Link href="/industries" className="text-sm hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-white transition-colors">
                  Blog
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
                <Link href="/services/cloud-architecture" className="text-sm hover:text-white transition-colors">
                  Cloud Architecture
                </Link>
              </li>
              <li>
                <Link href="/services/full-stack-development" className="text-sm hover:text-white transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/services/devops-automation" className="text-sm hover:text-white transition-colors">
                  DevOps & Automation
                </Link>
              </li>
              <li>
                <Link href="/services/technical-consulting" className="text-sm hover:text-white transition-colors">
                  Technical Consulting
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-sm hover:text-white transition-colors">
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/linkedin-templates" className="text-sm hover:text-white transition-colors">
                  LinkedIn Templates
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
                <span className="text-sm">Tilburg, Netherlands</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@cloudrix.io" className="text-sm hover:text-white transition-colors">
                  contact@cloudrix.io
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <a href="tel:+31643166305" className="text-sm hover:text-white transition-colors">
                  +31 6 43166305
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>&copy; {currentYear} Cloudrix. All rights reserved.</p>
              <p className="mt-1">KVK: 97732699</p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              GDPR Compliant
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure & Encrypted
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              NDA Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
