'use client';

import { useState } from 'react';
import { calculateLoan, formatCurrency } from '@/lib/utils';
import { Calculator, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(300);
  const [duration, setDuration] = useState(14);

  const loanDetails = calculateLoan(amount, duration);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary-light)] mb-4">
          <Calculator className="text-[var(--primary)]" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Simulez votre prêt 🐸
        </h2>
        <p className="text-gray-600">
          Choisissez le montant et la durée, obtenez une réponse en 24h
        </p>
      </div>

      {/* Amount Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Montant du prêt</label>
          <span className="text-2xl font-bold text-[var(--primary)]">
            {formatCurrency(amount)}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="600"
          step="50"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${((amount - 100) / 500) * 100}%, #e5e7eb ${((amount - 100) / 500) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>100€</span>
          <span>600€</span>
        </div>
      </div>

      {/* Duration Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Durée du prêt</label>
          <span className="text-2xl font-bold text-[var(--primary)]">
            {duration} jours
          </span>
        </div>
        <input
          type="range"
          min="7"
          max="30"
          step="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${((duration - 7) / 23) * 100}%, #e5e7eb ${((duration - 7) / 23) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>7 jours</span>
          <span>30 jours</span>
        </div>
      </div>

      {/* Loan Details */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <TrendingUp size={20} />
            <span className="text-sm">Intérêts ({loanDetails.interestRate}%)</span>
          </div>
          <span className="font-semibold text-gray-900">
            {formatCurrency(loanDetails.interest)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock size={20} />
            <span className="text-sm">Frais de dossier</span>
          </div>
          <span className="font-semibold text-gray-900">
            {formatCurrency(loanDetails.fees)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">Montant total à rembourser</span>
            <span className="text-2xl font-bold text-[var(--primary)]">
              {formatCurrency(loanDetails.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/demande"
        className="block w-full py-4 px-6 rounded-xl text-center text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
        style={{ backgroundColor: 'var(--primary)' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
      >
        Faire ma demande 💰
      </Link>

      <p className="text-xs text-center text-gray-500 mt-4">
        Réponse en 24h • 100% en ligne • Sans justificatif
      </p>
    </div>
  );
}
