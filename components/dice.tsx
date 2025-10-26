"use client"

import { useState, useEffect } from "react"

interface DiceProps {
  value: number
  isRolling: boolean
  isWinner?: boolean
}

export function Dice({ value, isRolling, isWinner = false }: DiceProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1)
      }, 100)
      return () => clearInterval(interval)
    } else {
      setDisplayValue(value)
    }
  }, [isRolling, value])

  const getDotPositions = (num: number) => {
    const positions: { [key: number]: string[] } = {
      1: ["center"],
      2: ["top-left", "bottom-right"],
      3: ["top-left", "center", "bottom-right"],
      4: ["top-left", "top-right", "bottom-left", "bottom-right"],
      5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
      6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"],
    }
    return positions[num] || []
  }

  const dotClasses: { [key: string]: string } = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "middle-left": "top-1/2 -translate-y-1/2 left-2",
    "middle-right": "top-1/2 -translate-y-1/2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  return (
    <div
      className={`
        relative w-24 h-24 bg-gradient-to-br from-card to-muted
        border-2 rounded-xl
        flex items-center justify-center
        transition-all duration-300
        ${isRolling ? "animate-roll border-primary" : "border-primary/40"}
        ${isWinner ? "glow-violet-strong border-accent" : ""}
        ${!isRolling && !isWinner ? "hover:scale-105" : ""}
      `}
    >
      {getDotPositions(displayValue).map((position, index) => (
        <div
          key={index}
          className={`
            absolute w-3 h-3 rounded-full
            ${dotClasses[position]}
            ${isWinner ? "bg-accent animate-pulse-glow" : "bg-foreground"}
          `}
        />
      ))}
    </div>
  )
}
