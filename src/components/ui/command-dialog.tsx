"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react"

interface CommandDialogProps {
  commands: Record<string, {
    description: string
    example: string
  }>
  onUpdateCommands: (commands: Record<string, {
    description: string
    example: string
  }>) => void
}

export function CommandDialog({ commands, onUpdateCommands }: CommandDialogProps) {
  const [newCommand, setNewCommand] = useState({
    name: "",
    description: "",
    example: ""
  })

  const handleAddCommand = () => {
    if (!newCommand.name || !newCommand.description || !newCommand.example) return

    const updatedCommands = {
      ...commands,
      [newCommand.name]: {
        description: newCommand.description,
        example: newCommand.example
      }
    }

    onUpdateCommands(updatedCommands)
    setNewCommand({ name: "", description: "", example: "" })
  }

  const handleDeleteCommand = (cmd: string) => {
    const updatedCommands = { ...commands }
    delete updatedCommands[cmd]
    onUpdateCommands(updatedCommands)
  }

  return (
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
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Comandos Linux Disponíveis</DialogTitle>
          <DialogDescription>
            Lista de comandos que você pode testar no terminal.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Comando"
              value={newCommand.name}
              onChange={(e) => setNewCommand(prev => ({ ...prev, name: e.target.value.toLowerCase() }))}
            />
            <Input
              placeholder="Descrição"
              value={newCommand.description}
              onChange={(e) => setNewCommand(prev => ({ ...prev, description: e.target.value }))}
            />
            <Input
              placeholder="Exemplo"
              value={newCommand.example}
              onChange={(e) => setNewCommand(prev => ({ ...prev, example: e.target.value }))}
            />
          </div>
          <Button
            onClick={handleAddCommand}
            className="w-full"
            disabled={!newCommand.name || !newCommand.description || !newCommand.example}
          >
            Adicionar Comando
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Comando</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Exemplo</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(commands).map(([cmd, info]) => (
                <TableRow key={cmd}>
                  <TableCell className="font-mono font-bold">{cmd}</TableCell>
                  <TableCell>{info.description}</TableCell>
                  <TableCell className="font-mono">{info.example}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCommand(cmd)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}