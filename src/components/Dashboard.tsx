import { Card } from "./ui/card";
import { 
  Activity, 
  AlertCircle, 
  CheckCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Badge } from "./ui/badge";

export function Dashboard() {
  const stats = [
    {
      title: "API Requests",
      value: "1,284,392",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Transactions Processed",
      value: "$2.4M",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Success Rate",
      value: "99.7%",
      change: "+0.3%",
      trend: "up",
      icon: CheckCircle,
    },
    {
      title: "Avg Response Time",
      value: "142ms",
      change: "-5.1%",
      trend: "down",
      icon: Clock,
    },
  ];

  const recentCalls = [
    {
      endpoint: "/api/v1/transactions/create",
      method: "POST",
      status: 200,
      time: "142ms",
      timestamp: "2 min ago",
    },
    {
      endpoint: "/api/v1/balance/check",
      method: "GET",
      status: 200,
      time: "87ms",
      timestamp: "5 min ago",
    },
    {
      endpoint: "/api/v1/payments/process",
      method: "POST",
      status: 200,
      time: "324ms",
      timestamp: "7 min ago",
    },
    {
      endpoint: "/api/v1/transfers/international",
      method: "POST",
      status: 429,
      time: "52ms",
      timestamp: "12 min ago",
    },
    {
      endpoint: "/api/v1/accounts/details",
      method: "GET",
      status: 200,
      time: "103ms",
      timestamp: "15 min ago",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-slate-600">Monitor your API performance and usage metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <stat.icon className="w-5 h-5 text-emerald-700" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === "up" ? "text-emerald-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">{stat.title}</p>
              <p className="text-2xl">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent API Calls */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl mb-1">Recent API Calls</h2>
            <p className="text-slate-600 text-sm">Latest requests to your financial API</p>
          </div>
          <Badge variant="outline" className="text-emerald-700 border-emerald-300">
            Live
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-3 text-sm text-slate-600">Endpoint</th>
                <th className="text-left pb-3 text-sm text-slate-600">Method</th>
                <th className="text-left pb-3 text-sm text-slate-600">Status</th>
                <th className="text-left pb-3 text-sm text-slate-600">Response Time</th>
                <th className="text-left pb-3 text-sm text-slate-600">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-4">
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                      {call.endpoint}
                    </code>
                  </td>
                  <td className="py-4">
                    <Badge 
                      variant="outline"
                      className={
                        call.method === "POST" 
                          ? "border-blue-300 text-blue-700"
                          : "border-green-300 text-green-700"
                      }
                    >
                      {call.method}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={call.status === 200 ? "default" : "destructive"}
                      className={call.status === 200 ? "bg-emerald-600" : ""}
                    >
                      {call.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-sm">{call.time}</td>
                  <td className="py-4 text-sm text-slate-600">{call.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Alerts */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 mt-0.5" />
            <div>
              <h3 className="mb-1 text-amber-900">Rate Limit Warning</h3>
              <p className="text-sm text-amber-800">
                API key <code className="bg-amber-100 px-1 rounded">pk_live_...</code> approaching rate limit (87%)
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-emerald-200 bg-emerald-50">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-700 mt-0.5" />
            <div>
              <h3 className="mb-1 text-emerald-900">System Status</h3>
              <p className="text-sm text-emerald-800">
                All payment processing systems operational
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

