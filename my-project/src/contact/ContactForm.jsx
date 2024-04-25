import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Buttom from "../components/ui/Buttom";
import { isNotEmpty, isValidEmail } from "../validation/Validation";

const ContactForm = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});

  const sendEmail = (e) => {
    e.preventDefault();

    if (validateForm()) {
      emailjs
        .sendForm("service_8ppjequ", "template_d8v6a9m", form.current, {
          publicKey: "bVYZxNffv1ix7MCOe",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  const validateForm = () => {
    const { from_name, from_email, message } = form.current;

    const errors = {};

    if (!isNotEmpty(from_name.value)) {
      errors.name = "Name is required";
    }

    if (!isNotEmpty(from_email.value)) {
      errors.email = "Email is required";
    } else if (!isValidEmail(from_email.value)) {
      errors.email = "Invalid email format";
    }

    if (!isNotEmpty(message.value)) {
      errors.message = "Message is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <div className="flex justify-center bg-white my-5">
      <div className="bg-gray-100 rounded-xl px-20 py-5">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-black px-5 sm:px-20 mb-4 md:mb-6">
          Contact us:
        </h1>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col">
          <label className="text-sm md:text-base">Name:</label>
          <input
            type="text"
            name="from_name"
            className={`h-10 md:h-12 rounded-md px-3 bg-white text-black mb-2 ${
              errors.name && "border border-red-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          <label className="text-sm md:text-base">Email:</label>
          <input
            type="email"
            name="from_email"
            className={`h-10 md:h-12 rounded-md px-3 bg-white text-black mb-2 ${
              errors.email && "border border-red-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <label className="text-sm md:text-base">Message:</label>
          <textarea
            name="message"
            className={`h-32 md:h-40 rounded-md px-3 bg-white text-black mb-2 ${
              errors.message && "border border-red-500"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
          <Buttom
            textMessage="Send"
            className="btn bg-white hover:bg-gray-200 text-black mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
