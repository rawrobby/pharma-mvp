import ProtectedLayout from "@/components/ProtectedLayout"

export default function SpeakerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedLayout requiredRole="speaker">
      {children}
    </ProtectedLayout>
  )
}