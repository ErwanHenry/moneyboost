'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Marie L.',
    location: 'Paris',
    rating: 5,
    comment: 'Super rapide ! J\'ai eu mon prêt en moins de 24h pour réparer ma voiture. Service au top 🐸',
    amount: '400€',
    avatar: '👩',
  },
  {
    name: 'Thomas B.',
    location: 'Lyon',
    rating: 5,
    comment: 'Interface simple et intuitive. Pas de paperasse compliquée, tout se fait en ligne. Je recommande !',
    amount: '300€',
    avatar: '👨',
  },
  {
    name: 'Sophie M.',
    location: 'Marseille',
    rating: 5,
    comment: 'Parfait pour les urgences ! Taux clairs et remboursement flexible. Merci CashFrog 💰',
    amount: '250€',
    avatar: '👩‍🦰',
  },
  {
    name: 'Lucas D.',
    location: 'Toulouse',
    rating: 5,
    comment: 'J\'étais sceptique au début mais le processus est transparent. Aucune surprise, que du bon !',
    amount: '500€',
    avatar: '👨‍💼',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ils nous font confiance 🐸
          </h2>
          <p className="text-lg text-gray-600">
            Des milliers de clients satisfaits à travers la France
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Avatar & Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[var(--accent)] text-[var(--accent)]"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                {testimonial.comment}
              </p>

              {/* Amount Badge */}
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary-light)] text-[var(--primary)]">
                Prêt de {testimonial.amount}
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[var(--primary)] mb-1">4.8/5</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
          <div className="border-l border-gray-300"></div>
          <div>
            <div className="text-3xl font-bold text-[var(--primary)] mb-1">15K+</div>
            <div className="text-sm text-gray-600">Prêts accordés</div>
          </div>
          <div className="border-l border-gray-300"></div>
          <div>
            <div className="text-3xl font-bold text-[var(--primary)] mb-1">24h</div>
            <div className="text-sm text-gray-600">Délai moyen</div>
          </div>
          <div className="border-l border-gray-300"></div>
          <div>
            <div className="text-3xl font-bold text-[var(--primary)] mb-1">98%</div>
            <div className="text-sm text-gray-600">Clients satisfaits</div>
          </div>
        </div>
      </div>
    </section>
  );
}
