"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface CommandDialogProps {
  commands: Record<string, string>
}

export function CommandDialog({ commands }: CommandDialogProps) {
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
              {Object.entries(commands).map(([cmd, desc]) => (
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
  )
}