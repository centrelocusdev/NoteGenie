import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import ButtonPrimary from "../../components/ButtonPrimary";
import ellipse from "../../assets/ellipse-blue.png";
import rectangle from "../../assets/rectangle.png";
import sbar from "../../assets/sbar.png";
import girl from "../../assets/girl.png";
import dashboard from "../../assets/dashboard.png";
import checkmark from "../../assets/checkmark.png";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="min-h-screen min-w-screen">
      <img
          src={rectangle}
          className="absolute z-60 w-[75%] mx-auto -translate-y-16 hidden md:block"
        />
      <Navbar />
      <div className="mx-auto md:pt-24 p-12 ">     
        <div className="md:flex relative w-full">
          <div className="">
            <h3 className="md:text-4xl text-2xl leading-tight">
              Take Your Note-Taking to the{" "}
              <span className="md:block">Next Level with</span>
            </h3>
            <h2 className="text-primary-dark md:text-5xl text-3xl leading-tight flex items-end gap-1 ">
              <span>NoteGenie</span> <BsArrowRightShort />
            </h2>

            <p className="mt-5 leading-7">
              Our innovative note-taking platform uses the power of AI to
              suggest relevant notes, organize your ideas, and streamline your
              workflow. With ChatGPT, you'll be able to focus on what you do
              best – generating ideas – while our platform handles the rest.
              Ready to take your note-taking to the next level? Try ChatGPT
              today and see how easy it can be
            </p>

            <ButtonPrimary text={"Try NoteGenie"} isDark={true} />
          </div>
          <img src={sbar} alt="" />
        </div>
      </div>

      <div className="mt-5 md:p-8 p-4 flex md:gap-16 gap-5 justify-center items-center">
        <div className="md:w-fit lg:block hidden">
          <img src={girl} alt="technology" className="w-[22rem]" />
        </div>
        <div className="md:w-1/2 flex flex-wrap justify-center">
          {features.map(({ title, desc }, key) => (
            <div
              key={key}
              className="w-72 bg-theme-primary rounded-xl p-4 m-2"
            >
              <h5 className="text-xl font-semibold mb-3">{title}</h5>
              <p className="md:text-normal text-justify">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="about-us" className="md:mt-16 mt-5 md:p-8 p-4 text-center ">
        <h4 className="text-4xl text-primary-dark underline decoration-theme-primary decoration-4 underline-offset-4 font-semibold mb-3">About Us</h4>
        <p className="md:w-2/3 mx-auto p-5 leading-7 md:text-center text-justify">
          Our note-taking app was created with the mission to make note-taking
          simpler, more efficient, and more personalized. We are a team of
          passionate developers, designers, and innovators who believe that
          technology can help transform the way we work and learn. With ChatGPT
          integration, we are constantly pushing the boundaries of what is
          possible and striving to deliver the best user experience for our
          customers. Join us on this journey to revolutionize the way you take
          notes! Ready to take your note-taking to the next level? Try ChatGPT
          today and see how easy it can be.
        </p>
      </div>

      <div className="md:mt-16 mt-5 md:p-16 p-8 flex md:gap-16 justify-center items-center gap-8">
      <div className="md:3/5 lg:block hidden">
          <img src={dashboard} alt="dashboard preview" className="w-full" />
        </div>
        <div className="md:w-2/5">
          <h3 className="text-primary-dark md:text-3xl text-2xl">
            Streamline Your Note-Taking Experience with Modern and Intuitive UI
            Design
          </h3>
          <p className="my-5">
            Upgrade your note-taking experience with our sleek and modern app,
            featuring an intuitive UI design. Our integration with ChatGPT
            provides personalized and insightful suggestions to improve
            productivity and efficiency. Say goodbye to traditional note-taking
            and embrace the future of productivity. Try our cutting-edge app
            today.
          </p>

          <ul
            className={`list-disc list-inside marker:text-theme-primary font-semibold`}
          >
            <li className="my-2">
              Multiple note-taking templates for different types of content and
              workflows
            </li>
            <li className="my-2">
              Auto-save and backup features to ensure that notes are never lost
            </li>
            <li className="my-2">AI-powered note-taking with the ability</li>
          </ul>
        </div>
      </div>

      <div id="faqs" className="md:mt-8 mt-5 p-8 ">
        <h4 className="text-primary-dark text-4xl md:mb-10 mb-6 text-center">
          Frequently Asked Questions
        </h4>
        <div className="md:w-3/5 mx-auto mt-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md p-4 bg-[rgba(255,255,255,0.1)] my-4"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <h3 className="text-lg  font-medium ">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <FaChevronUp className="" />
                ) : (
                  <FaChevronDown className="" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
};

const features = [
  {
    title: "Smart categorization",
    desc: "Our app automatically categorizes your notes based on keywords and tags, making it easier to find and review them when you need to.",
  },
  {
    title: "Export your notes in any format",
    desc: "With our app, you can easily export your notes in a variety of file formats, including PDF, DOCX, and TXT. Simply click the export button.",
  },
  {
    title: "Effortless note-taking",
    desc: "With our app, taking notes is quick and easy. Simply start typing, and our intelligent AI will suggest relevant information to help you get started.",
  },
  {
    title: "Increased productivity",
    desc: "Our note-taking app helps you organize your thoughts and ideas, so you can be more productive and get more done in less time.",
  },
];

const faqs = [
  {
    question: "How does the ChatGPT integration work in the app? ",
    answer:
      "ChatGPT is an AI language model that provides personalized and insightful suggestions based on your notes. It helps you improve your productivity and efficiency by giving relevant recommendations related to your note's topic.",
  },
  {
    question: "Is my data safe and secure in the app?",
    answer:
      "ChatGPT is an AI language model that provides personalized and insightful suggestions based on your notes. It helps you improve your productivity and efficiency by giving relevant recommendations related to your note's topic.",
  },
  {
    question: "Can I export my notes in a specific file format?",
    answer:
      "Yes, our note-taking app allows you to export your notes in a variety of file formats, including PDF, DOCX, and TXT. Simply select the notes you want to export and choose the desired file format from the export options. You can also customize the export settings to suit your preferences.",
  },
  {
    question: "Are there any restrictions on the number of notes I can create?",
    answer:
      "ChatGPT is an AI language model that provides personalized and insightful suggestions based on your notes. It helps you improve your productivity and efficiency by giving relevant recommendations related to your note's topic.",
  },
];

export default Home;
