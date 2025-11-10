import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";

export function Endpoints() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const endpoints = [
    {
      path: "/api/v1/transactions/create",
      method: "POST",
      category: "Transactions",
      description: "Create a new financial transaction",
      parameters: [
        { name: "amount", type: "number", required: true, description: "Transaction amount in cents" },
        { name: "currency", type: "string", required: true, description: "ISO currency code (e.g., USD, EUR)" },
        { name: "account_id", type: "string", required: true, description: "Account identifier" },
        { name: "description", type: "string", required: false, description: "Transaction description" },
      ],
      response: {
        transaction_id: "txn_1A2B3C4D5E6F",
        status: "pending",
        amount: 10000,
        currency: "USD",
      },
    },
    {
      path: "/api/v1/balance/check",
      method: "GET",
      category: "Accounts",
      description: "Retrieve account balance information",
      parameters: [
        { name: "account_id", type: "string", required: true, description: "Account identifier" },
      ],
      response: {
        account_id: "acc_789XYZ",
        available_balance: 150000,
        pending_balance: 5000,
        currency: "USD",
      },
    },
    {
      path: "/api/v1/payments/process",
      method: "POST",
      category: "Payments",
      description: "Process a payment transaction",
      parameters: [
        { name: "amount", type: "number", required: true, description: "Payment amount" },
        { name: "source", type: "string", required: true, description: "Payment source (card, bank)" },
        { name: "destination", type: "string", required: true, description: "Destination account" },
        { name: "metadata", type: "object", required: false, description: "Additional metadata" },
      ],
      response: {
        payment_id: "pmt_ABC123",
        status: "completed",
        amount: 50000,
      },
    },
    {
      path: "/api/v1/transfers/international",
      method: "POST",
      category: "Transfers",
      description: "Execute international wire transfer",
      parameters: [
        { name: "amount", type: "number", required: true, description: "Transfer amount" },
        { name: "source_currency", type: "string", required: true, description: "Source currency code" },
        { name: "destination_currency", type: "string", required: true, description: "Destination currency code" },
        { name: "recipient_iban", type: "string", required: true, description: "Recipient IBAN" },
      ],
      response: {
        transfer_id: "xfr_XYZ789",
        status: "processing",
        exchange_rate: 1.18,
      },
    },
    {
      path: "/api/v1/accounts/details",
      method: "GET",
      category: "Accounts",
      description: "Get detailed account information",
      parameters: [
        { name: "account_id", type: "string", required: true, description: "Account identifier" },
        { name: "include_history", type: "boolean", required: false, description: "Include transaction history" },
      ],
      response: {
        account_id: "acc_789XYZ",
        account_type: "checking",
        status: "active",
      },
    },
  ];

  const filteredEndpoints = endpoints.filter(
    (endpoint) =>
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">API Endpoints</h1>
        <p className="text-slate-600">
          Complete reference for all available financial API endpoints
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search endpoints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Endpoints List */}
      <div className="space-y-4">
        {filteredEndpoints.map((endpoint, index) => (
          <Card key={index} className="p-6">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      endpoint.method === "POST"
                        ? "border-blue-300 text-blue-700"
                        : "border-green-300 text-green-700"
                    }
                  >
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm bg-slate-100 px-3 py-1 rounded">
                    {endpoint.path}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(endpoint.path)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedEndpoint === endpoint.path ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <Badge variant="secondary">{endpoint.category}</Badge>
              </div>
              <p className="text-slate-600">{endpoint.description}</p>
            </div>

            <Tabs defaultValue="parameters" className="w-full">
              <TabsList>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
              </TabsList>

              <TabsContent value="parameters" className="mt-4">
                <div className="space-y-3">
                  {endpoint.parameters.map((param, paramIndex) => (
                    <div
                      key={paramIndex}
                      className="flex items-start gap-4 pb-3 border-b last:border-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm">{param.name}</code>
                          {param.required && (
                            <Badge variant="destructive" className="text-xs px-1.5 py-0">
                              required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{param.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {param.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="response" className="mt-4">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </Card>
        ))}
      </div>

      {filteredEndpoints.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No endpoints found matching your search.</p>
        </div>
      )}
    </div>
  );
}

