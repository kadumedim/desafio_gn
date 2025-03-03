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

const defaultCommands = {
  ls: {
    description: "Lista arquivos e diretórios no diretório atual.",
    example: "ls -l (lista detalhada) ou ls /pasta (lista conteúdo da pasta)"
  },
  cd: {
    description: "Muda o diretório atual para o especificado.",
    example: "cd /home ou cd .. (volta um diretório)"
  },
  mkdir: {
    description: "Cria um novo diretório com o nome especificado.",
    example: "mkdir nova_pasta ou mkdir -p pasta1/pasta2"
  },
  rm: {
    description: "Remove arquivos ou diretórios.",
    example: "rm arquivo.txt ou rm -r pasta (remove recursivamente)"
  },
  grep: {
    description: "Busca por padrões em arquivos de texto.",
    example: "grep 'palavra' arquivo.txt ou grep -r 'texto' ."
  }
}

type LinuxCommand = {
  description: string
  example: string
}

type LinuxCommands = Record<string, LinuxCommand>

export function ChatCard() {
  const [command, setCommand] = useState("")
  const [commandLogs, setCommandLogs] = useState<string[]>([])
  const [commands, setCommands] = useState<LinuxCommands>(defaultCommands)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Load commands from localStorage on mount
  useEffect(() => {
    const storedCommands = localStorage.getItem('linuxCommands')
    if (storedCommands) {
      try {
        const parsedCommands = JSON.parse(storedCommands)
        setCommands(parsedCommands)
      } catch (error) {
        console.error('Error parsing stored commands:', error)
        // If there's an error parsing, use default commands
        setCommands(defaultCommands)
      }
    }
  }, [])

  // Auto-scroll to bottom when logs update
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [commandLogs])

  const handleCommandSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && command.trim()) {
      const cmd = command.trim().split(" ")[0].toLowerCase()
      if (cmd in commands) {
        setCommandLogs((prev) => [
          `Exemplo: ${commands[cmd].example}`,
          `Descrição: ${commands[cmd].description}`,
          `$ ${command}`,
          ...prev
        ])
      } else {
        setCommandLogs((prev) => [...prev, `$ ${command}`, `Comando não reconhecido: ${cmd}`])
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
            <CommandDialog commands={commands} />
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
