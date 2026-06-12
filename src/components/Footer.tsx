import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🐸</span>
              <span className="text-xl font-bold">CashFrog</span>
            </div>
            <p className="text-sm text-gray-400">
              Votre solution de micro-crédit rapide et transparente. Des prêts de 100€ à 600€ en 24h.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Produits</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/demande" className="text-gray-400 hover:text-white transition-colors">
                  Prêt express
                </Link>
              </li>
              <li>
                <Link href="/#simulator" className="text-gray-400 hover:text-white transition-colors">
                  Simulateur
                </Link>
              </li>
              <li>
                <Link href="/mes-prets" className="text-gray-400 hover:text-white transition-colors">
                  Mes prêts
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Carrières
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-white transition-colors">
                  Presse
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/legal/cgv" className="text-gray-400 hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} CashFrog. Tous droits réservés. 🐸💰
          </p>
          <p className="text-xs text-gray-500 mt-4 md:mt-0">
            Un exemple de crédit de 300€ sur 14 jours coûte 335€ (intérêts + frais inclus)
          </p>
        </div>
      </div>
    </footer>
  );
}
