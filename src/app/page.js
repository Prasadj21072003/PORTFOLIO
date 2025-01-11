"use client";

import Image from "next/image";
import { AnimatePresence, easeIn, easeOut, motion } from "framer-motion";
import Link from "next/link";
import Particlesbackground from "@/components/Particlesbackground";

export default function Home() {
  const text = "A Web Developer";
  let firstname = "PRASAD";
  let lastname = "JADHAV";
  return (
    <motion.div
      className="h-full w-full sm:px-[64px] px-[32px]"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%", transition: { duration: 1 } }}
    >
      <Particlesbackground />
      <div className="h-[100%] lg:flex sm:px-[32px] px-[16px]  overflow-scroll">
        <div className="h-[50%]  lg:w-[50%] lg:h-full  mb-[10px] relative flex items-center justify-center ">
          <Image src="/photo4.png" className=" object-contain" fill alt="" />
        </div>
        <div className="h-[50%]  lg:w-[50%] sm:h-full flex flex-col  gap-[32px]  lg:justify-center ">
          <h1 className="text-[28px] sm:text-[40px] lg:text-[60px] lg:leading-[75px] xl:leading-[85px] font-bold w-full  z-50">
            HELLO, I AM{" "}
            <span className="text-orange-700 flex gap-[10px] max-sm:gap-[8px]">
              <span className="w-fit h-fit flex">
                {firstname.split("").map((l, i) => (
                  <motion.h1
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, color: "white" }}
                    className="hover:cursor-none hover:bg-black hover:rounded-full hover:px-[20px]"
                  >
                    {" "}
                    {l}
                  </motion.h1>
                ))}
              </span>

              <span className="w-fit h-fit flex">
                {lastname.split("").map((l, i) => (
                  <motion.h1
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, color: "white" }}
                    className="hover:cursor-none hover:bg-black hover:rounded-full hover:px-[20px]"
                  >
                    {" "}
                    {l}
                  </motion.h1>
                ))}
              </span>
            </span>{" "}
            <span> </span>
            {text.split("").map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                className="text-gray-800"
              >
                {l}
              </motion.span>
            ))}
          </h1>
          <p className="sm:text-[16px] text-[13px]  z-50">
            Welcome to my digital canvas, where innovation and creativity
            coverage, with a keen eye for aesthetics and a mastery of code, my
            portfolio showcase a diverse collection of projects that reflect my
            commitment to excellence
          </p>
          <div className="flex w-[280px] justify-between   max-lg:pb-[2rem] ">
            <Link
              href={"./portfolio"}
              className=" z-50 py-[8px] px-[16px] bg-black ring-1 ring-black rounded text-white  hover:bg-transparent  hover:text-black duration-700 cursor-none "
            >
              View My Work
            </Link>
            <Link
              href={"./contact"}
              className=" z-50 py-[8px] px-[16px] rounded ring-1 ring-black  duration-700 hover:text-white hover:bg-black cursor-none "
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
