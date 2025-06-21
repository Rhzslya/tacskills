import React from "react";
import { motion } from "framer-motion";
import { modalBackdropVariants } from "../../lib/framer-motion";

interface BaseModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ onClose, children }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-20"
      onClick={onClose}
      variants={modalBackdropVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="fixed z-30 bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-auto"
        style={{ top: "50%", left: "50%", position: "fixed" }}
        initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default BaseModal;
