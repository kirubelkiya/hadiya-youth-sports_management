"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  Search,
  RefreshCw,
  Inbox,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getContactMessagesApi,
  markMessageReadApi,
  deleteContactMessageApi,
} from "@/lib/api";
import type { ContactMessage } from "@/types";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMessages = () => {
    setLoading(true);
    getContactMessagesApi()
      .then((res) => setMessages(res.data.data))
      .catch(() => toast.error("Failed to load messages."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const handleOpen = async (msg: ContactMessage) => {
    setSelected(msg);
    // Mark as read if not already
    if (!msg.is_read) {
      try {
        await markMessageReadApi(msg.id);
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: 1 } : m))
        );
      } catch {
        // Non-critical — don't show an error toast
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteContactMessageApi(deleteId);
      toast.success("Message deleted.");
      if (selected?.id === deleteId) setSelected(null);
      setMessages((prev) => prev.filter((m) => m.id !== deleteId));
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete message.");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Contact Messages
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Messages submitted by visitors through the contact form.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-10 text-sm"
            />
          </div>

          {/* List */}
          <div className="admin-card p-0 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-700 border-t-transparent mx-auto" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Inbox size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium text-sm">No messages found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filtered.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => handleOpen(msg)}
                    className={`w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                      selected?.id === msg.id ? "bg-primary-50" : ""
                    }`}
                  >
                    {/* Read/unread icon */}
                    <div className="mt-0.5 flex-shrink-0">
                      {msg.is_read ? (
                        <MailOpen size={16} className="text-gray-400" />
                      ) : (
                        <Mail size={16} className="text-primary-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-sm truncate ${
                            msg.is_read
                              ? "text-gray-700"
                              : "font-bold text-gray-900"
                          }`}
                        >
                          {msg.name}
                        </p>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p
                        className={`text-xs truncate mt-0.5 ${
                          msg.is_read ? "text-gray-500" : "text-gray-700 font-medium"
                        }`}
                      >
                        {msg.subject}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {msg.email}
                      </p>
                    </div>
                    {/* Unread dot */}
                    {!msg.is_read && (
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="admin-card space-y-5">
              {/* Detail Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {selected.subject}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(selected.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => setDeleteId(selected.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  title="Delete message"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              {/* Sender Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                    From
                  </p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {selected.name}
                  </p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-primary-700 text-sm hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      selected.is_read
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {selected.is_read ? (
                      <><MailOpen size={12} /> Read</>
                    ) : (
                      <><Mail size={12} /> Unread</>
                    )}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">
                  Message
                </p>
                <div className="bg-gray-50 rounded-xl p-5 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>

              {/* Reply button */}
              <div className="pt-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="btn-primary inline-flex"
                >
                  <Mail size={15} />
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="admin-card flex flex-col items-center justify-center py-20 text-gray-400">
              <MailOpen size={48} className="mb-3 opacity-30" />
              <p className="font-medium">Select a message to read it</p>
              <p className="text-sm mt-1">
                {messages.length > 0
                  ? `${messages.length} message${messages.length > 1 ? "s" : ""} in inbox`
                  : "Your inbox is empty"}
              </p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
