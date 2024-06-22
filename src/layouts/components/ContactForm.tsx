"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFields, ContactFormSchema } from "@/pages/api/contact";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

type Props = {
  content: any;
};

const ContactForm = ({ content }: Props) => {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    reset,
  } = useForm<ContactFields>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactFields) => {
    //  if (!recaptchaToken) return;
    try {
      const res = await axios.post("/api/contact", data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRenderSubmitStatus = (status: string) => {
    if (!isValid && !isSubmitted)
      return (
        <div className="flex items-center gap-4">
          <span>Send</span>
        </div>
      );
    switch (status) {
      case "isSubmitting":
        return (
          <div className="flex items-center gap-4">
            <span>Sending</span>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#fff] border-t-[#263779]" />
          </div>
        );
      case "isSubmitted":
        return (
          <div className="flex items-center gap-4">
            <span>Sent, will get back to you soon</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-4">
            <span>Send</span>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="name" className="form-label">
          {content.full_name} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          className="form-input"
          placeholder={content.full_name_placeholder}
          type="text"
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="form-label">
          {content.mail} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          className="form-input"
          placeholder={content.mail_placeholder}
          type="email"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="form-label">
          {content.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="text-message"
          className="form-input"
          placeholder={content.message_placeholder}
          rows={8}
          {...register("textMessage")}
        ></textarea>
        <p>{errors.textMessage?.message}</p>
      </div>

      {/* <div>
        <ReCAPTCHA
          sitekey="6Ldo9aQpAAAAAIgKXbBjhXK33-t2EgbJejXweWX5"
          onChange={(token) => {
            setRecaptchaToken(token as string | null);
          }}
          style={{
            transform: "scale(0.8)",
            transformOrigin: "0 0",
            marginBottom: "-0.5rem",
          }}
        />
        {!recaptchaToken && isValid && (
          <span className="-mb-4 text-red-300">Recaptcha Required</span>
        )}
      </div> */}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {handleRenderSubmitStatus(
          isSubmitting ? "isSubmitting" : isSubmitted ? "isSubmitted" : ""
        )}
        {/* {content.submit} */}
      </button>
    </form>
  );
};

export default ContactForm;
