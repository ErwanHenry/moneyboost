import LoanRequestForm from '@/components/LoanRequestForm';
import { Clock, Shield, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Faire une demande de prêt - CashFrog',
  description: 'Demandez votre prêt rapide de 100€ à 600€. Réponse en 24h, 100% en ligne.',
};

export default function DemandeProPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Faites votre demande de prêt 🐸
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Remplissez le formulaire en 5 minutes et recevez une réponse en 24h
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="text-[var(--primary)]" size={20} />
              <span className="text-gray-700">Réponse en 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="text-[var(--primary)]" size={20} />
              <span className="text-gray-700">Données sécurisées</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-[var(--primary)]" size={20} />
              <span className="text-gray-700">Sans justificatif</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <LoanRequestForm />

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Quand vais-je recevoir une réponse ?
              </h3>
              <p className="text-gray-600 text-sm">
                Vous recevrez une réponse par email dans les 24 heures suivant votre demande, même le week-end.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Quels documents dois-je fournir ?
              </h3>
              <p className="text-gray-600 text-sm">
                Aucun justificatif n&apos;est nécessaire pour les montants jusqu&apos;à 600€. Juste votre identité pour vérification.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment fonctionne le remboursement ?
              </h3>
              <p className="text-gray-600 text-sm">
                Le remboursement se fait en une seule fois à la date d&apos;échéance choisie (7 à 30 jours). Vous recevrez un rappel par email.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Que se passe-t-il si ma demande est refusée ?
              </h3>
              <p className="text-gray-600 text-sm">
                Nous vous expliquerons les raisons par email. Vous pourrez refaire une demande après 30 jours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
