"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState, KeyboardEvent, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SettingsMenu } from "@/components/ui/settings-menu"
import { CommandDialog } from "@/components/ui/command-dialog"

const linuxCommands = {
  ls: "Lista arquivos e diretórios no diretório atual.",
  cd: "Muda o diretório atual para o especificado.",
  mkdir: "Cria um novo diretório com o nome especificado.",
  rm: "Remove arquivos ou diretórios.",
  grep: "Busca por padrões em arquivos de texto.",
}

export function ChatCard() {
  const [command, setCommand] = useState("")
  const [commandLogs, setCommandLogs] = useState<string[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when logs update
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [commandLogs])

  const handleCommandSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && command.trim()) {
      // Add the command to logs
      setCommandLogs((prev) => [...prev, `$ ${command}`])

      // Check if it's a recognized command
      const cmd = command.trim().split(" ")[0].toLowerCase()
      if (cmd in linuxCommands) {
        setCommandLogs((prev) => [
          ...prev,
          `${linuxCommands[cmd as keyof typeof linuxCommands]}`,
        ])
      } else {
        setCommandLogs((prev) => [...prev, `Comando não reconhecido: ${cmd}`])
      }

      setCommand("")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Guia de Comandos Interativo</CardTitle>
          <CardDescription>Explore e teste comandos de Linux!</CardDescription>
        </div>

        <SettingsMenu onClearHistory={() => setCommandLogs([])} />
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 relative">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommandSubmit}
              placeholder="Digite um comando Linux..."
              className="font-mono pr-24"
              autoComplete="off"
            />
            <CommandDialog commands={linuxCommands} />
          </div>

          <ScrollArea className="h-[200px] w-full rounded-md border p-4 font-mono text-sm">
            <div ref={scrollAreaRef}>
              {commandLogs.length > 0 ? (
                [...commandLogs].reverse().map((log, index) => (
                  <div key={index} className="pb-2">
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground">
                  Histórico de comandos
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter>
       
      </CardFooter>
    </Card>
  )
}
