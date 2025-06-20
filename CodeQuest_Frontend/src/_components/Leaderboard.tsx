import React from "react";
import { IoPersonCircle } from "react-icons/io5";

import { Progress } from "@/components/ui/progress";

type ProgressProps = {
  value: number;
  variant?: "success";
  size?: "default" | "sm";
};

function Leaderboard({ value, variant, size }: ProgressProps) {
  if (!variant) return;

  return (
    <>
      <div className="flex p-2 justify-center">
        <h3 className="font-bold text-2xl mr-2"> Leaderboard</h3>
        <img src="./crown.png" alt="crown" className="h-8 w-14" />
      </div>

      <div className="mt-2  bg-[#c4b5fd7a] h-full m-3 p-2 rounded-md">
        <div className="flex ">
          <IoPersonCircle className="h-10 w-10  mr-4" />

          <div className=" w-[80%] mr-4 flex items-center">
            <Progress
              className=" h-2 bg-slate-200 "
              value={value}
              variant={variant}
            />
          </div>

          <span className="font-bold  p-2">66%</span>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
