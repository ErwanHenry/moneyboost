import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

// Calculate loan details
export function calculateLoan(amount: number, duration: number) {
  const interestRate = 0.1; // 10% per loan
  const fixedFees = 5; // 5€ fixed fees

  const interest = amount * interestRate;
  const totalAmount = amount + interest + fixedFees;

  return {
    amount,
    duration,
    interestRate: interestRate * 100,
    fees: fixedFees,
    interest,
    totalAmount,
  };
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
