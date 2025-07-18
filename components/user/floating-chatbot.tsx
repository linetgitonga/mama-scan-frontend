"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatbotPage } from "../../app/users/chatbot/page"
import { cn } from "@/lib/utils"

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleChat = () => {
    if (isOpen && !isMinimized) {
      setIsMinimized(true)
    } else if (isOpen && isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(true)
      setIsMinimized(false)
    }
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  return (
    <>
      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 right-4 z-50 transition-all duration-300 ease-in-out",
            isMinimized ? "w-80 h-12" : "w-96 h-[500px]",
            "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]",
          )}
        >
          <Card className="h-full shadow-2xl border-2 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Sasha - Health Assistant
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-white/20"
                  onClick={toggleChat}
                >
                  <Minimize2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-white/20"
                  onClick={closeChat}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            {!isMinimized && (
              <CardContent className="p-0 h-[calc(100%-3rem)]">
                <div className="h-full">
                  <ChatbotPage />
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 z-40">
        {!isOpen ? (
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Open Sasha Chat</span>
          </Button>
        ) : (
          <div className="flex flex-col gap-2">
            <Link href="/users/chatbot">
              <Button
                variant="outline"
                size="sm"
                className="bg-background/95 backdrop-blur-sm hover:bg-background text-xs px-3 py-1 h-8"
              >
                Full Chat
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Floating Label */}
      {!isOpen && (
        <div className="fixed bottom-4 right-20 z-30 pointer-events-none">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
            Chat with Sasha
          </div>
        </div>
      )}
    </>
  )
}
