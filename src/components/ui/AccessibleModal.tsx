"use client";
import { ReactNode, useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

/** Native modal dialog supplies background inertness and keyboard containment. */
export function AccessibleModal({ isOpen, onClose, children, title = "Details", className = "" }: AccessibleModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  return <dialog ref={ref} aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === ref.current) onClose(); }} className={`atlas-modal ${className}`}>
    {isOpen && <div className="atlas-modal-inner"><header><h2 id={titleId}>{title}</h2><button onClick={onClose} aria-label="Close modal" autoFocus><X size={20} /></button></header><div className="atlas-modal-content">{children}</div></div>}
  </dialog>;
}
