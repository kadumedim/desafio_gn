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
  const viewportRef = useRef<HTMLDivElement>(null)

  // Auto-scroll
  useEffect(() => {
    const viewport = document.querySelector('[data-radix-scroll-area-viewport]')
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [commandLogs])

  // Load commands
  useEffect(() => {
    try {
      console.log("Salvando no local storage")
      const storedCommands = localStorage.getItem('linuxCommands')
      if (storedCommands) {
        const parsedCommands = JSON.parse(storedCommands)
        setCommands(parsedCommands)
      }
      else {
        localStorage.setItem('linuxCommands', JSON.stringify(defaultCommands))
      }
    } catch (error) {
      console.error('Error loading stored commands:', error)
      setCommands(defaultCommands)
    }
  }, [])

  const handleCommandSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !command.trim()) return;
    
    const cmd = command.trim().split(" ")[0].toLowerCase();
    const newLogs: string[] = [];
    
    // Add command to logs first
    newLogs.push(`$ ${command}`);
    
    // Add command response
    if (cmd in commands) {
      newLogs.push(`Descrição: ${commands[cmd].description}`);
      newLogs.push(`Exemplo: ${commands[cmd].example}`);
    } else {
      newLogs.push(`Comando não reconhecido: ${cmd}`);
    }
    
    // Update logs (add new logs at the end for chronological display)
    setCommandLogs(prev => [...prev, ...newLogs]);
    setCommand("");
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
            <div ref={viewportRef} className="h-full">
              {commandLogs.length > 0 ? (
                commandLogs.map((log, index) => (
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
