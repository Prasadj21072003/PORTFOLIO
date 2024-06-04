import React from "react";

const Skill = ({ skill }) => {
  return (
    <div className="py-[2px] px-[8px] h-fit bg-black text-white hover:bg-gray-400  ">
      {skill}
    </div>
  );
};

export default Skill;
