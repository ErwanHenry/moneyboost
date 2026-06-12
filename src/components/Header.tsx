'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">🐸</span>
            <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
              CashFrog
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-[var(--primary)]'
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/demande"
              className={`text-sm font-medium transition-colors ${
                isActive('/demande')
                  ? 'text-[var(--primary)]'
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
            >
              Faire une demande
            </Link>
            <Link
              href="/mes-prets"
              className={`text-sm font-medium transition-colors ${
                isActive('/mes-prets')
                  ? 'text-[var(--primary)]'
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
            >
              Mes prêts
            </Link>
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors ${
                isActive('/admin')
                  ? 'text-[var(--primary)]'
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
            >
              Admin
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
            >
              <User size={18} />
              <span>Mon compte</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
