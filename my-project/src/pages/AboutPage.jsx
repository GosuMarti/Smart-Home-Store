import React from "react";
import NavBar from "../components/ui/navigation/NavBar";
import Pagination from "../components/ui/aboutcomponent/Pagination";
import { useState } from "react";
import InfoCart from "../components/ui/aboutcomponent/InfoCart";
import Timeline from "../components/ui/aboutcomponent/Timeline";
import Technologies from "../components/ui/aboutcomponent/Technologies";

const AboutPage = () => {
  const [image, setImage] = useState(0);

  const handleImage = (index) => {
    setImage(index);
  };

  const renderImage = () => {
    switch (image) {
      case 5:
        return (
          <img
            src="src\assets\Elana2.jpg"
            className="max-w-sm rounded-lg shadow-2xl max-h-96"
          />
        );
      case 1:
        return (
          <img
            src="src\assets\Hristo2.jpg"
            className="max-w-sm rounded-lg shadow-2xl max-h-96"
          />
        );
      case 2:
        return (
          <img
            src="src\assets\Martin.jpg"
            className="max-w-sm rounded-lg shadow-2xl max-h-96 "
          />
        );
      case 3:
        return (
          <img
            src="src\assets\alex2.jpg"
            className="max-w-sm rounded-lg shadow-2xl  max-h-96"
          />
        );
      case 4:
        return (
          <img
            src="src\assets\stoyan.jpg"
            className="max-w-sm rounded-lg shadow-2xl max-h-96"
          />
        );
      case 0:
        return (
          <img
            src="src\assets\angel3.jpg"
            className="max-w-sm rounded-lg shadow-2xl max-h-96"
          />
        );
      default:
        return null;
    }
  };

  const renderText = () => {
    switch (image) {
      case 0:
        return (
          <>
            <h1 className="text-3xl font-bold mb-5 text-violet-500 w-72">
              Angel Stoynov
            </h1>
            <InfoCart
              github={"https://github.com/StoynovAngel"}
              instagram={"https://www.instagram.com/angelstoynovv/?hl=en"}
              facebook={
                "https://www.facebook.com/profile.php?id=100022110724481"
              }
            />
          </>
        );
      case 1:
        return (
          <>
            <h1 className="text-3xl font-bold mb-5 text-violet-500 w-72">
              Hristo Sotirov
            </h1>
            <InfoCart
              github={"https://github.com/HristoSotirov"}
              instagram={"https://www.instagram.com/hristo_r_sotirov/?hl=en"}
              facebook={
                "https://www.facebook.com/profile.php?id=100026897013303"
              }
            />
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-3xl font-bold mb-5 text-violet-500 w-72">
              Martin Venev
            </h1>
            <InfoCart
              github={"https://github.com/GosuMarti"}
              instagram={"https://www.instagram.com/martin_venev/?hl=en"}
              facebook={
                "https://www.facebook.com/profile.php?id=100002093317420"
              }
            />
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-3xl font-bold mb-5 text-violet-500 w-72 ">
              Alexandar Dimitrov
            </h1>
            <InfoCart
              github={"https://github.com/AleksandarDimitrov21"}
              instagram={"https://www.instagram.com/a_dimitrow_/?hl=en"}
              facebook={
                "https://www.facebook.com/profile.php?id=100008834714965"
              }
            />
          </>
        );
      case 4:
        return (
          <>
            <h1 className="text-3xl font-bold mb-5 text-violet-500 w-72">
              Stoyan Ivanov
            </h1>
            <InfoCart
              github={"https://github.com/stiv03"}
              instagram={"https://www.instagram.com/s_ivanov22/?hl=en"}
              facebook={"https://www.facebook.com/stoyan.ivanov.9237"}
            />
          </>
        );
      case 5:
        return (
          <>
            <h1 className="text-3xl  font-bold mb-5 text-violet-500 w-72">
              Elena Dobreva
            </h1>
            <InfoCart
              github={"https://github.com/ElenDobreva"}
              instagram={"https://www.instagram.com/edobreva24/?hl=en"}
              facebook={"https://www.facebook.com/elena.dobreva.7906"}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white flex h-max">
        <div className="overflow-hidden h-16  min-h-screen">
          <NavBar />
        </div>
        <div className="w-full">
          <div>
            <div className="relative">
              <img
                src="src\assets\pexel3.jpg"
                alt="Background"
                className="w-full h-screen object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <h1 className="text-5xl font-bold font-serif text-white">
                  About
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl mt-10 mb-5 font-semibold font-serif text-zinc-800">
              Who are we?
            </h1>
            <div className="mx-2 sm:mx-0 flex justify-center items-center">
              <h2>
                We provide IoT-powered devices, transforming the way you
                interact with technology. We embarked on this journey to create
                something meaningful.
              </h2>
            </div>
            <h1 className="text-3xl mt-10 mb-5 font-semibold font-serif text-zinc-800">
              Our Mission
            </h1>

            <Timeline />

            <Technologies />
            <div className="w-3/6 flex justify-center text-center "></div>
            <h1 className="text-4xl mt-10 mb-5 font-semibold font-serif text-zinc-800">
              Meet our members
            </h1>
            <div className="rounded-lg flex-col justify-center">
              <div className="hero-content flex-col lg:flex-row-reverse">
                {renderImage()}
                <div className="">{renderText()}</div>
              </div>
              <div className="flex justify-center items-center mb-3">
                <Pagination diff={handleImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
