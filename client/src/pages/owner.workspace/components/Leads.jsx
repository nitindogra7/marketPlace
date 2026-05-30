import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../apis/Api"; // adjust path according to your folder

import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  Building2,
  Clock,
  CheckCircle2,
  CircleDot,
  MoreVertical,
  User,
  Plus,
  ArrowUpRight,
} from "lucide-react";

export default function Leads() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await api.get("/api/leads");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="min-h-screen w-full bg-black text-white px-8 py-10">
        <div className="mx-auto w-full max-w-[1120px]">
          <p className="text-neutral-500">Loading leads...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen w-full bg-black text-white px-8 py-10">
        <div className="mx-auto w-full max-w-[1120px]">
          <p className="text-red-400">
            {error?.response?.data?.message || "Failed to load leads"}
          </p>
        </div>
      </section>
    );
  }

  const leads = data?.leads || [];

  const filteredLeads = leads.filter((lead) => {
    const searchValue = search.toLowerCase();

    return (
      lead.name?.toLowerCase().includes(searchValue) ||
      lead.email?.toLowerCase().includes(searchValue) ||
      lead.phone?.toLowerCase().includes(searchValue) ||
      lead.source?.toLowerCase().includes(searchValue)
    );
  });

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const contactedLeads = leads.filter(
    (lead) => lead.status === "contacted"
  ).length;
  const proposalLeads = leads.filter(
    (lead) => lead.status === "proposal"
  ).length;
  const wonLeads = leads.filter((lead) => lead.status === "won").length;
  const lostLeads = leads.filter((lead) => lead.status === "lost").length;

  const sourceCounts = leads.reduce((acc, lead) => {
    const source = lead.source || "website";
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="min-h-screen w-full bg-black text-white px-8 py-10">
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
              <Users size={21} />
            </div>

            <div>
              <h1 className="text-[30px] leading-none font-serif tracking-wide">
                Leads
              </h1>

              <p className="mt-2 text-sm text-neutral-500">
                Track all leads captured from your website forms and landing
                pages.
              </p>
            </div>
          </div>

          <button className="hidden lg:flex h-11 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-medium text-black hover:bg-neutral-200 transition">
            <Plus size={17} />
            Add Lead
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-7">
          <LeadStat title="Total Leads" value={totalLeads} />
          <LeadStat title="New Leads" value={newLeads} />
          <LeadStat title="Contacted" value={contactedLeads} />
          <LeadStat title="Proposal" value={proposalLeads} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-7">
          {/* Leads Table */}
          <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 overflow-hidden">
            {/* Top Bar */}
            <div className="border-b border-neutral-900 px-6 py-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium">All Leads</h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    Manage incoming leads from one place.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search leads..."
                      className="h-11 w-full md:w-[240px] rounded-2xl border border-neutral-800 bg-black pl-10 pr-4 text-sm text-white outline-none placeholder:text-neutral-700 focus:border-neutral-600"
                    />
                  </div>

                  <button className="h-11 w-11 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center hover:bg-neutral-950 transition">
                    <Filter size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* Leads List */}
            <div className="p-5 space-y-4">
              {filteredLeads.map((lead) => (
                <LeadCard key={lead._id} lead={lead} />
              ))}

              {filteredLeads.length === 0 && (
                <div className="rounded-2xl border border-neutral-900 bg-black p-10 text-center">
                  <p className="text-sm text-neutral-500">No leads found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <aside className="space-y-7">
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <CircleDot size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">Lead Pipeline</h3>
                  <p className="text-xs text-neutral-500">
                    Current lead stages
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <PipelineItem title="New" count={newLeads} />
                <PipelineItem title="Contacted" count={contactedLeads} />
                <PipelineItem title="Proposal" count={proposalLeads} />
                <PipelineItem title="Won" count={wonLeads} />
                <PipelineItem title="Lost" count={lostLeads} />
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <Clock size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">Lead Sources</h3>
                  <p className="text-xs text-neutral-500">
                    Where leads come from
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(sourceCounts).map(([source, count]) => (
                  <SourceItem key={source} title={source} count={count} />
                ))}

                {Object.entries(sourceCounts).length === 0 && (
                  <p className="text-sm text-neutral-500">No sources yet.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function LeadStat({ title, value }) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5">
      <p className="text-sm text-neutral-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-neutral-600">Live workspace data</p>
    </div>
  );
}

function LeadCard({ lead }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-black p-5 hover:bg-neutral-950 transition">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center shrink-0">
            <User size={18} />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-white">
                {lead.name || "Unknown Lead"}
              </h3>
              <StatusBadge status={lead.status} />
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-neutral-500">
              <Info icon={<Mail size={14} />} text={lead.email || "No email"} />
              <Info icon={<Phone size={14} />} text={lead.phone || "No phone"} />
              <Info
                icon={<Building2 size={14} />}
                text={lead.customFields?.company || "No company"}
              />
              <Info
                icon={<Clock size={14} />}
                text={formatDate(lead.createdAt)}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <SmallTag text={lead.source || "website"} />
              <SmallTag text={`Priority: ${lead.priority || "medium"}`} />
            </div>

            {lead.message && (
              <p className="mt-4 text-sm text-neutral-500 line-clamp-2">
                {lead.message}
              </p>
            )}
          </div>
        </div>

        <button className="h-9 w-9 rounded-xl border border-neutral-900 flex items-center justify-center hover:bg-neutral-900 transition">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
}

function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-600">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase();

  const styles = {
    new: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    contacted: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
    qualified: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    proposal: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    won: "text-green-400 border-green-500/20 bg-green-500/10",
    lost: "text-red-400 border-red-500/20 bg-red-500/10",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wide ${
        styles[normalizedStatus] ||
        "text-neutral-400 border-neutral-800 bg-neutral-900"
      }`}
    >
      {normalizedStatus || "new"}
    </span>
  );
}

function SmallTag({ text }) {
  return (
    <span className="rounded-full border border-neutral-900 bg-neutral-950 px-3 py-1 text-xs text-neutral-500">
      {text}
    </span>
  );
}

function PipelineItem({ title, count }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-900 bg-black px-4 py-3">
      <div className="flex items-center gap-3">
        <CheckCircle2 size={15} className="text-neutral-500" />
        <p className="text-sm text-neutral-400">{title}</p>
      </div>

      <span className="text-sm font-medium text-white">{count}</span>
    </div>
  );
}

function SourceItem({ title, count }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-900 bg-black px-4 py-3">
      <p className="text-sm text-neutral-400 capitalize">{title}</p>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white">{count}</span>
        <ArrowUpRight size={14} className="text-neutral-600" />
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "No date";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}