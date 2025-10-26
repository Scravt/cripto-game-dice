"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dice } from "./dice"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dices, Target } from "lucide-react"

export function DiceGame() {
  const [dice1, setDice1] = useState(1)
  const [dice2, setDice2] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [betAmount, setBetAmount] = useState("")
  const [selectedTotal, setSelectedTotal] = useState(7)
  const [selectedDice1, setSelectedDice1] = useState(3)
  const [selectedDice2, setSelectedDice2] = useState(4)
  const [result, setResult] = useState<"win" | "lose" | null>(null)
  const [showResult, setShowResult] = useState(false)

  const rollDice = (betType: "total" | "exact") => {
    if (!betAmount || Number.parseFloat(betAmount) <= 0) return

    setIsRolling(true)
    setShowResult(false)
    setResult(null)

    setTimeout(() => {
      const newDice1 = Math.floor(Math.random() * 6) + 1
      const newDice2 = Math.floor(Math.random() * 6) + 1
      setDice1(newDice1)
      setDice2(newDice2)
      setIsRolling(false)

      setTimeout(() => {
        const total = newDice1 + newDice2
        let won = false

        if (betType === "total") {
          won = total === selectedTotal
        } else {
          won = newDice1 === selectedDice1 && newDice2 === selectedDice2
        }

        setResult(won ? "win" : "lose")
        setShowResult(true)
      }, 500)
    }, 2000)
  }

  return (
    <Card className="bg-card border-primary/20 p-8 rounded-xl animate-slide-in card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/20 p-2.5 rounded-xl">
          <Dices className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Double Dice</h2>
      </div>

      {/* Dice Display */}
      <div className="flex justify-center gap-8 mb-8">
        <Dice value={dice1} isRolling={isRolling} isWinner={result === "win"} />
        <Dice value={dice2} isRolling={isRolling} isWinner={result === "win"} />
      </div>

      {/* Result Display */}
      {showResult && (
        <div
          className={`
            text-center mb-6 p-4 rounded-xl animate-slide-in
            ${result === "win" ? "bg-success/10 border border-success/30 glow-green" : "bg-destructive/10 border border-destructive/30 glow-red"}
          `}
        >
          <p className={`text-2xl font-bold ${result === "win" ? "text-success" : "text-destructive"}`}>
            {result === "win" ? "🎉 You Won!" : "😔 You Lost"}
          </p>
          <p className="text-muted-foreground mt-1">Total: {dice1 + dice2}</p>
        </div>
      )}

      {/* Betting Interface */}
      <Tabs defaultValue="total" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
          <TabsTrigger
            value="total"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
          >
            <Target className="w-4 h-4 mr-2" />
            Bet on Total
          </TabsTrigger>
          <TabsTrigger
            value="exact"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
          >
            <Dices className="w-4 h-4 mr-2" />
            Exact Bet (Plus)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="total" className="space-y-5">
          <div>
            <Label htmlFor="total-select" className="text-foreground mb-3 block font-medium">
              Select Total (2-12)
            </Label>
            <div className="grid grid-cols-11 gap-2">
              {Array.from({ length: 11 }, (_, i) => i + 2).map((num) => (
                <Button
                  key={num}
                  variant={selectedTotal === num ? "default" : "outline"}
                  className={`
                    rounded-lg transition-all duration-300
                    ${selectedTotal === num ? "bg-primary text-primary-foreground glow-violet" : "border-primary/30 hover:border-primary hover:glow-violet"}
                  `}
                  onClick={() => setSelectedTotal(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="bet-amount-total" className="text-foreground mb-3 block font-medium">
              Bet Amount (Tokens)
            </Label>
            <Input
              id="bet-amount-total"
              type="number"
              placeholder="Enter amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="bg-muted border-primary/30 text-foreground focus:border-primary rounded-lg h-12"
            />
          </div>

          <Button
            onClick={() => rollDice("total")}
            disabled={isRolling || !betAmount}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg rounded-xl glow-violet hover:glow-violet-strong transition-all duration-300 disabled:opacity-50"
          >
            {isRolling ? "Rolling..." : "Place Bet on Total"}
          </Button>
        </TabsContent>

        <TabsContent value="exact" className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground mb-3 block font-medium">First Dice</Label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Button
                    key={num}
                    variant={selectedDice1 === num ? "default" : "outline"}
                    className={`
                      rounded-lg transition-all duration-300
                      ${selectedDice1 === num ? "bg-primary text-primary-foreground glow-violet" : "border-primary/30 hover:border-primary hover:glow-violet"}
                    `}
                    onClick={() => setSelectedDice1(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-foreground mb-3 block font-medium">Second Dice</Label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Button
                    key={num}
                    variant={selectedDice2 === num ? "default" : "outline"}
                    className={`
                      rounded-lg transition-all duration-300
                      ${selectedDice2 === num ? "bg-primary text-primary-foreground glow-violet" : "border-primary/30 hover:border-primary hover:glow-violet"}
                    `}
                    onClick={() => setSelectedDice2(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="bet-amount-exact" className="text-foreground mb-3 block font-medium">
              Bet Amount (Tokens)
            </Label>
            <Input
              id="bet-amount-exact"
              type="number"
              placeholder="Enter amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="bg-muted border-primary/30 text-foreground focus:border-primary rounded-lg h-12"
            />
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-xl p-3 text-center">
            <p className="text-accent font-semibold">💎 Exact Match Bonus: 10x Payout!</p>
          </div>

          <Button
            onClick={() => rollDice("exact")}
            disabled={isRolling || !betAmount}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-6 text-lg rounded-xl glow-violet-strong transition-all duration-300 disabled:opacity-50"
          >
            {isRolling ? "Rolling..." : "Place Exact Bet"}
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
