import { Clock, Shield, Smartphone, Zap, CheckCircle, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Réponse rapide',
    description: 'Décision en moins de 24h, même le week-end',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Smartphone,
    title: '100% en ligne',
    description: 'Tout le processus depuis votre smartphone',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Sécurisé',
    description: 'Vos données protégées et cryptées',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: CheckCircle,
    title: 'Sans justificatif',
    description: 'Pas de paperasse, juste votre identité',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: CreditCard,
    title: 'Versement immédiat',
    description: 'L\'argent sur votre compte en quelques heures',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Clock,
    title: 'Flexible',
    description: 'Remboursement de 7 à 30 jours',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pourquoi choisir CashFrog ? 💰
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un service de micro-crédit moderne, transparent et adapté à vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-[var(--primary)] hover:shadow-lg transition-all"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                <feature.icon className={`${feature.color}`} size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
