import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { evaluateCreditScore } from '@/lib/ai-credit-scoring';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      amount,
      duration,
      purpose,
      email,
      name,
      phone,
      dateOfBirth,
      address,
      city,
      zipCode,
      income,
    } = body;

    // Calculate age
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();

    // Create or find user
    let user = await prisma.user.findUnique({
      where: { email },
      include: { loanRequests: true },
    });

    if (!user) {
      // Create new user with default password (should be changed in production)
      const passwordHash = await bcrypt.hash('cashfrog123', 10);

      user = await prisma.user.create({
        data: {
          email,
          name,
          phone,
          dateOfBirth: new Date(dateOfBirth),
          address,
          city,
          zipCode,
          income,
          passwordHash,
          role: 'CLIENT',
        },
        include: { loanRequests: true },
      });
    } else {
      // Update user info
      user = await prisma.user.update({
        where: { email },
        data: {
          phone,
          address,
          city,
          zipCode,
          income,
        },
        include: { loanRequests: true },
      });
    }

    // AI Credit Scoring
    const creditEvaluation = await evaluateCreditScore({
      income,
      amount,
      duration,
      existingLoans: user.loanRequests?.filter((req) => req.status === 'ACTIVE').length || 0,
      purpose,
      email,
      age,
    });

    // Create loan request
    const loanRequest = await prisma.loanRequest.create({
      data: {
        userId: user.id,
        amount,
        duration,
        purpose,
        status: creditEvaluation.approved ? 'APPROVED' : 'PENDING',
        aiScore: creditEvaluation.score,
        aiReasoning: creditEvaluation.reasoning,
      },
    });

    // Update or create credit score
    await prisma.creditScore.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        score: creditEvaluation.score,
        riskLevel: creditEvaluation.riskLevel,
        maxLoanAmount: creditEvaluation.maxLoanAmount,
        incomeStability: income > 1000,
        debtRatio: amount / (income || 1),
        paymentHistory: 'GOOD', // New user, assume good
      },
      update: {
        score: creditEvaluation.score,
        riskLevel: creditEvaluation.riskLevel,
        maxLoanAmount: creditEvaluation.maxLoanAmount,
        debtRatio: amount / (income || 1),
        lastCalculated: new Date(),
      },
    });

    // If approved, create loan
    if (creditEvaluation.approved) {
      const interestRate = creditEvaluation.suggestedInterestRate;
      const interest = (amount * interestRate) / 100;
      const fees = 5;
      const totalAmount = amount + interest + fees;

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + duration);

      await prisma.loan.create({
        data: {
          userId: user.id,
          requestId: loanRequest.id,
          amount,
          duration,
          interestRate,
          fees,
          totalAmount,
          status: 'ACTIVE',
          dueDate,
          payments: {
            create: {
              amount: totalAmount,
              dueDate,
              status: 'PENDING',
            },
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      requestId: loanRequest.id,
      approved: creditEvaluation.approved,
      creditScore: creditEvaluation.score,
      reasoning: creditEvaluation.reasoning,
    });
  } catch (error) {
    console.error('Loan request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
