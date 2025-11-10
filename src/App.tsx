import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Endpoints } from "./components/Endpoints";
import { Settings } from "./components/Settings";
import { 
  LayoutDashboard, 
  Network, 
  Settings as SettingsIcon,
  Building2
} from "lucide-react";

type View = "dashboard" | "endpoints" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-lg">FinanceAPI</h1>
              <p className="text-xs text-slate-400">Payment Platform</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "dashboard"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView("endpoints")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "endpoints"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Network className="w-5 h-5" />
              <span>Endpoints</span>
            </button>

            <button
              onClick={() => setCurrentView("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "settings"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-sm">JD</span>
            </div>
            <div>
              <p className="text-sm">John Doe</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "endpoints" && <Endpoints />}
        {currentView === "settings" && <Settings />}
      </main>
    </div>
  );
}
