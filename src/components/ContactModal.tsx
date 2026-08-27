import emailjs from "@emailjs/browser";
import { useState, type FormEvent } from "react";
import { Modal } from "./Modal";

type Props = { onClose: () => void };

const fields = [
  { id: "contact-name", name: "from_name", type: "text", placeholder: "Your name" },
  { id: "contact-email", name: "reply_to", type: "email", placeholder: "Your email" },
] as const;

export function ContactModal({ onClose }: Props) {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("Add your EmailJS environment variables to enable sending.");
      return;
    }

    setIsSending(true);
    setStatus("Sending...");
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setStatus("Message sent. Thank you!");
    } catch {
      setStatus("Message could not be sent. Check your EmailJS settings.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Modal ariaLabelledBy="contact-title" className="modal-card" onClose={onClose}>
      <p className="eyebrow">Get behind the wheel</p>
      <h2 id="contact-title">Talk to us about your next car</h2>
      <form className="contact-form" onSubmit={submitContact}>
        {fields.map((field) => (
          <label className="field" key={field.id}>
            <span className="sr-only">{field.placeholder}</span>
            <input {...field} required />
          </label>
        ))}
        <label className="field field-wide">
          <span className="sr-only">Your message</span>
          <textarea id="contact-message" name="message" placeholder="Your message" rows={4} required />
        </label>
        <button type="submit" disabled={isSending}>{isSending ? "Sending..." : "Send message"}</button>
        <p className="contact-status" aria-live="polite">{status}</p>
      </form>
    </Modal>
  );
}
