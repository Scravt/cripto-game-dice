"use client"

import { Coins, Wallet2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface TokenBalanceProps {
  ethBalance?: string
  tokenBalance?: string
}

export function TokenBalance({ ethBalance = "0.5", tokenBalance = "1000" }: TokenBalanceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-card border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:glow-violet">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm mb-1">ETH Balance</p>
            <p className="text-3xl font-bold text-foreground">{ethBalance}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Wallet2 className="w-8 h-8 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="bg-card border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:glow-violet">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Token Balance</p>
            <p className="text-3xl font-bold text-accent">{tokenBalance}</p>
          </div>
          <div className="bg-accent/10 p-3 rounded-full">
            <Coins className="w-8 h-8 text-accent" />
          </div>
        </div>
      </Card>
    </div>
  )
}
