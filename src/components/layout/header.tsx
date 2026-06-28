"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui";
import { useLanguage } from "@/contexts/language-context";

const serviceLinks = [
  { name: "Cloud Migration", href: "/services/cloud-migration" },
  { name: "DevOps Consulting", href: "/services/devops-consulting" },
  { name: "AI & ML Consulting", href: "/services/ai-consulting" },
  { name: "Full-Stack Development", href: "/services/full-stack-development" },
  { name: "Technical Due Diligence", href: "/services/technical-due-diligence" },
  { name: "Dedicated Teams", href: "/services/dedicated-teams" },
  { name: "API Development", href: "/services/api-development" },
  { name: "LLM Integration", href: "/services/llm-integration" },
  { name: "Legacy Modernization", href: "/services/legacy-modernization" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navigation = [
    { name: t("Home", "Accueil"), href: "/" },
    { name: t("Services", "Services"), href: "/services", hasDropdown: true },
    { name: t("Pricing", "Tarifs"), href: "/pricing" },
    { name: t("Case Studies", "Etudes de Cas"), href: "/case-studies" },
    { name: t("About", "A Propos"), href: "/about" },
    { name: t("Contact", "Contact"), href: "/contact" },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Cloudrix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors inline-flex items-center gap-1 ${
                      isActive(item.href)
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                  </Link>

                  {isServicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-4 w-[280px]">
                        <div className="space-y-1">
                          <Link
                            href="/services"
                            className="block px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            All Services →
                          </Link>
                          <div className="border-t border-gray-100 my-2" />
                          {serviceLinks.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                pathname === service.href
                                  ? "text-blue-600 bg-blue-50 font-medium"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}

            {/* Language Switcher */}
            <LanguageSwitcher variant="compact" />

            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {t("Get Free Consultation", "Consultation Gratuite")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher variant="compact" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-1">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.href}>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className={`flex items-center justify-between w-full py-2 text-base ${
                      isActive(item.href)
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isMobileServicesOpen && (
                    <div className="pl-4 space-y-1 pb-2">
                      <Link
                        href="/services"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1.5 text-sm text-blue-600 font-medium"
                      >
                        All Services
                      </Link>
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1.5 text-sm text-gray-600"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-base ${
                    isActive(item.href)
                      ? "text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium mt-2"
            >
              {t("Get Free Consultation", "Consultation Gratuite")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
