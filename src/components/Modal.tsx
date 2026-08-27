import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  ariaLabelledBy: string;
  children: ReactNode;
  className: string;
  onClose: () => void;
};

export function Modal({ ariaLabelledBy, children, className, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="modal" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
      >
        <button className="modal-close" type="button" aria-label="Close dialog" onClick={onClose}>
          &times;
        </button>
        {children}
      </section>
    </div>
  );
}
