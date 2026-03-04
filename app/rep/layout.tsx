import ProtectedLayout from "@/components/ProtectedLayout"

export default function RepLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedLayout requiredRole="rep">
      {children}
    </ProtectedLayout>
  )
}