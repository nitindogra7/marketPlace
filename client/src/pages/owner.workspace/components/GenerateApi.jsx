import { useState } from "react";
import { Copy, KeyRound, RefreshCw } from "lucide-react";

const GenerateApi = () => {
  const [apiKey, setApiKey] = useState("");

  const generateKey = () => {
    const key =
      "crm_" +
      crypto.randomUUID().replaceAll("-", "") +
      "_" +
      Math.random().toString(36).slice(2, 10);

    setApiKey(key);
  };

  const copyKey = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="flex h-screen w-full justify-center">
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl border border-neutral-900 flex items-center justify-center">
            <KeyRound className="h-5 w-5 text-neutral-300" />
          </div>

          <div>
            <h1 className="text-xl font-semibold">Generate API Key</h1>
            <p className="text-sm text-neutral-500">
              Create an API key to connect your website forms.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-900 bg-black p-4 mb-5">
          <label className="text-sm text-neutral-500">Your API Key</label>

          <div className="mt-3 flex items-center gap-3">
            <input
              value={apiKey || "No API key generated yet"}
              readOnly
              className="w-full bg-transparent text-sm text-neutral-300 outline-none"
            />

            <button
              onClick={copyKey}
              disabled={!apiKey}
              className="rounded-lg border border-neutral-900 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-900 disabled:opacity-40"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button
          onClick={generateKey}
          className="w-full rounded-xl border border-neutral-900 bg-white text-black py-3 font-medium hover:bg-neutral-200 flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Generate API Key
        </button>

        <p className="mt-4 text-xs text-neutral-600">
          Keep this key private. Anyone with this key can send leads to your CRM.
        </p>
      </div>
    </div>
    </div>
  );
};

export default GenerateApi;