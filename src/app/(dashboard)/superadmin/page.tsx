import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SUPERADMINDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Superadmin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Placeholder</div>
            <p className="text-xs text-muted-foreground">Statistics for superadmin</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
