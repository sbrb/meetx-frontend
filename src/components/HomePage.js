/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import EarlySubmitButton from "./EarlySubmitButton";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate(); 
  const handleAdminClick = () => {
    navigate("/admin"); 
  };

  return (
    <div>
      <header>
        <span className="logo">Logo</span>
        {/* <button onClick={handleAdminClick} className="admin_btn">Admin</button> */}
        <span className="header_right_btn"><EarlySubmitButton /></span>
      </header>
      <main>
        <div className="main_container">
          <div className="sub_container_one">
            <div className="sub_container_one_left">
              <div className="heading_container">
                <p className="heading ">Embrace Casual Bliss:</p>
                <p className="sub_heading ">Say Goodbye to Relationship Stress and Hello to stress-free Connections!</p>
                <p className="heading heading_indent2 "> </p>
              </div>
              <div className="desc">

                <p className="desc_1 "><IoArrowRedoSharp />&nbsp; Are you tired of the endless search for serious relationships or feeling bogged down by the stresses of commitment?</p>
                <p className="desc_1"></p>
              </div>
              <div className="desc">
                {/* <span className="desc_2_pre"> NEW </span> */}
                <p className="desc_2_post">
                  <IoArrowRedoSharp />&nbsp; It's time to reclaim your joy and embrace the beauty of casual connections!
                </p>
                {/* <p className="desc_2_post">chatbot sidekick!</p> */}
              </div>
            </div>
            <div className="sub_container_one_right">
              <img src="./images/meetx.png" alt="meetx" />
            </div>
          </div>
          <div className="sub_container_one">
            <div className="sub_container_one_right  sub_container_one_right2">
              <img src="./images/meetx.png" alt="meetx" />
            </div>
            <div className="sub_container_one_left sub_container_one_left2">
              <div className="heading_container">
                <p className="heading "></p>
                <p className="heading ">Stop endless swiping:</p>
                <p className=" sub_heading">Say goodbye to endless swiping and hello to connections!</p>
              </div>
              <div className="desc">

                <p className="desc_1 "><IoArrowRedoSharp />&nbsp; Our revolutionary dating app takes the guesswork out of finding your ideal meet.</p>
                <p className="desc_1"></p>
              </div>
              <div className="desc">
                {/* <span className="desc_2_pre"> NEW </span> */}
                <p className="desc_2_post ">
                  <IoArrowRedoSharp />&nbsp;Let's meet over coffee or any other casual time together and create memorable moments.
                </p>
                {/* <p className="desc_2_post">chatbot sidekick!</p> */}
              </div>
            </div>
          </div>
          <div className="sub_container_one">
            <div className="sub_container_one_left">
              <div className="heading_container">
                <p className="heading ">Skip the Texting:</p>
                <p className="sub_heading"> Find Your Next Movie Buddy or Party Pal Today!</p>
                <p className="heading heading_indent3 "> </p>
              </div>
              <div className="desc">

                <p className="desc_1 "><IoArrowRedoSharp />&nbsp;Wave goodbye to endless texting and awkward invites -
                  it's time to meet your next movie buddy or party companion effortlessly!
                </p>
                <p className="desc_1"></p>
              </div>
              <div className="desc">
                {/* <span className="desc_2_pre"> NEW </span> */}
                <p className="desc_2_post ">
                  <IoArrowRedoSharp />&nbsp;Join now and say hello to spontaneous adventures with new friends!
                </p>
                {/* <p className="desc_2_post">chatbot sidekick!</p> */}
              </div>
            </div>
            <div className="sub_container_one_right">
              <img src="./images/meetx.png" alt="meetx" />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>© 2024 meetX. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
