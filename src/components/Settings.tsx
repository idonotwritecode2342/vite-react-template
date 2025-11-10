import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Key, 
  Eye, 
  EyeOff, 
  Copy, 
  Plus, 
  Trash2,
  Check,
  AlertCircle
} from "lucide-react";

export function Settings() {
  const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const apiKeys = [
    {
      id: "1",
      name: "Production Key",
      key: "pk_live_51JxK2bL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0u",
      created: "Oct 15, 2024",
      lastUsed: "2 hours ago",
      status: "active",
      environment: "Production",
    },
    {
      id: "2",
      name: "Development Key",
      key: "pk_test_51JxK2bL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0u",
      created: "Sep 28, 2024",
      lastUsed: "1 day ago",
      status: "active",
      environment: "Development",
    },
    {
      id: "3",
      name: "Legacy Key",
      key: "pk_live_41HxI2aJ3lM4nO5pQ6rS7tU8vW9xY0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0t",
      created: "Aug 12, 2024",
      lastUsed: "15 days ago",
      status: "inactive",
      environment: "Production",
    },
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey((prev) => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key: string) => {
    return key.slice(0, 12) + "•".repeat(20) + key.slice(-4);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-slate-600">
          Manage your API keys, authentication, and security settings
        </p>
      </div>

      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="mt-6 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl mb-1">API Keys</h2>
                <p className="text-slate-600 text-sm">
                  Manage your API authentication keys
                </p>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New Key
              </Button>
            </div>

            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} className="p-5 border-slate-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3>{apiKey.name}</h3>
                        <Badge
                          variant={
                            apiKey.status === "active" ? "default" : "secondary"
                          }
                          className={
                            apiKey.status === "active" ? "bg-emerald-600" : ""
                          }
                        >
                          {apiKey.status}
                        </Badge>
                        <Badge variant="outline">{apiKey.environment}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Key className="w-4 h-4 text-slate-400" />
                        <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                          {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="h-8 w-8 p-0"
                        >
                          {showKey[apiKey.id] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="h-8 w-8 p-0"
                        >
                          {copiedKey === apiKey.key ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex gap-4 text-sm text-slate-600">
                        <span>Created: {apiKey.created}</span>
                        <span>•</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Authentication Tab */}
        <TabsContent value="authentication" className="mt-6 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl mb-4">Authentication Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <h3 className="mb-1">Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <h3 className="mb-1">IP Whitelisting</h3>
                  <p className="text-sm text-slate-600">
                    Restrict API access to specific IP addresses
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <h3 className="mb-1">API Key Rotation</h3>
                  <p className="text-sm text-slate-600">
                    Automatically rotate API keys every 90 days
                  </p>
                </div>
                <Switch />
              </div>

              <div className="pt-4">
                <Label htmlFor="webhook-secret">Webhook Secret</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="webhook-secret"
                    type="password"
                    value="whsec_1234567890abcdefghijklmnopqrstuv"
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Rate Limits Tab */}
        <TabsContent value="rate-limits" className="mt-6 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl mb-4">Rate Limits</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 bg-slate-50">
                  <p className="text-sm text-slate-600 mb-1">Current Plan</p>
                  <p className="text-2xl">Enterprise</p>
                </Card>
                <Card className="p-4 bg-slate-50">
                  <p className="text-sm text-slate-600 mb-1">Requests / Second</p>
                  <p className="text-2xl">1,000</p>
                </Card>
                <Card className="p-4 bg-slate-50">
                  <p className="text-sm text-slate-600 mb-1">Monthly Quota</p>
                  <p className="text-2xl">10M</p>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex-1">
                    <h3 className="mb-1">Transaction API</h3>
                    <p className="text-sm text-slate-600">100 requests per minute</p>
                  </div>
                  <Badge variant="outline" className="text-emerald-700 border-emerald-300">
                    85% used
                  </Badge>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex-1">
                    <h3 className="mb-1">Payment API</h3>
                    <p className="text-sm text-slate-600">200 requests per minute</p>
                  </div>
                  <Badge variant="outline" className="text-emerald-700 border-emerald-300">
                    45% used
                  </Badge>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex-1">
                    <h3 className="mb-1">Balance Check API</h3>
                    <p className="text-sm text-slate-600">500 requests per minute</p>
                  </div>
                  <Badge variant="outline" className="text-emerald-700 border-emerald-300">
                    22% used
                  </Badge>
                </div>
              </div>

              <Card className="p-4 bg-amber-50 border-amber-200 mt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-700 mt-0.5" />
                  <div>
                    <h3 className="mb-1 text-amber-900">Rate Limit Information</h3>
                    <p className="text-sm text-amber-800">
                      Rate limits reset every minute. Exceeding limits will result in 429 responses.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="mt-6 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl mb-1">Webhooks</h2>
                <p className="text-slate-600 text-sm">
                  Configure webhook endpoints for real-time event notifications
                </p>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Endpoint
              </Button>
            </div>

            <div className="space-y-4">
              <Card className="p-5 border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>Production Webhook</h3>
                      <Badge className="bg-emerald-600">Active</Badge>
                    </div>
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                      https://api.yourcompany.com/webhooks/finance
                    </code>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">payment.succeeded</Badge>
                      <Badge variant="outline" className="text-xs">payment.failed</Badge>
                      <Badge variant="outline" className="text-xs">transfer.created</Badge>
                      <Badge variant="outline" className="text-xs">balance.updated</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

