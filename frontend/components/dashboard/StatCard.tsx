'use client'

interface StatCardProps {
  title: string
  value: string
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-ns-card border border-ns-border rounded-lg p-6">
      <h3 className="text-sm text-ns-muted font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-ns-light">{value}</p>
    </div>
  )
}