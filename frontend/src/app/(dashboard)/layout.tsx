import { AppSidebar } from '@/components/layout/app-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 min-w-0 overflow-auto bg-neutral-50">
        {children}
      </main>
    </div>
  )
}
