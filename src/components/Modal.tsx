"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

type Entry = {
  id?: string;
  verificationid: string;
  department: string;
  quantity: number;
  cost: number;
};

const Modal = ({
  onClose,
  entry,
}: {
  onClose: () => void;
  entry?: Entry;
}) => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Entry>({
    verificationid: entry?.verificationid || "",
    department: entry?.department || "",
    quantity: entry?.quantity || 0,
    cost: entry?.cost || 0,
    id: entry?.id,
  });

  useEffect(() => {
    const qty = Number(form.quantity) || 0;
    setForm((prev) => ({ ...prev, cost: qty * 50 }));
  }, [form.quantity]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (form.id) {
        const res = await axios.put("/api/entries", form);
        return res.data;
      } else {
        const res = await axios.post("/api/entries", {
          verificationid: form.verificationid,
          department: form.department,
          quantity: Number(form.quantity),
          cost: form.cost,
        });
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      onClose();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">
            {form.id ? "Edit Entry" : "Add Entry"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="verificationid"
              value={form.verificationid}
              onChange={handleChange}
              placeholder="Verification ID"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Department"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <input
              type="number"
              name="cost"
              value={form.cost}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600"
              >
                {mutation.isPending ? "Saving..." : form.id ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
