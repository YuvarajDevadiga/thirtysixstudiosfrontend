import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, [showCanvas]);

  useGSAP(() => {
    headingref.current.addEventListener("click", (e) => {
      gsap.set(growingSpan.current, {
        top: e.clientY,
        left: e.clientX,
      });

      gsap.to("body", {
        color: "#000",
        duration: 1.2,
        ease: "power2.inOut",

        onComplete: () => {
          gsap.to("body", {
            delay: 2,
            color: "white",
            ease: "power2.inOut",
          });
        },
      });

      gsap.to(growingSpan.current, {
        scale: 1000,
        duration: 2,
        ease: "power2.inOut",

        onComplete: () => {
          gsap.set(growingSpan.current, {
            scale: 0,
            delay: 1,
            clearProps: "all",
          });
        },
      });

      setShowCanvas(!showCanvas);
    });
  });

  return (
    <>
      <span
        ref={growingSpan}
        className="fixed top-[-20px] left-[-20px] w-4 h-4 block growing rounded-full"
      ></span>
      <div className="w-full  relative    min-h-screen font-['gilroy']">
        {showCanvas &&
          data[0].map((item, index) => <Canvas key={index} details={item} />)}
        <div className="w-full relative z-[1] h-screen ">
          <nav className=" w-full p-8 flex justify-between z-50 ">
            <div className="brand text-2xl font-regular">thirtysixstudios</div>
            <div className="links  flex gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => {
                return (
                  <a
                    key={index}
                    href={`#${link.toLowerCase()}`}
                    className="text-md hover:text-gray-300"
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          </nav>
          <div className="textcontainer  w-full px-[20%]">
            <div className="text w-[50%]   ">
              <h3 className="text-3xl ">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-md w-[80%] mt-10 font-md">
                We’re a boutique production studio focused on design, motion,
                and creative technology, constantly reimagining what digital
                craft can do for present-time ads and campaigns
              </p>
              <p className="text-md mt-10 text-gray-300">scroll</p>
            </div>
          </div>
          <div className="w-full absolute px-2 bottom-0 left-0 ">
            <h1
              ref={headingref}
              className="text-[14vw] text-center tracking-tight leading-none "
            >
              thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 px-10 ">
        {data[0].map((item, index) => (
          <Canvas key={index} details={item} />
        ))}
        <div className="relative z-[1]">
          <h1 className="text-8xl font-thin tracking-tighter ">
            about the brand
          </h1>
          <p className="text-4xl w-[80%] leading-[1.4] mt-10 font-light">
            We aim to revolutionize digital production in the advertising space,
            bringing your ideas to life.
          </p>
          <img
            className="w-[80%] mt-10"
            src="https://directus.funkhaus.io/assets/d7ea81ef-1bf6-4f60-918a-117d57f1876e?withoutEnlargement=true&fit=outside&width=600&height=600"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default App;
