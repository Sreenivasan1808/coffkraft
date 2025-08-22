"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";

const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button with Framer Motion */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex gap-2 px-4 py-2 rounded-lg bg-[#d38a42] hover:bg-[#e48322] text-[#3e2c23] font-medium w-fit"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus />
        Add
      </motion.button>

      {/* Modal */}
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default AddButton;
