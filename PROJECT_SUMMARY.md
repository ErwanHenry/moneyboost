# CashFrog - Résumé du projet 🐸💰

## Vue d'ensemble

CashFrog est une plateforme de micro-crédit complète, clone moderne de finfrog.fr, construite avec Next.js 15, TypeScript, et Prisma. Le projet propose des prêts rapides de 100€ à 600€ avec réponse en 24h, incluant un système de scoring IA par Claude.

## Chemins absolus des fichiers principaux

### Configuration racine
```
/Users/erwanhenry/claude-projects/cashfrog/.env
/Users/erwanhenry/claude-projects/cashfrog/.env.example
/Users/erwanhenry/claude-projects/cashfrog/README.md
/Users/erwanhenry/claude-projects/cashfrog/FILES_CREATED.md
/Users/erwanhenry/claude-projects/cashfrog/package.json
/Users/erwanhenry/claude-projects/cashfrog/tsconfig.json
```

### Database
```
/Users/erwanhenry/claude-projects/cashfrog/prisma/schema.prisma
/Users/erwanhenry/claude-projects/cashfrog/prisma/dev.db
/Users/erwanhenry/claude-projects/cashfrog/prisma/migrations/
```

### Libraries
```
/Users/erwanhenry/claude-projects/cashfrog/src/lib/prisma.ts
/Users/erwanhenry/claude-projects/cashfrog/src/lib/utils.ts
/Users/erwanhenry/claude-projects/cashfrog/src/lib/validations.ts
/Users/erwanhenry/claude-projects/cashfrog/src/lib/ai-credit-scoring.ts
```

### Components
```
/Users/erwanhenry/claude-projects/cashfrog/src/components/Header.tsx
/Users/erwanhenry/claude-projects/cashfrog/src/components/Footer.tsx
/Users/erwanhenry/claude-projects/cashfrog/src/components/LoanCalculator.tsx
/Users/erwanhenry/claude-projects/cashfrog/src/components/LoanRequestForm.tsx
/Users/erwanhenry/claude-projects/cashfrog/src/components/Features.tsx
/Users/erwanhenry/claude-projects/cashfrog/src/components/Testimonials.tsx
```

### Pages (App Router)
```
/Users/erwanhenry/claude-projects/cashfrog/src/app/layout.tsx
/Users/erwanhenry/claude-projects/cashfrog/src/app/page.tsx
/Users/erwanhenry/claude-projects/cashfrog/src/app/globals.css
/Users/erwanhenry/claude-projects/cashfrog/src/app/demande/page.tsx
```

### API Routes
```
/Users/erwanhenry/claude-projects/cashfrog/src/app/api/loan/request/route.ts
```

## Quick Start

```bash
cd /Users/erwanhenry/claude-projects/cashfrog

# Installer les dépendances (déjà fait)
npm install

# Ajouter votre clé API Anthropic dans .env
# ANTHROPIC_API_KEY="sk-ant-your-key"

# Lancer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
open http://localhost:3000
```

## Architecture technique

### Stack complet
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 avec palette violette (#4d50f4)
- **Database**: SQLite (dev) / PostgreSQL (prod) via Prisma ORM
- **Forms**: React Hook Form + Zod validation
- **AI**: Anthropic Claude pour credit scoring
- **Icons**: Lucide React
- **Security**: bcryptjs pour hash passwords

### Modèles de données (6 tables)
1. **User** - Clients avec infos KYC
2. **CreditScore** - Score 300-850 + niveau de risque
3. **LoanRequest** - Demandes de prêt avec scoring IA
4. **Loan** - Prêts actifs avec montant/durée/taux
5. **Payment** - Échéances de remboursement
6. **Session** - (prévu pour NextAuth)

### Flow utilisateur principal
1. **Homepage** → Simulateur interactif (sliders montant/durée)
2. **Faire une demande** → Formulaire 4 étapes avec validation
3. **API Route** → Scoring IA + Création User/Loan/CreditScore
4. **Confirmation** → Message succès + email dans 24h

## Design System - Palette CashFrog

```css
/* Couleurs principales (inspirées de finfrog.fr) */
--primary: #4d50f4        /* Violet principal */
--primary-hover: #3d40d4  /* Hover state */
--primary-light: #e8e9fe  /* Backgrounds */

/* Couleurs secondaires */
--secondary: #10b981      /* Vert succès */
--accent: #f59e0b         /* Orange attention */
--danger: #ef4444         /* Rouge erreur */

/* Neutrals */
--gray-50 à --gray-900    /* Échelle de gris complète */
```

### Composants stylés
- Buttons: `rounded-xl` avec `hover:shadow-xl`
- Cards: `shadow-md/lg` avec `hover:shadow-xl`
- Forms: `border-gray-300` + `focus:ring-2 focus:ring-[var(--primary)]`
- Sliders: Accent color primaire avec gradient

## Fonctionnalités complètes

### Page d'accueil (/)
- Hero avec gradient violet + CTA
- Calculateur de prêt en temps réel
- Section "Comment ça marche" (3 étapes)
- 6 features cards (rapide, sécurisé, flexible, etc.)
- 4 témoignages clients avec avatars et ratings
- Trust badges (15K+ prêts, 4.8/5, 24h délai)
- Footer complet avec liens légaux

### Page demande (/demande)
- Formulaire multi-étapes avec barre de progression
- Step 1: Montant (100-600€) + Durée (7-30j) + Raison
- Step 2: Nom, Email, Téléphone, Date de naissance
- Step 3: Adresse, Ville, Code postal, Revenu mensuel
- Step 4: Récapitulatif + Acceptation CGV
- Validation Zod en temps réel
- Message de succès post-soumission

### API Backend (/api/loan/request)
- POST endpoint pour créer demande
- Création ou update User avec bcrypt
- Appel Claude AI pour scoring (score 300-850)
- Détermination niveau risque (LOW/MEDIUM/HIGH)
- Calcul montant max + taux suggéré
- Création LoanRequest avec aiScore + reasoning
- Si approuvé: Création Loan + Payment + Update CreditScore
- Retour JSON avec statut + détails

### AI Credit Scoring (Claude)
- Analyse revenu, montant, durée, prêts existants
- Score 300-850 avec raisonnement détaillé
- Niveau de risque automatique
- Recommandation montant max
- Taux d'intérêt ajusté (8-12%)
- Fallback algorithmique si API indisponible

## Stats du projet

- **17 fichiers** créés (code source uniquement)
- **~2000+ lignes** de code TypeScript/TSX
- **6 modèles** de données Prisma
- **6 composants** React réutilisables
- **2 pages** Next.js complètes
- **1 API route** fonctionnelle
- **100% TypeScript** avec validation Zod
- **Responsive** mobile-first

## Prochaines étapes recommandées

### Phase 2 - Dashboard & Admin
1. Page `/mes-prets` (dashboard client)
2. Page `/admin` avec React Admin
3. Graphiques Recharts pour analytics
4. Système d'approbation manuelle

### Phase 3 - Authentification
1. NextAuth.js integration
2. Pages login/register
3. Protected routes middleware
4. Session management

### Phase 4 - Payments & Notifications
1. Intégration Stripe/PayPal
2. Emails transactionnels (Resend/SendGrid)
3. SMS confirmations (Twilio)
4. Alertes remboursement

### Phase 5 - Production
1. Migration PostgreSQL (Vercel/Neon)
2. Variables env production
3. Tests Jest + Playwright
4. CI/CD GitHub Actions
5. Monitoring Sentry
6. Analytics Vercel/Posthog

## Commandes utiles

```bash
# Développement
npm run dev              # Dev server Turbopack
npm run build            # Build production
npm run start            # Prod server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Create migration
npm run db:push          # Push schema
npm run db:studio        # Open Prisma Studio UI

# Qualité
npm run lint             # ESLint check
```

## Variables d'environnement requises

```env
# Database
DATABASE_URL="file:./dev.db"  # SQLite dev
# DATABASE_URL="postgresql://..." # PostgreSQL prod

# AI
ANTHROPIC_API_KEY="sk-ant-api..."  # Claude AI

# Auth (prévu)
NEXTAUTH_SECRET="random-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Support & Contact

- **Documentation**: `/Users/erwanhenry/claude-projects/cashfrog/README.md`
- **Liste fichiers**: `/Users/erwanhenry/claude-projects/cashfrog/FILES_CREATED.md`
- **Database Studio**: `npm run db:studio`
- **Dev Server**: http://localhost:3000

---

**Projet créé le**: 6 octobre 2025  
**Status**: ✅ MVP complet et fonctionnel  
**Prêt pour**: Développement Phase 2 (Dashboard + Admin)

🐸💰 **CashFrog - Votre grenouille de la finance !**
