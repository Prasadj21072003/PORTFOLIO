"use client";

import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Particlesbackground from "./Particlesbackground";
import { cursor } from "../../data";

const Transitionprovider = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathname}
        className="w-screen min-h-screen bg-gradient-to-b from-blue-50 to-red-100  "
      >
        <motion.div
          className="w-screen h-screen fixed bg-black rounded-b-[100px] z-40"
          initial={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: "0.5", ease: "easeOut" }}
        />
        <motion.div
          className="w-fit h-fit fixed top-0 bottom-0 left-0 right-0 m-auto  text-white text-[99px] z-50 "
          initial={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: "0.8", ease: "easeOut" }}
        >
          {/* pathname?.substring(1)?.toUpperCase() */}
        </motion.div>
        <motion.div
          className="w-screen h-screen fixed bg-black rounded-t-[100px] z-40 bottom-0 "
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />

        <div className="h-[96px] sm:px-[64px] px-[32px] cursor-[url(../../public/icons8-cursor-35.png),_pointer]">
          <Navbar />
        </div>
        <div
          className={`h-[calc(100vh-96px)] cursor-[url(../../public/icons8-cursor-35.png),_pointer]`}
        >
          {children}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Transitionprovider;
