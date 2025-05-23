import react from "react";
import { useState } from "react";
import project from "../data/project.json";
export const ProjectSection = () => {
  
  return (
    <div className="flex flex-col ">
      <div className="flex align-middle justify-center mb-5">
        <h1 className="text-6xl">Project Section</h1>
      </div>
      <div className="flex flex-wrap overflow-auto justify-center">
        {project.map((item, index) => (
          <div
            key={index}
            className="bg-black w-100 h-100 text-white border text-center flex flex-col align-middle justify-center "
          >
            <h2 className="mb-10">{`Project ${index + 1}`}</h2>
            <div>{item.repo_name}</div>
            <div>{item.languages}</div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
