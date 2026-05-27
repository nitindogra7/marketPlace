import { useState } from "react";
import {Link} from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  KeyRound,
  BarChart3,
  Settings,
  User,
  LogOut,
  Globe,
} from "lucide-react";

export default function Nav({response}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside className="w-[280px] min-h-screen bg-black border-r border-neutral-900 text-white px-7 py-10 flex flex-col justify-between">

      <div>

        {/* Logo */}
        <h1 className="text-2xl font-serif tracking-wide mb-12">
          Sales Nova
        </h1>

        {/* Main Menu */}
        <div className="space-y-4">

          <h2 className="text-xs uppercase tracking-[3px] text-neutral-500">
            Main Menu
          </h2>

          <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 transition">
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl border border-neutral-900 hover:bg-neutral-950 transition">
            <Users size={18} />
            Leads
          </button>
          <Link to="/workspace/generate-api" className="w-full flex items-center gap-3 px-5 py-3 rounded-xl border border-neutral-900 hover:bg-neutral-950 transition">
            <KeyRound size={18} />
            Your API
          </Link>

          <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl border border-neutral-900 hover:bg-neutral-950 transition">
            <BarChart3 size={18} />
            Analytics
          </button>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 relative">

        {/* Profile */}
        <div className="border border-neutral-900 rounded-xl px-4 py-4 flex items-center gap-4">

          <div className="h-11 w-11 rounded-full bg-neutral-900 flex items-center justify-center">
            <User size={18} />
          </div>

          <div>
            <h1 className="text-sm font-medium">
                {response?.user?.username}
            </h1>

            <p className="text-xs text-neutral-500">
              {response?.user?.role}
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="relative">

          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="w-full flex items-center gap-3 px-5 py-3 rounded-xl border border-neutral-900 hover:bg-neutral-950 transition"
          >
            <Settings size={18} />
            Settings
          </button>

          {settingsOpen && (
            <div className="absolute bottom-16 left-0 w-full bg-neutral-950 border border-neutral-900 rounded-xl p-2">

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-900 transition">
                <User size={16} />
                Profile
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-900 transition">
                Workspace
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-neutral-900 transition">
                <LogOut size={16} />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>

    </aside>
  );
}