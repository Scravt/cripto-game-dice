"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useWallet } from "@/hooks/useWallet"

export function WalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { connectWallet, disconnectWallet, error } = useWallet()

  const handleConnect = () => {
    connectWallet()
  }

  return (
    <Button
      onClick={handleConnect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        bg-primary hover:bg-primary/90
        text-primary-foreground font-semibold
        px-6 py-3 rounded-lg
        transition-all duration-300
        ${isHovered ? "glow-violet scale-105" : ""}
      `}
    >
      <div className="flex items-center gap-2">
        <Wallet className={`w-5 h-5 ${isHovered ? "animate-float" : ""}`} />
        <span>{isConnected ? "0x1234...5678" : "Connect Wallet"}</span>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      )}
    </Button>
  )
}
