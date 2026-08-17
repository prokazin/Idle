import React, { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-text font-mono">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <header className="mb-8 text-center border-b-2 border-cyber-purple pb-4">
          <h1 className="text-4xl font-bold text-cyber-purple animate-pulse">
            ██ CODE TYCOON ██
          </h1>
          <p className="text-sm text-cyber-gray mt-2">idle coding simulator</p>
        </header>
        <main className="space-y-6">
          {children}
        </main>
        <footer className="mt-12 text-center text-xs text-cyber-gray border-t-2 border-cyber-purple pt-4">
          <span>v1.0.0 | 17.08.2026</span>
        </footer>
      </div>
    </div>
  )
}

export default MainLayout
