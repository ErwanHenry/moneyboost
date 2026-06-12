import { z } from 'zod';

// Loan request validation
export const loanRequestSchema = z.object({
  amount: z
    .number()
    .min(100, 'Le montant minimum est de 100€')
    .max(600, 'Le montant maximum est de 600€'),
  duration: z
    .number()
    .min(7, 'La durée minimum est de 7 jours')
    .max(30, 'La durée maximum est de 30 jours'),
  purpose: z.string().optional(),
});

// User registration validation
export const userRegistrationSchema = z.object({
  email: z.string().email('Email invalide'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numéro de téléphone invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18;
  }, 'Vous devez avoir au moins 18 ans'),
  address: z.string().min(5, 'Adresse invalide'),
  city: z.string().min(2, 'Ville invalide'),
  zipCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  income: z.number().min(0, 'Le revenu doit être positif'),
});

// Login validation
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

// Admin loan review validation
export const loanReviewSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  adminNotes: z.string().optional(),
});

export type LoanRequestInput = z.infer<typeof loanRequestSchema>;
export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type LoanReviewInput = z.infer<typeof loanReviewSchema>;
