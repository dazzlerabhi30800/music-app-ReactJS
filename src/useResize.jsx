import React, { useEffect, useState } from "react";

const useResize = () => {
  const [resize, setResize] = useState(window.innerWidth);
  function checkSize() {
    setResize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [resize]);
  return resize;
};

export default useResize;
