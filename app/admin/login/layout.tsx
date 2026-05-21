export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout para página de login - sem proteção de autenticação
  return <>{children}</>
}
