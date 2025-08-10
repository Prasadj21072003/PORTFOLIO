"use client";
import {
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
import Particlesbackground from "@/components/Particlesbackground";
import StarIcon from "@mui/icons-material/Star";

import axios from "axios";
const Portfolio = () => {
  const [hoveron, sethoveron] = useState();
  const [projects, setprojects] = useState();
  const [width, setwidth] = useState(false);
  const portfolioref = useRef();
  const hireref = useRef();
  const text = "FULL STACK WEB DEVELOPER";
  const { scrollYProgress } = useScroll({ target: portfolioref });
  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-100%"]);
  const movedown = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);
  const isrefinview = useInView(hireref);
  useEffect(() => {
    setwidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const fetchingdata = async () => {
      try {
        const resp = await axios.get("api/projects",{ timeout: 10000 });
        setprojects(resp?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingdata();
  }, []);

  let Mytext = `My Projects`;
  return (
    <motion.div className=" w-full  relative">
      <div className="h-[500vh] w-full relative" ref={portfolioref}>
        <Particlesbackground />

        <motion.div
          style={{ y: movedown }}
          className="h-[84vh] w-full relative flex justify-center items-center text-[50px] lg:text-[120px] xl:text-[140px] mb-[35px] z-50 "
        >
          <motion.div
            initial={{ scale: 0.7 }}
            whileInView={{ scale: 1.2 }}
            transition={{ duration: 0.5, delay: 0.7, ease: easeIn }}
            className="h-fit font-serif overflow-hidden flex  px-[20px] relative"
          >
            {Mytext.split("").map((l, i) => (
              <motion.h1
                key={`letter-${i}`}
                initial={{
                  scale: 1,

                  color: "black",
                }}
                whileHover={{
                  scale: 1.3,
                  color: "#F57C00",
                }}
                className="hover:cursor-none relative"
              >
                {l}
              </motion.h1>
            ))}
          </motion.div>
        </motion.div>

        <div
          className={`z-[999] w-screen p-[0px] 2xl:overflow-x-hidden   max-2xl:relative sticky top-[0px]  flex h-screen  items-center gap-[14px]  2xl:bg-gradient-to-r 2xl:from-zinc-900 2xl:to-fuchsia-900  bg-white`}
        >
          <motion.div
            style={width > 1534 ? { x } : { x: "" }}
            className=" h-screen relative flex max-2xl:flex-col max-2xl:pt-[9rem] max-2xl:pb-[5rem]  items-center  "
          >
            {projects?.map((item, i) => (
              <div
                key={`${item?.href}-${i}`}
                className="h-screen relative  w-screen flex items-center justify-center   py-[5rem]"
              >
                <div
                  className=" hover:scale-[0.95] transition-all relative duration-300 ease-in-out  w-[350px] sm:w-[510px] sm:pb-[5px]  max-sm:h-[400px] h-[620px] max-2xl:border-[2px] max-2xl:border-black    bg-slate-100  hover:text-white hover:bg-indigo-700"
                  onMouseEnter={() => sethoveron(i)}
                  onMouseLeave={() => sethoveron()}
                >
                  <div className="w-full h-[40%] max-sm:h-[60%] relative ">
                    <Image
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                      sizes="100vw"
                      src={item?.img}
                      alt=""
                    />
                  </div>
                  <div className="w-full  h-[60%] max-sm:h-[40%]   flex flex-col gap-[5px] pt-[15px] px-[15px] relative  ">
                    <h1 className="font-semibold text-[24px] mb-[10px]  relative">
                      {item?.title}
                    </h1>
                    <div className="w-full relative border-b max-sm:hidden border-b-gray-400 max-2xl:border-b-black h-[90%] mb-[20px]  flex flex-col ">
                      <ul className=" pl-[2px] pr-[5px] relative text-[1.20rem] flex flex-col gap-[8px]">
                        {item?.info?.map((i, k) => (
                          <div className="flex gap-[5px]" key={`info-${k}`}>
                            <StarIcon className="text-orange-600 relative top-[2px]" />
                            <li>{i}</li>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={item?.href}
                      className="relative max-2xl:border-2  max-2xl:border-black max-sm:absolute max-sm:right-[10px] max-sm:bottom-[10px] ml-auto bottom-[5px] p-[10px] rounded-lg  
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
      <div className="w-full relative h-screen flex  items-center justify-around max-2xl:hidden  ">
        <div className="w-full relative h-[80%] flex flex-col items-center justify-around ">
          <motion.div
            initial={{ scale: 0.2 }}
            // animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: easeIn }}
            animate={isrefinview ? { scale: 1 } : {}}
            className="text-center relative lg:text-[100px] font-serif  text-[50px] md:text-[70px]"
          >
            Do you have a project?
            <motion.div
              initial={{ scale: 0.1 }}
              animate={isrefinview ? { scale: 1, repeat: Infinity } : {}}
              transition={{ duration: 1.5, ease: easeInOut }}
              className="w-full h-[5px] rounded-lg bg-red-500 relative"
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
              className="w-[150px] relative  h-[150px] flex justify-center items-center text-white bg-black rounded-full text-[20px] "
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
