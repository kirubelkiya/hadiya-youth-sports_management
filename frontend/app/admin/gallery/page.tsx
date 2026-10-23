"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Image, Video } from "lucide-react";
import toast from "react-hot-toast";
import { getGalleryAdminApi, createGalleryItemApi, updateGalleryItemApi, deleteGalleryItemApi } from "@/lib/api";
import type { GalleryItem } from "@/types";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUpload from "@/components/admin/ImageUpload";
import { resolveImageUrl } from "@/lib/image-url";

const EMPTY_FORM = { title: "", media_type: "photo", media_url: "", category: "general", status: "active" };
const CATEGORIES = ["general", "youth", "sports", "events"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetch = () => {
    setLoading(true);
    getGalleryAdminApi().then((res) => setItems(res.data.data)).catch(() => toast.error("Failed to load")).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setForm({ title: item.title, media_type: item.media_type, media_url: item.media_url, category: item.category, status: item.status });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) { await updateGalleryItemApi(editing.id, form); toast.success("Gallery item updated."); }
      else { await createGalleryItemApi(form); toast.success("Gallery item created."); }
      setModalOpen(false); fetch();
    } catch { toast.error("Failed to save."); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteGalleryItemApi(deleteId);
      toast.success("Gallery item deleted."); setDeleteId(null); fetch();
    } catch { toast.error("Failed to delete."); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage photos and videos in the gallery.</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ ...EMPTY_FORM }); setModalOpen(true); }} className="btn-primary">
          <Plus size={18} /> Add Media
        </button>
      </div>

      <div className="admin-card">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search gallery..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input pl-10" />
        </div>
      </div>

      <div className="admin-card overflow-hidden p-0">
        {loading ? (
          <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-700 border-t-transparent mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-gray-400"><Image size={48} className="mx-auto mb-3 opacity-30" /><p className="font-medium">No gallery items found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Media</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-600 hidden md:table-cell">Type</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-600 hidden lg:table-cell">Category</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-600">Status</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.media_type === "photo" ? (
                          <img src={resolveImageUrl(item.media_url)} alt={item.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                        ) : (
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 hidden sm:block">
                            <Video size={16} className="text-primary-700" />
                          </div>
                        )}
                        <span className="font-medium text-gray-900 line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 w-fit ${item.media_type === "photo" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                        {item.media_type === "photo" ? <Image size={12} /> : <Video size={12} />}
                        {item.media_type}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-600 capitalize">{item.category}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${item.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{item.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={16} /></button>
                        <button onClick={() => setDeleteId(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{editing ? "Edit Gallery Item" : "Add Gallery Item"}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="form-label">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="form-input" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Media Type</label>
                  <select value={form.media_type} onChange={(e) => setForm({ ...form, media_type: e.target.value, media_url: "" })} className="form-input">
                    <option value="photo">Photo</option>
                    <option value="video">Video (YouTube)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="form-input">
                    {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="form-input">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              {form.media_type === "photo" ? (
                <ImageUpload
                  value={form.media_url}
                  onChange={(url) => setForm({ ...form, media_url: url })}
                  label="Photo"
                  required
                />
              ) : (
                <div>
                  <label className="form-label">YouTube Embed URL *</label>
                  <input
                    type="url"
                    value={form.media_url}
                    onChange={(e) => setForm({ ...form, media_url: e.target.value })}
                    className="form-input"
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: https://www.youtube.com/embed/VIDEO_ID</p>
                </div>
              )}
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={!!deleteId} title="Delete Gallery Item" message="Are you sure you want to delete this gallery item?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} loading={deleting} />
    </div>
  );
}
