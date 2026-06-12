import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export interface CreditScoringInput {
  income?: number;
  amount: number;
  duration: number;
  existingLoans?: number;
  purpose?: string;
  email: string;
  age?: number;
}

export interface CreditScoringResult {
  score: number; // 300-850
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  approved: boolean;
  reasoning: string;
  maxLoanAmount: number;
  suggestedInterestRate: number;
}

export async function evaluateCreditScore(
  input: CreditScoringInput
): Promise<CreditScoringResult> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a credit scoring AI for CashFrog, a micro-lending platform.

Evaluate the following loan request and provide a credit score:

Applicant Information:
- Email: ${input.email}
- Age: ${input.age || 'Not provided'}
- Monthly Income: ${input.income ? `€${input.income}` : 'Not provided'}
- Existing Loans: ${input.existingLoans || 0}

Loan Request:
- Amount: €${input.amount}
- Duration: ${input.duration} days
- Purpose: ${input.purpose || 'Not specified'}

Please respond with a JSON object containing:
{
  "score": <number between 300-850>,
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "approved": <boolean>,
  "reasoning": "<detailed explanation in French>",
  "maxLoanAmount": <number>,
  "suggestedInterestRate": <percentage as number>
}

Scoring Guidelines:
- Score 700+: LOW risk, approve up to €600
- Score 600-699: MEDIUM risk, approve up to €400
- Score <600: HIGH risk, approve up to €200 or reject
- Consider income/loan ratio (loan should be <20% of monthly income)
- Duration 7-14 days: safer than 15-30 days
- First-time borrowers: more conservative approach`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      // Extract JSON from response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]) as CreditScoringResult;
        return result;
      }
    }

    // Fallback if AI response is not parseable
    return generateFallbackScore(input);
  } catch (error) {
    console.error('AI Credit Scoring Error:', error);
    return generateFallbackScore(input);
  }
}

// Fallback scoring algorithm
function generateFallbackScore(input: CreditScoringInput): CreditScoringResult {
  let score = 650; // Base score

  // Income check
  if (input.income) {
    const loanToIncomeRatio = input.amount / input.income;
    if (loanToIncomeRatio < 0.15) score += 100;
    else if (loanToIncomeRatio < 0.25) score += 50;
    else score -= 50;
  }

  // Duration check
  if (input.duration <= 14) score += 30;
  else score -= 20;

  // Amount check
  if (input.amount <= 300) score += 20;
  else if (input.amount > 500) score -= 30;

  // Existing loans
  if (input.existingLoans && input.existingLoans > 0) {
    score -= input.existingLoans * 50;
  }

  // Clamp score
  score = Math.max(300, Math.min(850, score));

  // Determine risk level
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  let approved: boolean;
  let maxLoanAmount: number;
  let suggestedInterestRate: number;

  if (score >= 700) {
    riskLevel = 'LOW';
    approved = true;
    maxLoanAmount = 600;
    suggestedInterestRate = 8;
  } else if (score >= 600) {
    riskLevel = 'MEDIUM';
    approved = input.amount <= 400;
    maxLoanAmount = 400;
    suggestedInterestRate = 10;
  } else {
    riskLevel = 'HIGH';
    approved = input.amount <= 200;
    maxLoanAmount = 200;
    suggestedInterestRate = 12;
  }

  return {
    score,
    riskLevel,
    approved,
    reasoning: `Score de crédit calculé: ${score}/850. Niveau de risque: ${riskLevel}. Montant maximum recommandé: €${maxLoanAmount}.`,
    maxLoanAmount,
    suggestedInterestRate,
  };
}
