"use client";

import React from "react";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const ConfirmDelete = ({
  isOpen,
  onCancel,
  onConfirm,
  itemName,
}: ConfirmDeleteProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete{" "}
          <span className="font-medium">{itemName || "this entry"}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
