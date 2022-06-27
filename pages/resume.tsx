import Image from "next/image";
import React from "react";

const Resume = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Image
        src="/contributions.png"
        objectFit="cover"
        width="850px"
        height="200px"
      />
    </div>
  );
};

export default Resume;
