"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Particlesbackground from "@/components/Particlesbackground";

const Contact = () => {
  const text = "Hello";
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setsuccess(false);
    seterror(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setsuccess(true);
          form.current.reset();
        },
        (error) => {
          seterror(true);
        }
      );
  };

  return (
    <motion.div
      className="h-full w-full sm:px-[64px] px-[32px] pb-[20px]"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%", transition: { duration: 1 } }}
    >
      <div className="flex flex-col lg:flex-row h-full w-full  sm:px-[32px] px-[16px] ">
        <div className="h-[30%] w-full lg:h-[100%]  flex flex-wrap justify-center items-center text-[50px] lg:text-[100px]">
          {text.split("").map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              className=" "
            >
              {l}
            </motion.span>
          ))}
          😊
        </div>

        <div className="h-[70%] w-full lg:h-[100%] flex items-center justify-center border-[2px]  bg-white rounded-xl p-[30px]">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-full h-[100%] md:w-[70%] lg:h-[70%] flex flex-col gap-[30px] "
          >
            <span className="font-[500]">Dear Prasad Jadhav,</span>
            <textarea
              name="user_message"
              id=""
              rows={7}
              className="border-black border-b-[2px] resize-none "
            ></textarea>
            <span className="font-[500]">My mail address is:</span>
            <input
              name="user_email"
              type="email"
              className="border-black border-b-[2px] focus:outline-none "
            />
            <span className="font-[500]">Regards</span>
            <button type="submit" className="w-full p-[10px] bg-cyan-300">
              Send
            </button>
            {success && (
              <span className="font-semibold text-green-600">
                Your message has been sent successfully
              </span>
            )}
            {error && (
              <span className="font-semibold text-red-600">
                Something went wrong!
              </span>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
