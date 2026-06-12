'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { calculateLoan, formatCurrency } from '@/lib/utils';

// Form schema
const formSchema = z.object({
  // Step 1: Loan Details
  amount: z.number().min(100).max(600),
  duration: z.number().min(7).max(30),
  purpose: z.string().optional(),

  // Step 2: Personal Info
  email: z.string().email('Email invalide'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numéro de téléphone invalide'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18;
  }, 'Vous devez avoir au moins 18 ans'),

  // Step 3: Additional Info
  address: z.string().min(5, 'Adresse invalide'),
  city: z.string().min(2, 'Ville invalide'),
  zipCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  income: z.number().min(0, 'Le revenu doit être positif'),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { id: 1, title: 'Montant', description: 'Choisissez votre prêt' },
  { id: 2, title: 'Identité', description: 'Vos informations' },
  { id: 3, title: 'Coordonnées', description: 'Détails complémentaires' },
  { id: 4, title: 'Confirmation', description: 'Vérification finale' },
];

export default function LoanRequestForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 300,
      duration: 14,
    },
  });

  const amount = watch('amount');
  const duration = watch('duration');
  const loanDetails = calculateLoan(amount || 300, duration || 14);

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['amount', 'duration'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['email', 'name', 'phone', 'dateOfBirth'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['address', 'city', 'zipCode', 'income'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/loan/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Erreur lors de la soumission. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Erreur lors de la soumission. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="text-green-600" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Demande envoyée avec succès ! 🐸
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Nous avons bien reçu votre demande de prêt. Notre équipe l&apos;examine et vous recevrez une réponse par email dans les 24 heures.
        </p>
        <div className="bg-[var(--primary-light)] rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-700">
            <strong>Prochaines étapes :</strong>
          </p>
          <ul className="text-left text-sm text-gray-600 mt-4 space-y-2">
            <li>✅ Vérification de votre demande (en cours)</li>
            <li>⏳ Scoring de crédit automatique</li>
            <li>📧 Email de confirmation sous 24h</li>
            <li>💰 Versement immédiat si approuvé</li>
          </ul>
        </div>
        <button
          onClick={() => window.location.href = '/mes-prets'}
          className="px-8 py-3 rounded-xl text-white font-semibold transition-all"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Voir mes prêts
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step.id
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id}
                </div>
                <div className="text-center mt-2">
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-4 transition-all ${
                    currentStep > step.id ? 'bg-[var(--primary)]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8">
        {/* Step 1: Loan Amount */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Combien souhaitez-vous emprunter ? 💰
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant du prêt: {formatCurrency(amount || 300)}
              </label>
              <input
                type="range"
                min="100"
                max="600"
                step="50"
                {...register('amount', { valueAsNumber: true })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>100€</span>
                <span>600€</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée du prêt: {duration || 14} jours
              </label>
              <input
                type="range"
                min="7"
                max="30"
                step="1"
                {...register('duration', { valueAsNumber: true })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>7 jours</span>
                <span>30 jours</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raison du prêt (optionnel)
              </label>
              <textarea
                {...register('purpose')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="Ex: Réparation voiture, facture urgente..."
              />
            </div>

            {/* Loan summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Récapitulatif</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant emprunté</span>
                  <span className="font-semibold">{formatCurrency(loanDetails.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Intérêts ({loanDetails.interestRate}%)</span>
                  <span className="font-semibold">{formatCurrency(loanDetails.interest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais</span>
                  <span className="font-semibold">{formatCurrency(loanDetails.fees)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Total à rembourser</span>
                  <span className="font-bold text-[var(--primary)]">{formatCurrency(loanDetails.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Personal Info */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Parlez-nous de vous 👤
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="Jean Dupont"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="jean.dupont@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="06 12 34 56 78"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance *
                </label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Où habitez-vous ? 🏠
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  {...register('address')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="123 Rue de la Paix"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    {...register('city')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="Paris"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    {...register('zipCode')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="75001"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenu mensuel (€) *
                </label>
                <input
                  type="number"
                  {...register('income', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="2000"
                />
                {errors.income && (
                  <p className="text-red-500 text-xs mt-1">{errors.income.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Vérifiez vos informations 🐸
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Détails du prêt</h3>
                <p className="text-sm text-gray-600">Montant: {formatCurrency(amount || 300)}</p>
                <p className="text-sm text-gray-600">Durée: {duration || 14} jours</p>
                <p className="text-sm text-gray-600">Total à rembourser: {formatCurrency(loanDetails.totalAmount)}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Vos informations</h3>
                <p className="text-sm text-gray-600">Email: {watch('email')}</p>
                <p className="text-sm text-gray-600">Téléphone: {watch('phone')}</p>
                <p className="text-sm text-gray-600">Ville: {watch('city')}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                En soumettant cette demande, vous acceptez nos{' '}
                <a href="/legal/terms" className="text-[var(--primary)] underline">
                  conditions générales
                </a>{' '}
                et notre{' '}
                <a href="/legal/privacy" className="text-[var(--primary)] underline">
                  politique de confidentialité
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-8 border-t">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Précédent</span>
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold transition-all"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <span>Suivant</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto flex items-center space-x-2 px-8 py-3 rounded-lg text-white font-semibold transition-all disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span>Envoyer ma demande</span>
                  <CheckCircle2 size={20} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
