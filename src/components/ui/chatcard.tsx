"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Settings, Sun, Eraser } from "lucide-react"
import { useTheme } from "next-themes"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useState, KeyboardEvent, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define Linux commands and their descriptions
const linuxCommands = {
  ls: "Lista arquivos e diretórios no diretório atual.",
  cd: "Muda o diretório atual para o especificado.",
  mkdir: "Cria um novo diretório com o nome especificado.",
  rm: "Remove arquivos ou diretórios.",
  grep: "Busca por padrões em arquivos de texto.",
}

export function ChatCard() {
  const { theme, setTheme } = useTheme()
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault()
                setTheme(theme === "dark" ? "light" : "dark")
              }}
            >
              <div className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                Mudar tema
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setCommandLogs([])
              }}
            >
              <div className="flex items-center gap-2">
                <Eraser className="h-4 w-4" />
                Limpar histórico
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs px-2 py-1 h-auto"
                >
                  Ver Comandos
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Comandos Linux Disponíveis</DialogTitle>
                  <DialogDescription>
                    Lista de comandos que você pode testar no terminal.
                  </DialogDescription>
                </DialogHeader>
               
                <div className="py-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Comando</TableHead>
                        <TableHead>Descrição</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(linuxCommands).map(([cmd, desc]) => (
                        <TableRow key={cmd}>
                          <TableCell className="font-mono font-bold">{cmd}</TableCell>
                          <TableCell>{desc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </Dialog>
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
