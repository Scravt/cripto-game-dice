"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/dashboard"
import { DiceGame } from "@/components/dice-game"
import { HistoryPage } from "@/components/history-page"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"


interface Particle {
  id: number;
  left: string;
  top: string;
  delay: string;
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]); // <- tipado correcto

  useEffect(() => {
    const p: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "game" | "history">("dashboard")

  return (
    <>
      <FloatingParticles />
      <main className="min-h-screen relative z-10">
        {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}

        {currentPage === "game" && (
          <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-3 animate-slide-in">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage("dashboard")}
                  className="border-primary/30 hover:border-primary hover:glow-violet transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-3xl font-bold text-foreground">Place Your Bets</h1>
              </div>
              <DiceGame />
            </div>
          </div>
        )}

        {currentPage === "history" && <HistoryPage onNavigate={setCurrentPage} />}
      </main>
    </>
  )
}
