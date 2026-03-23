import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Mail, MapPin, Building2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/impact', label: 'Impact' },
    { path: '/donate', label: 'Donate' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative min-h-screen bg-[#0B0F17]">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0B0F17]/95 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-[6vw] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-mono text-xs tracking-[0.18em] text-[#F4F6FA] uppercase hover:text-[#FF4D2E] transition-colors">
            Alliance Relief Fund
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors ${
                  isActive(link.path) 
                    ? 'text-[#FF4D2E]' 
                    : 'text-[#A9B3C2] hover:text-[#F4F6FA]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link to="/donate">
              <Button className="bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full px-6 py-2 text-sm font-medium btn-hover">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#F4F6FA] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden absolute top-full left-0 right-0 bg-[#0B0F17]/98 backdrop-blur-md border-t border-[rgba(244,246,250,0.08)] transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`block text-base py-2 ${
                  isActive(link.path) 
                    ? 'text-[#FF4D2E]' 
                    : 'text-[#A9B3C2] hover:text-[#F4F6FA]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/donate" className="block pt-4">
              <Button className="w-full bg-[#FF4D2E] hover:bg-[#E04327] text-white rounded-full py-3 text-sm font-medium">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative bg-[#0B0F17] border-t border-[rgba(244,246,250,0.08)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[6vw] py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="font-mono text-sm tracking-[0.18em] text-[#F4F6FA] uppercase block mb-4">
                Alliance Relief Fund
              </Link>
              <p className="text-[#A9B3C2] text-sm leading-relaxed">
                Coordinating emergency aid, shelter, and medical support for communities affected by conflict.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-[#F4F6FA] text-sm uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="text-[#A9B3C2] text-sm hover:text-[#FF4D2E] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-[#F4F6FA] text-sm uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:hello@alliancerelief.fund"
                    className="text-[#A9B3C2] text-sm hover:text-[#FF4D2E] transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    hello@alliancerelief.fund
                  </a>
                </li>
                <li className="text-[#A9B3C2] text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  New York, NY
                </li>
                <li className="text-[#A9B3C2] text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Registered nonprofit
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-heading font-bold text-[#F4F6FA] text-sm uppercase tracking-wider mb-4">
                Stay Updated
              </h4>
              <p className="text-[#A9B3C2] text-sm mb-4">
                Subscribe to receive weekly field reports.
              </p>
              <a 
                href="mailto:subscribe@alliancerelief.fund?subject=Subscribe to Weekly Reports"
                className="inline-flex items-center gap-2 text-[#FF4D2E] text-sm hover:underline"
              >
                <Mail className="w-4 h-4" />
                Subscribe via email
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-[rgba(244,246,250,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#A9B3C2] text-xs">
              © 2026 Alliance Relief Fund. All rights reserved.
            </p>
            <p className="text-[#A9B3C2] text-xs">
              EIN available on request.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
