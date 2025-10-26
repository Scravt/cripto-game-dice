"use client"
import { WalletButton } from "./wallet-button"
import { TokenBalance } from "./token-balance"
import { HistoryItem } from "./history-item"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dices, History } from "lucide-react"

interface DashboardProps {
  onNavigate: (page: "dashboard" | "game" | "history") => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const mockHistory = [
    { date: "2025-01-26 14:30", betType: "total" as const, bet: "7", result: "8", profit: -50 },
    { date: "2025-01-26 14:25", betType: "exact" as const, bet: "3,4", result: "3,4", profit: 500 },
    { date: "2025-01-26 14:20", betType: "total" as const, bet: "10", result: "10", profit: 100 },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between animate-slide-in">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2.5 rounded-xl glow-violet">
              <Dices className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Double Dice</h1>
              <p className="text-sm text-muted-foreground">Crypto Betting Game</p>
            </div>
          </div>
          <WalletButton />
        </div>

        {/* Balance Cards */}
        <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
          <TokenBalance ethBalance="0.5" tokenBalance="1000" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <Button
            onClick={() => onNavigate("game")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-7 text-lg rounded-xl glow-violet hover:glow-violet-strong transition-all duration-300 card-hover"
          >
            <Dices className="w-5 h-5 mr-2" />
            Start Playing
          </Button>
          <Button
            onClick={() => onNavigate("history")}
            variant="outline"
            className="border-primary/30 hover:border-primary text-foreground font-semibold py-7 text-lg rounded-xl hover:glow-violet transition-all duration-300 card-hover"
          >
            <History className="w-5 h-5 mr-2" />
            View History
          </Button>
        </div>

        <Card
          className="bg-card border-primary/20 p-6 rounded-xl animate-slide-in card-hover"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Recent Bets
          </h2>
          <div className="space-y-3">
            {mockHistory.map((item, index) => (
              <HistoryItem key={index} {...item} />
            ))}
          </div>
        </Card>

        <footer className="text-center text-sm text-muted-foreground py-4 animate-fade-in">
          <p>Built with ❤️ for the crypto community</p>
        </footer>
      </div>
    </div>
  )
}
