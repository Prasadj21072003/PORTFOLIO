"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useState } from "react";
import { navlinks } from "../../data";

const Navbar = () => {
  const [navon, setnavon] = useState(false);
  const pathname = usePathname();

  const topvarient = {
    open: {
      rotate: 45,
      backgroundColor: "#FFFFFF",
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      rotate: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const lastvarient = {
    open: {
      rotate: -45,
      backgroundColor: "#FFFFFF",
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      rotate: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const centervarient = {
    open: {
      opacity: 0,
    },
    closed: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
  };
  const screenvarient = {
    open: {
      x: 0,

      transition: {
        duration: 1,
      },
    },
    closed: {
      x: "100vw",
    },
  };

  const listitemsvarient = {
    open: {
      x: 0,
      opacity: 1,
    },
    closed: {
      x: -10,
      opacity: 0,
    },
  };

  return (
    <div className=" h-[70px] flex items-center justify-between sm:px-[32px] px-[16px]">
      <div className="  flex items-center lg:w-[33%]   font-bold font-sans text-[22px]">
        <span className=" ">P</span>
        <span className=" text-white bg-black px-[5px] ml-[4px] ">J</span>
      </div>
      <div className=" max-md:hidden lg:w-[33%] md:w-[70%]  flex items-center justify-between ">
        {navlinks.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={` ${
              pathname === item.href
                ? "bg-black rounded text-white py-[2px] px-[8px] cursor-none"
                : "hover:text-white  hover:scale-[1.09] py-[2px] px-[8px] hover:rounded hover:bg-orange-600 hover:cursor-none transition duration-100 ease-in-out"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <button
        onClick={() => setnavon((prev) => !prev)}
        className={` max-md:flex-col  max-md:flex hidden   max-md:justify-between  p-[2px]  w-[35px] h-[28px] z-[15]`}
      >
        <motion.div
          variants={topvarient}
          animate={navon ? "open" : "closed"}
          className="bg-black rounded w-full  h-[3px]    origin-left"
        ></motion.div>
        <motion.div
          variants={centervarient}
          animate={navon ? "open" : "closed"}
          className="bg-black rounded w-full h-[3px] origin-left"
        ></motion.div>
        <motion.div
          variants={lastvarient}
          animate={navon ? "open" : "closed"}
          className="bg-black rounded w-full h-[3px]   origin-left"
        ></motion.div>
      </button>

      <motion.div
        variants={screenvarient}
        animate={navon ? "open" : "closed"}
        className={` ${
          navon ? "flex" : "hidden"
        } bg-black w-[100vw] h-[100vh] justify-center items-center absolute top-[0px] left-[0px] z-10`}
      >
        <div className="flex flex-col justify-evenly  items-center  h-[250px]  ">
          {navlinks?.map((item) => (
            <motion.div key={item?.title} variants={listitemsvarient}>
              <Link
                href={item?.href}
                onClick={() => setnavon(false)}
                className="  text-white hover:bg-white hover:text-black hover:px-[9px] text-[36px] "
              >
                {item?.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
