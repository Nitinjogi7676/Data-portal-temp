import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-blue-800 dark:text-blue-400 sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Sahyadri College of Engineering and Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
                  Comprehensive Data Management Portal System
                </p>
              </div>
              <div className="space-x-4 mt-6">
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

