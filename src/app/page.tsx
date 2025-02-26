import { ChatInput } from "./components/ChatInput"

export default function Home() {
  return (
    <div className="grid grid-rows-[200px_1fr_20px] items-start justify-items-center min-h-screen sm:p-20 pt-12 font-[family-name:var(--font-space-grotesk)]">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-3xl">
        <div className="w-full bg-black/[.08] dark:bg-white/[.08] rounded-2xl">
          <ChatInput />
        </div>
      </div>
    </div>
  )
}
