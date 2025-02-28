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
import { Moon, Settings, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function ChatCard() {
  const { theme, setTheme } = useTheme()

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
                event.preventDefault();
                setTheme(theme === "dark" ? "light" : "dark");
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
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/*  */}
      </CardHeader>
      <Separator />
      <CardContent className="p-6"></CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  )
}
