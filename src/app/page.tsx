import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import LoanCalculator from '@/components/LoanCalculator';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Besoin d&apos;argent rapidement ? 🐸
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                De 100€ à 600€ en 24h, 100% en ligne
              </p>

              {/* USPs */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-300 flex-shrink-0" size={24} />
                  <span className="text-lg">Réponse en moins de 24 heures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-300 flex-shrink-0" size={24} />
                  <span className="text-lg">Sans justificatif de revenus</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-300 flex-shrink-0" size={24} />
                  <span className="text-lg">Versement immédiat sur votre compte</span>
                </div>
              </div>

              <Link
                href="/demande"
                className="inline-flex items-center space-x-2 bg-white text-[var(--primary)] px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                <span>Faire ma demande</span>
                <ArrowRight size={20} />
              </Link>

              <p className="mt-4 text-sm text-purple-200">
                Déjà 15 000+ prêts accordés • Note moyenne 4.8/5
              </p>
            </div>

            {/* Right Column - Calculator (hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block">
              <div className="transform scale-95">
                <LoanCalculator />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Calculator Section (Mobile) */}
      <section id="simulator" className="lg:hidden py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoanCalculator />
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How it Works Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ? 🐸
            </h2>
            <p className="text-lg text-gray-600">
              3 étapes simples pour obtenir votre prêt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-3xl font-bold mb-4 shadow-lg"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Simulez votre prêt
              </h3>
              <p className="text-gray-600">
                Utilisez notre calculateur pour choisir le montant (100-600€) et la durée (7-30 jours)
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-3xl font-bold mb-4 shadow-lg"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Complétez votre demande
              </h3>
              <p className="text-gray-600">
                Remplissez le formulaire en 5 minutes. Pas de justificatif compliqué à fournir
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-3xl font-bold mb-4 shadow-lg"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Recevez votre argent
              </h3>
              <p className="text-gray-600">
                Décision en 24h. Une fois approuvé, l&apos;argent arrive sur votre compte immédiatement
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/demande"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:shadow-xl"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <span>Commencer maintenant</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à sauter le pas ? 🐸💰
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Rejoignez des milliers de Français qui nous font confiance
          </p>
          <Link
            href="/demande"
            className="inline-flex items-center space-x-2 bg-white text-[var(--primary)] px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <span>Faire ma demande maintenant</span>
            <ArrowRight size={24} />
          </Link>
          <p className="mt-6 text-sm text-purple-200">
            Un exemple de crédit de 300€ sur 14 jours coûte 335€ au total
          </p>
        </div>
      </section>
    </div>
  );
}
