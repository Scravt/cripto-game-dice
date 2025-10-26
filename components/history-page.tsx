"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HistoryItem } from "./history-item"
import { ArrowLeft, History } from "lucide-react"

interface HistoryPageProps {
  onNavigate: (page: "dashboard" | "game" | "history") => void
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const mockHistory = [
    { date: "2025-01-26 14:30", betType: "total" as const, bet: "7", result: "8", profit: -50 },
    { date: "2025-01-26 14:25", betType: "exact" as const, bet: "3,4", result: "3,4", profit: 500 },
    { date: "2025-01-26 14:20", betType: "total" as const, bet: "10", result: "10", profit: 100 },
    { date: "2025-01-26 14:15", betType: "total" as const, bet: "6", result: "7", profit: -30 },
    { date: "2025-01-26 14:10", betType: "exact" as const, bet: "2,2", result: "1,3", profit: -75 },
    { date: "2025-01-26 14:05", betType: "total" as const, bet: "9", result: "9", profit: 80 },
  ]

  const totalProfit = mockHistory.reduce((sum, item) => sum + item.profit, 0)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slide-in">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => onNavigate("dashboard")}
              className="border-primary/30 hover:border-primary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full glow-violet">
                <History className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Betting History</h1>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="bg-card border-primary/30 p-6 animate-slide-in" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Bets</p>
              <p className="text-3xl font-bold text-foreground">{mockHistory.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Profit</p>
              <p className={`text-3xl font-bold ${totalProfit >= 0 ? "text-success" : "text-destructive"}`}>
                {totalProfit >= 0 ? "+" : ""}
                {totalProfit}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Win Rate</p>
              <p className="text-3xl font-bold text-accent">
                {Math.round((mockHistory.filter((h) => h.profit > 0).length / mockHistory.length) * 100)}%
              </p>
            </div>
          </div>
        </Card>

        {/* History List */}
        <div className="space-y-3">
          {mockHistory.map((item, index) => (
            <div key={index} style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
              <HistoryItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
