"use client";

import { Entry } from "@/types/Entry";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";

const Table = () => {
  const queryClient = useQueryClient();
  const [deleteEntry, setDeleteEntry] = useState<Entry | null>(null);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  const { data, isLoading, isError } = useQuery<Entry[]>({
    queryKey: ["entries"],
    queryFn: async () => {
      const res = await axios.get("/api/entries");
      return res.data;
    },
  });

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/entries?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

//   const handleDelete = (id?: string) => {
//     if (!id) return;
//     if (confirm("Are you sure you want to delete this entry?")) {
//       deleteMutation.mutate(id);
//     }
//   };

  const handleDeleteConfirm = () => {
    if (deleteEntry?.id) {
      deleteMutation.mutate(deleteEntry.id.toString(), {
        onSuccess: () => setDeleteEntry(null),
      });
    }
  };

  const handleEdit = (entry: Entry) => {
    setEditingEntry(entry);
  };

  if (isLoading) return <p className="text-gray-500">Loading entries...</p>;
  if (isError) return <p className="text-red-500">Failed to load entries.</p>;

  return (
    <>
      {editingEntry && (
        <Modal entry={editingEntry} onClose={() => setEditingEntry(null)} />
      )}

      <table className="min-w-full border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <thead className="bg-amber-200 text-gray-700 text-lg">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Verification ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Department
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Cost</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-[#f4f4f4]">
          {data?.map((entry) => (
            <tr
              key={entry.id}
              className="hover:bg-gray-50 transition-colors flex-wrap"
            >
              <td className="px-6 py-3 text-sm text-gray-800">
                {entry.verificationid}
              </td>
              <td className="px-6 py-3 text-sm text-gray-800">
                {entry.department}
              </td>
              <td className="px-6 py-3 text-sm text-gray-800">
                {entry.quantity}
              </td>
              <td className="px-6 py-3 text-sm text-gray-800">Rs. {entry.cost}</td>
              <td className="px-6 py-3 text-sm text-gray-800 flex gap-2 w-fit">
                <button
                  onClick={() => handleEdit(entry)}
                  className="p-2 rounded-lg hover:bg-amber-200 transition"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => setDeleteEntry(entry)}
                  className="p-2 rounded-lg hover:bg-red-200 transition"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDelete
        isOpen={!!deleteEntry}
        itemName={deleteEntry?.verificationid}
        onCancel={() => setDeleteEntry(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Table;
