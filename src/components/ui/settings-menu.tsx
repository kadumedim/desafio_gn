"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Settings, Sun, Eraser, RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

interface SettingsMenuProps {
  onClearHistory: () => void
  onResetCommands: () => void
}

export function SettingsMenu({ onClearHistory, onResetCommands }: SettingsMenuProps) {
  const { theme, setTheme } = useTheme()

  return (
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
        <DropdownMenuItem onSelect={onClearHistory}>
          <div className="flex items-center gap-2">
            <Eraser className="h-4 w-4" />
            Limpar histórico
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onResetCommands}>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Restaurar comandos
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}