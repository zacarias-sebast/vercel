import { Navbar } from '@/components/Navbar'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50">{children}</main>
    </>
  )
}
