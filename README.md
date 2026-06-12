# MoneyBoost 🚀💰

Plateforme de micro-crédit nouvelle génération. Des prêts de 100€ à 600€ en 24h, 100% en ligne.

## Stack Technique

- **Framework**: Next.js 15 + TypeScript
- **Database**: SQLite (dev) / PostgreSQL (production)
- **ORM**: Prisma
- **UI**: Tailwind CSS + Lucide Icons
- **Forms**: React Hook Form + Zod
- **AI**: Anthropic Claude (scoring de crédit)
- **Charts**: Recharts (admin dashboard)

## Architecture

```
moneyboost/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── loan/
│   │   │       └── request/   # POST /api/loan/request
│   │   ├── demande/           # Page de demande de prêt
│   │   ├── mes-prets/         # Dashboard client
│   │   ├── admin/             # Backoffice admin
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Styles globaux
│   ├── components/            # Composants réutilisables
│   │   ├── Header.tsx         # Navigation
│   │   ├── Footer.tsx         # Footer détaillé
│   │   ├── LoanCalculator.tsx # Simulateur de prêt
│   │   ├── LoanRequestForm.tsx # Formulaire multi-étapes
│   │   ├── Features.tsx       # Section avantages
│   │   └── Testimonials.tsx   # Témoignages clients
│   └── lib/                   # Utilitaires
│       ├── prisma.ts          # Client Prisma
│       ├── utils.ts           # Helpers
│       ├── validations.ts     # Schémas Zod
│       └── ai-credit-scoring.ts # IA scoring
├── prisma/
│   └── schema.prisma          # Modèles de données
├── .env                       # Variables d'environnement
└── package.json
```

## Fonctionnalités

### Frontend

- ✅ **Homepage** avec Hero + Simulateur de prêt
- ✅ **Calculateur interactif** (montant 100-600€, durée 7-30j)
- ✅ **Formulaire multi-étapes** (4 steps)
  - Step 1: Montant du prêt
  - Step 2: Informations personnelles
  - Step 3: Coordonnées
  - Step 4: Confirmation
- ✅ **Design moderne** avec palette violette (#4d50f4)
- ✅ **Responsive** mobile-first
- ✅ **Témoignages clients** et badges de confiance
- ✅ **SEO optimisé** avec metadata

### Backend

- ✅ **API Route** `/api/loan/request` (POST)
- ✅ **Database Prisma** avec 6 modèles
  - User (clients)
  - CreditScore (scoring)
  - LoanRequest (demandes)
  - Loan (prêts actifs)
  - Payment (remboursements)
- ✅ **AI Credit Scoring** avec Claude
  - Score 300-850
  - Niveau de risque (LOW/MEDIUM/HIGH)
  - Montant max recommandé
  - Taux d'intérêt suggéré
- ✅ **Validation Zod** des formulaires
- ✅ **Hashing bcrypt** des mots de passe

### À venir

- [ ] Dashboard client `/mes-prets`
- [ ] Backoffice admin avec React Admin
- [ ] Authentification NextAuth
- [ ] Système de paiement
- [ ] Notifications email
- [ ] Tests Jest + Playwright

## Installation

```bash
# Clone le repo
git clone <repo-url>
cd moneyboost

# Installer les dépendances
npm install

# Configurer .env
cp .env.example .env
# Ajouter ANTHROPIC_API_KEY

# Générer Prisma client
npm run db:generate

# Créer la base de données
npm run db:migrate

# Lancer le dev server
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Commandes

```bash
npm run dev          # Dev server avec Turbopack
npm run build        # Build production
npm run start        # Start production server
npm run lint         # ESLint

# Database
npm run db:generate  # Générer Prisma Client
npm run db:migrate   # Créer migration
npm run db:push      # Push schema
npm run db:studio    # Ouvrir Prisma Studio
```

## Variables d'environnement

```env
# Database
DATABASE_URL="file:./dev.db"

# Anthropic AI
ANTHROPIC_API_KEY="sk-ant-..."

# NextAuth
NEXTAUTH_SECRET="secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Modèles de données

### User
- Email, nom, téléphone
- Date de naissance, adresse
- Revenu mensuel
- Rôle (CLIENT/ADMIN)

### CreditScore
- Score 300-850
- Niveau de risque
- Montant max recommandé
- Historique de paiement

### LoanRequest
- Montant (100-600€)
- Durée (7-30 jours)
- Raison du prêt
- Status (PENDING/APPROVED/REJECTED)
- Score IA + raisonnement

### Loan
- Montant, durée, taux
- Frais de dossier
- Total à rembourser
- Date d'échéance
- Status (ACTIVE/COMPLETED/DEFAULTED)

### Payment
- Montant
- Date d'échéance
- Date de paiement
- Status (PENDING/PAID/LATE)

## Design System

### Couleurs

```css
--primary: #4d50f4        /* Violet principal */
--primary-hover: #3d40d4  /* Hover state */
--primary-light: #e8e9fe  /* Backgrounds */
--secondary: #10b981      /* Success green */
--accent: #f59e0b         /* Warning orange */
--danger: #ef4444         /* Error red */
```

### Typographie

- Font: Geist Sans (Next.js default)
- Headings: Bold, 2xl-6xl
- Body: Regular, sm-lg
- Emojis: 🚀💰 pour le branding

### Composants

- Buttons: Rounded-xl avec hover states
- Cards: Shadow-md/lg avec rounded-xl
- Forms: Border + focus:ring-2
- Sliders: Accent color primaire

## License

MIT

---

Fait avec ❤️ par l'équipe MoneyBoost 🚀💰
