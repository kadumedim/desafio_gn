"use client"

import { Send, Link, Zap } from "lucide-react"
import { useState } from "react"

export function ChatInput() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex flex-col">
      <form 
        className="flex items-center gap-2 p-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (!message.trim()) return
          // Handle message submission here
          setMessage("")
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What will you ask today?"
          className="flex-1 bg-black/[.1] dark:bg-white/[.1] border-none rounded-full px-4 py-2 text-base outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
        />
        <button
          type="submit"
          className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
        >
          <Send size={20} className="text-foreground/80" />
        </button>
      </form>

      <div className="border-t border-foreground/[.08] px-4 py-2 flex gap-4">
        <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground/80 transition-colors">
          <Link size={16} />
          Attach
        </button>
        <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground/80 transition-colors">
          <Zap size={16} />
          Commands
        </button>
      </div>
    </div>
  )
}