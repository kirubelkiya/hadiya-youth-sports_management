"use client";

import { useEffect, useState } from "react";
import {
  Trophy, CalendarDays, Briefcase, Search,
  Trash2, RefreshCw, Eye, X, Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getRegistrationsAdminApi,
  updateRegistrationStatusApi,
  deleteRegistrationApi,
} from "@/lib/api";
import type { Registration } from "@/types";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const TYPE_META = {
  sport:   { label: "Sport",   icon: Trophy,       color: "bg-primary-100 text-primary-700" },
  event:   { label: "Event",   icon: CalendarDays, color: "bg-gold-100 text-gold-700"       },
  vacancy: { label: "Vacancy", icon: Briefcase,    color: "bg-slate-100 text-slate-700"     },
};

const STATUS_COLORS: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminRegistrationsPage() {
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"" | "sport" | "event" | "vacancy">("");
  const [selected, setSelected] = useState<Registration | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = () => {
    setLoading(true);
    getRegistrationsAdminApi(typeFilter || undefined)
      .then((res) => setItems(res.data.data))
      .catch(() => toast.error("Failed to load registrations."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, [typeFilter]);

  const filtered = items.filter((r) =>
    r.full_name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    (r.sport_name || r.event_name || r.position || "").toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    all: items.length,
    sport: items.filter((r) => r.type === "sport").length,
    event: items.filter((r) => r.type === "event").length,
    vacancy: items.filter((r) => r.type === "vacancy").length,
    pending: items.filter((r) => r.status === "pending").length,
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateRegistrationStatusApi(id, status);
      setItems((prev) => prev.map((r) => r.id === id ? { ...r, status: status as Registration["status"] } : r));
      if (selected?.id === id) setSelected((s) => s ? { ...s, status: status as Registration["status"] } : s);
      toast.success("Status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteRegistrationApi(deleteId);
      toast.success("Registration deleted.");
      if (selected?.id === deleteId) setSelected(null);
      setItems((prev) => prev.filter((r) => r.id !== deleteId));
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeleting(false);
    }
  };

  const subField = (r: Registration) => {
    if (r.type === "sport")   return r.sport_name;
    if (r.type === "event")   return r.event_name;
    if (r.type === "vacancy") return r.position;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Registrations
            {counts.pending > 0 && (
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {counts.pending} pending
              </span>
            )}
          </h1>
          <p className="text-gray-500 text-sm mt-1">All public registration submissions.</p>
        </div>
        <button onClick={fetchAll} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {([
          { key: "all",     label: "Total",    color: "text-primary-700 bg-primary-50" },
          { key: "sport",   label: "Sport",    color: "text-primary-700 bg-primary-50" },
          { key: "event",   label: "Event",    color: "text-gold-700 bg-gold-50"       },
          { key: "vacancy", label: "Vacancy",  color: "text-slate-700 bg-slate-50"     },
        ] as const).map((c) => (
          <button
            key={c.key}
            onClick={() => setTypeFilter(c.key === "all" ? "" : c.key)}
            className={`rounded-xl p-4 text-left border-2 transition-all ${typeFilter === (c.key === "all" ? "" : c.key) ? "border-primary-500" : "border-transparent"} ${c.color}`}
          >
            <p className="text-2xl font-bold">{counts[c.key]}</p>
            <p className="text-sm font-medium">{c.label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input pl-9 text-sm" />
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)} className="form-input text-sm w-auto">
              <option value="">All types</option>
              <option value="sport">Sport</option>
              <option value="event">Event</option>
              <option value="vacancy">Vacancy</option>
            </select>
          </div>

          <div className="admin-card p-0 overflow-hidden">
            {loading ? (
              <div className="p-10 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-700 border-t-transparent" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Filter size={36} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No registrations found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filtered.map((r) => {
                  const meta = TYPE_META[r.type];
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelected(r)}
                      className={`w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors flex items-start gap-3 ${selected?.id === r.id ? "bg-primary-50" : ""}`}
                    >
                      <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 ${meta.color}`}>
                        <meta.icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm truncate font-semibold ${r.status === "pending" ? "text-gray-900" : "text-gray-600"}`}>
                            {r.full_name}
                          </p>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_COLORS[r.status]}`}>
                            {r.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{subField(r) || meta.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{new Date(r.created_at).toLocaleDateString()}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="admin-card space-y-5">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${TYPE_META[selected.type].color}`}>
                    {selected.type.charAt(0).toUpperCase() + selected.type.slice(1)} Registration
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.full_name}</h2>
                  <p className="text-sm text-gray-500">{new Date(selected.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setDeleteId(selected.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                  <button onClick={() => setSelected(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Personal details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Phone",     value: selected.phone },
                  { label: "Email",     value: selected.email },
                  { label: "Age",       value: selected.age?.toString() },
                  { label: "Gender",    value: selected.gender },
                  ...(selected.type === "sport"   ? [{ label: "Sport",      value: selected.sport_name }, { label: "Experience", value: selected.experience }] : []),
                  ...(selected.type === "event"   ? [{ label: "Event",      value: selected.event_name }] : []),
                  ...(selected.type === "vacancy" ? [{ label: "Position",   value: selected.position  }, { label: "Education", value: selected.education }, { label: "CV Link", value: selected.cv_link }] : []),
                ].filter(f => f.value).map((field) => (
                  <div key={field.label} className="bg-gray-50 rounded-lg px-4 py-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">{field.label}</p>
                    {field.label === "CV Link" ? (
                      <a href={field.value!} target="_blank" rel="noopener noreferrer" className="text-primary-700 text-sm underline truncate block">{field.value}</a>
                    ) : (
                      <p className="text-gray-800 text-sm capitalize">{field.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {selected.message && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">Message</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm whitespace-pre-wrap">{selected.message}</div>
                </div>
              )}

              {/* Status update */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {(["pending","reviewed","accepted","rejected"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selected.id, s)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold border-2 transition-all capitalize ${selected.status === s ? STATUS_COLORS[s] + " border-transparent" : "border-gray-200 text-gray-500 hover:border-gray-400"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="admin-card flex flex-col items-center justify-center py-20 text-gray-400">
              <Eye size={48} className="mb-3 opacity-30" />
              <p className="font-medium">Select a registration to view details</p>
              <p className="text-sm mt-1">{items.length} total submissions</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Registration"
        message="Are you sure you want to delete this registration? This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
