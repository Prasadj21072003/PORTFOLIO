"use client";
import Brain from "@/components/Brain";
import Skill from "@/components/Skill";
import { easeIn, easeInOut, motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";

const skilllist = [
  "Html",
  "Css",
  "Javascript",
  "React",
  "Sass",
  "MongoDb",
  "Mongoose",
  "Nodejs",
  "Expressjs",
  "Tailwind Css",
  "Nextjs",
  "Typescript",
  "Redux",
  "Framer-motion",
  "Shad CN",
  "G-Sap",
  "Lenis",
  "Three.js",
  "React-three-fiber",
  "React-three-drei",
  "Jwt",
  "Sql",
  "Mysql",
  "Rest Api",
  "Socket.io",
  "Redis",
  "PostgreSQL",
  "Prisma",
];

const About = () => {
  const containerref = useRef();
  const { scrollYProgress } = useScroll({ container: containerref });

  const skillref = useRef();
  const isskillrefinview = useInView(skillref, { once: true });
  const experienceref = useRef();
  const isexperiencerefinview = useInView(experienceref, { once: true });

  return (
    <motion.div
      className=" sm:px-[96px] px-[48px] h-full "
      initial={{ y: "-200vh" }}
      animate={{ y: "0%", transition: { duration: 1 } }}
    >
      <div
        className="w-full h-full flex overflow-x-hidden bg-transparent "
        ref={containerref}
      >
        {/* left div */}
        <div className=" w-full  lg:w-[100%] pt-[120px] sm:px-[32px] px-[16px] flex flex-col gap-[45px] sm:gap-[65px] md:gap-[85px] lg:gap-[105px] xl:gap-[125px] h-full ">
          <div className="flex flex-col gap-[48px] lg:w-[100%] w-full relative ">
            <h1 className="font-bold text-[22px]">BIOGRAPHY</h1>
            <p className="">
              I am a Mechanical enginnering Student studying in Thakur Collage
              of Enginnering,Kandivali. I am dedicated towards my career. I like
              to learn new skills and improve myself . I worked on some projects
              like building responsive and non-responsive websites, made some
              interesting presentations and also I did some photo and video
              editing .
            </p>
            <span className="italic">
              Mechanical Engineer By Education,Programmer By Passion.
            </span>
            <span className="italic  self-end relative right-[20px]">
              :- Prasad Jadhav
            </span>
            <motion.div
              initial={{ y: 0, opacity: 0.2 }}
              animate={{ y: 40, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="border-[1px] px-[6px] py-[9px] w-fit border-black rounded-[12px] text-[20px] "
            >
              ↓
            </motion.div>
          </div>

          {/* Mid div*/}
          <div
            className="flex flex-col gap-[48px] lg:w-[100%] w-full my-[150px]  "
            ref={skillref}
          >
            <motion.div
              initial={{ x: "-200vh" }}
              animate={isskillrefinview ? { x: 0 } : {}}
              transition={{ delay: 0.5, ease: easeIn, duration: 0.5 }}
            >
              <h1 className="font-bold text-[22px]">SKILLS</h1>
            </motion.div>
            <motion.div
              className="  flex flex-wrap gap-[15px] w-[100%]"
              initial={{ x: "-200vh" }}
              animate={isskillrefinview ? { x: 0 } : {}}
              transition={{ delay: 0.6, ease: easeIn, duration: 0.6 }}
            >
              {skilllist?.map((item) => (
                <Skill skill={item} key={item} />
              ))}
            </motion.div>
            <motion.div
              initial={{ x: "-200vh" }}
              animate={isskillrefinview ? { x: 0 } : {}}
              transition={{ delay: 0.7, ease: easeIn, duration: 0.7 }}
            >
              <motion.div
                className=" border-[1px] px-[6px] py-[9px] w-fit border-black rounded-[12px] text-[20px] "
                initial={{ y: 0, opacity: 0.2 }}
                animate={{ y: 40, opacity: 1 }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
          {/* last div*/}
          <div
            className="flex flex-col gap-[48px] w-full lg:w-[100%]  pb-[150px]  "
            ref={experienceref}
          >
            <motion.div
              initial={{ x: "-200vh" }}
              animate={isexperiencerefinview ? { x: 0 } : {}}
              transition={{ delay: 0.5, ease: easeIn, duration: 0.5 }}
            >
              <h1 className="font-bold text-[22px]">EXPERIENCE</h1>
            </motion.div>
            <motion.div
              initial={{ x: "-200vh" }}
              animate={isexperiencerefinview ? { x: 0 } : {}}
              transition={{ delay: 0.6, ease: easeIn, duration: 0.6 }}
            >
              <div className="xl:w-[90%] h-[450px] max-sm:h-[480px] flex justify-between ">
                <div className="w-[33%] h-full  flex flex-col justify-between ">
                  <div className="flex flex-col gap-[10px] max-sm:mb-[25px]">
                    <div className="bg-white  py-[4px] px-[6px]   text-[15px] font-semibold">
                      Full Stack Web Developer
                    </div>
                    <span className="italic text-[12px] mb-[5px]">
                      I am a full stack web developer eager to learn new
                      technogies and improve my skills
                    </span>
                    <span className="text-orange-400 text-[12px]">
                      2023-Present
                    </span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <div className="bg-white  py-[4px] px-[6px]   text-[15px] font-semibold">
                      Magzine Designer
                    </div>
                    <span className="italic text-[12px] mb-[5px]">
                      I was magzine designer in college magzine named as MECHON
                    </span>
                    <span className="text-orange-400 text-[12px]"></span>
                  </div>
                </div>
                <div className="w-[10%] h-full  flex items-center justify-center max-sm:w-[4%]">
                  <motion.div
                    className="w-[5px] bg-orange-700 h-[90%] relative flex flex-col justify-between "
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 3, delay: 0.5 }}
                  >
                    <div className="rounded-full bg-white  border-[2px] border-red-700 w-[25px] h-[25px] relative right-[10px] " />
                    <div className="rounded-full bg-white border-[2px] border-red-700 w-[25px] h-[25px] relative right-[10px] " />
                    <div className="rounded-full bg-white border-[2px] border-red-700 w-[25px] h-[25px] relative right-[10px] " />
                  </motion.div>
                </div>
                <div className="w-[33%] h-full  flex flex-col items-center justify-center ">
                  <div className="flex flex-col gap-[10px]">
                    <div className="bg-white  py-[4px] px-[6px]   text-[15px] font-semibold">
                      Creative Team Member
                    </div>
                    <span className="italic text-[12px] mb-[5px]">
                      I am member of creative team of college gfg committee
                    </span>
                    <span className="text-orange-400 text-[12px]"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className=" w-[100%] max-lg:hidden  h-full  overflow-visible sticky top-[0px]">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
};

export default About;
