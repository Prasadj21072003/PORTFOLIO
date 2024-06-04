"use client";
import {
  delay,
  easeIn,
  easeInOut,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Projects } from "../../../data";
import Particlesbackground from "@/components/Particlesbackground";

const Portfolio = () => {
  const [hoveron, sethoveron] = useState();
  const portfolioref = useRef();
  const hireref = useRef();
  const text = "FULL STACK WEB DEVELOPER";
  const { scrollYProgress } = useScroll({ target: portfolioref });

  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-100%"]);
  const movedown = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);

  const isrefinview = useInView(hireref);

  var w = window.innerWidth;

  return (
    <motion.div
      className="h-full w-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%", transition: { duration: 1 } }}
    >
      <div className="h-[500vh]   relative w-full " ref={portfolioref}>
        <Particlesbackground />

        <motion.div
          style={{ y: movedown }}
          className="h-[84vh] w-full flex justify-center items-center text-[60px] lg:text-[120px] mb-[35px] z-50"
        >
          My Works
        </motion.div>

        <div className="w-screen p-[0px] max-2xl:relative sticky top-[0px]  flex h-screen  items-center gap-[14px]  2xl:bg-gradient-to-r 2xl:from-zinc-900 2xl:to-fuchsia-900  bg-white">
          <motion.div
            style={w > 1534 ? { x } : { x: "" }}
            className=" h-screen flex max-2xl:flex-col items-center gap-[100px] "
          >
            {Projects.map((item, i) => (
              <div
                key={i}
                className="h-screen w-screen flex items-center justify-center "
              >
                <div
                  className=" w-[330px] h-[400px]    bg-slate-100  hover:text-white hover:bg-indigo-700"
                  key={i}
                  onMouseEnter={() => sethoveron(i)}
                  onMouseLeave={() => sethoveron()}
                >
                  <div className="w-full h-[60%]  relative ">
                    <Image
                      layout="fill"
                      style={{
                        objectFit: "cover",
                      }}
                      src={item?.img}
                      alt=""
                    />
                  </div>
                  <div className="w-full h-[40%]  flex flex-col gap-[15px] pt-[15px] px-[15px] relative  ">
                    <h1 className="font-semibold text-[24px]">{item?.title}</h1>
                    {/* <span className=" text-[15px] font-light">{item?.para}</span>*/}

                    <Link
                      href={item?.href}
                      className="absolute right-[10px] bottom-[10px] p-[10px] rounded-lg  
                    w-[50%] flex items-center justify-center text-white "
                      style={{
                        backgroundColor: hoveron === i ? "#002379" : "#3949AB",
                      }}
                    >
                      Show
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="w-full h-screen flex  items-center justify-around max-2xl:mt-[200px]">
        <div className="w-full h-[80%] flex flex-col items-center justify-around ">
          <motion.div
            initial={{ scale: 0.2 }}
            // animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: easeIn }}
            animate={isrefinview ? { scale: 1 } : {}}
            className="text-center lg:text-[100px]  text-[50px] md:text-[70px]"
          >
            Do you have a project?
            <motion.div
              initial={{ scale: 0.1 }}
              animate={isrefinview ? { scale: 1, repeat: Infinity } : {}}
              transition={{ duration: 1.5, ease: easeInOut }}
              className="w-full h-[5px] rounded-lg bg-red-500"
            />
          </motion.div>
          <motion.div
            className=" relative flex items-center justify-center "
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: easeInOut }}
          >
            {text.split("").map((l, i) => (
              <motion.span
                key={i}
                style={{ rotate: i * 14.3 }}
                className="text-gray-800 absolute left-[-35px]  origin-[110px] text-[20px] "
              >
                <motion.div style={{ rotate: -90 }}>{l}</motion.div>
              </motion.span>
            ))}

            <Link
              ref={hireref}
              href={"./contact"}
              className="w-[150px] h-[150px] flex justify-center items-center text-white bg-black rounded-full text-[20px] "
            >
              HIRE ME
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
