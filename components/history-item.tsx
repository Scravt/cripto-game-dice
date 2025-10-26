"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface HistoryItemProps {
  date: string
  betType: "total" | "exact"
  bet: string
  result: string
  profit: number
}

export function HistoryItem({ date, betType, bet, result, profit }: HistoryItemProps) {
  const isWin = profit > 0

  return (
    <Card className="bg-card border-primary/20 p-4 hover:border-primary/40 transition-all duration-300 hover:glow-violet animate-slide-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">{date}</span>
            <span
              className={`text-xs px-2 py-1 rounded ${betType === "exact" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"}`}
            >
              {betType === "exact" ? "Exact" : "Total"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Bet</p>
              <p className="text-foreground font-semibold">{bet}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Result</p>
              <p className="text-foreground font-semibold">{result}</p>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-2 ${isWin ? "text-success" : "text-destructive"}`}>
          {isWin ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          <span className="text-xl font-bold">
            {isWin ? "+" : ""}
            {profit}
          </span>
        </div>
      </div>
    </Card>
  )
}
