import ProtectedLayout from "@/components/ProtectedLayout"

export default function MerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedLayout requiredRole="mer">
      {children}
    </ProtectedLayout>
  )
}