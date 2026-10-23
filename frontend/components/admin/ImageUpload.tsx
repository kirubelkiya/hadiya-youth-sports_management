"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, ImageIcon, Loader2 } from "lucide-react";
import { uploadImageApi } from "@/lib/api";
import { resolveImageUrl } from "@/lib/image-url";

interface Props {
  value: string;          // stored path, e.g. "/uploads/xxx.jpg" or a full https URL
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  required = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string>("");
  const [error, setError] = useState("");

  // Show local blob during upload, then switch to resolved server URL
  const displayUrl = localPreview || (value ? resolveImageUrl(value) : "");

  const handleFile = async (file: File) => {
    setError("");

    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Only JPG, PNG, GIF or WEBP files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    // Show instant local preview before upload completes
    const blob = URL.createObjectURL(file);
    setLocalPreview(blob);
    setUploading(true);

    try {
      const res = await uploadImageApi(file);
      const serverPath: string = res.data.url; // "/uploads/xxx.jpg"
      onChange(serverPath);
      // Replace blob with resolved server URL
      setLocalPreview(resolveImageUrl(serverPath));
    } catch {
      setError("Upload failed. Please try again.");
      setLocalPreview("");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange("");
    setLocalPreview("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-1.5">
      <label className="form-label">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {displayUrl ? (
        <div className="relative w-full h-52 rounded-xl overflow-hidden border-2 border-gray-200 group bg-gray-100">
          <img
            src={displayUrl}
            alt="preview"
            className="w-full h-full object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          {!uploading && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-1.5 bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <UploadCloud size={14} /> Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <X size={14} /> Remove
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`w-full h-44 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
            uploading
              ? "border-primary-400 bg-primary-50 cursor-not-allowed"
              : "border-gray-300 hover:border-primary-500 hover:bg-primary-50"
          }`}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          ) : (
            <ImageIcon className="w-10 h-10 text-gray-300" />
          )}
          <p className="text-sm font-semibold text-gray-500">
            {uploading ? "Uploading..." : "Click or drag an image here"}
          </p>
          <p className="text-xs text-gray-400">JPG, PNG, GIF, WEBP — max 5 MB</p>
          {!uploading && (
            <span className="mt-1 inline-flex items-center gap-1.5 bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded-lg">
              <UploadCloud size={13} /> Browse File
            </span>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <X size={11} /> {error}
        </p>
      )}
    </div>
  );
}
