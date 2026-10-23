"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Newspaper } from "lucide-react";
import toast from "react-hot-toast";
import {
  getNewsAdminApi,
  createNewsApi,
  updateNewsApi,
  deleteNewsApi,
} from "@/lib/api";
import type { News } from "@/types";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUpload from "@/components/admin/ImageUpload";
import { resolveImageUrl } from "@/lib/image-url";

const EMPTY_FORM = {
  title: "",
  category: "",
  description: "",
  image: "",
  published_date: new Date().toISOString().split("T")[0],
  status: "draft",
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<News | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    getNewsAdminApi()
      .then((res) => setNews(res.data.data))
      .catch(() => toast.error("Failed to load news"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchNews(); }, []);

  const filtered = news.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setModalOpen(true);
  };

  const openEdit = (item: News) => {
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image || "",
      published_date: item.published_date?.split("T")[0] || "",
      status: item.status,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateNewsApi(editing.id, form);
        toast.success("News updated successfully.");
      } else {
        await createNewsApi(form);
        toast.success("News created successfully.");
      }
      setModalOpen(false);
      fetchNews();
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteNewsApi(deleteId);
      toast.success("News deleted.");
      setDeleteId(null);
      fetchNews();
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-500 text-sm mt-1">Create, edit, and manage news articles.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={18} /> Add News
        </button>
      </div>

      {/* Search */}
      <div className="admin-card">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden p-0">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-700 border-t-transparent mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-gray-400">
            <Newspaper size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No news found</p>
            <p className="text-sm mt-1">Click "Add News" to create your first article.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-600">Status</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img src={resolveImageUrl(item.image)} alt={item.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                        )}
                        <span className="font-medium text-gray-900 line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-gray-600">{item.category}</td>
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-500 text-xs">{formatDate(item.published_date)}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        item.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editing ? "Edit News" : "Add News"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="form-label">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="form-input" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Category *</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="form-input" placeholder="e.g. Youth, Sports" required />
                </div>
                <div>
                  <label className="form-label">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="form-input">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Published Date</label>
                <input type="date" value={form.published_date} onChange={(e) => setForm({ ...form, published_date: e.target.value })} className="form-input" />
              </div>
              <ImageUpload
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                label="Image"
              />
              <div>
                <label className="form-label">Description *</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} className="form-input resize-none" required />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
                  {editing ? "Update News" : "Create News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete News"
        message="Are you sure you want to delete this news article? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
