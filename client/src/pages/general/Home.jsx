import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import ButtonPrimary from "../../components/ButtonPrimary";
import rectangle from "../../assets/rectangle.png";
import sbar from "../../assets/sbar.png";
import dashboard from "../../assets/dashboard.png";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import yellow_notes from "../../assets/yellow_notes.png";
import gp1 from "../../assets/doctor.png"
import gp2 from "../../assets/typist.png"
import gp3 from "../../assets/class.png"
import gp4 from "../../assets/law.png"

const Home = () => {
  const navigate = useNavigate()
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
              workflow. With NoteGenie, you'll be able to focus on what you do
              best – generating ideas – while our platform handles the rest.
              Ready to take your note-taking to the next level? Try NoteGenie
              today and see how easy it can be
            </p>

            <ButtonPrimary text={"Try NoteGenie"} isDark={true} handleClick={(e) => navigate('/dashboard')} />
          </div>
          <img src={sbar} alt="" className="hidden md:block" />
        </div>
      </div>

      <section
        id="features"
        className="mt-5 md:p-8 p-4 flex md:gap-16 gap-5 justify-center items-center"
      >
        <div className="md:w-fit lg:block hidden">
          <img src={yellow_notes} alt="technology" className="w-[27rem]" />
        </div>
        <div className="md:w-1/2 flex flex-wrap justify-center">
          {features.map(({ title, desc }, key) => (
            <div key={key} className="w-72 bg-theme-primary rounded-xl p-4 m-2">
              <h5 className="text-xl font-semibold mb-3">{title}</h5>
              <p className="md:text-normal text-justify">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="md:mt-16 mt-5 md:p-8 p-4 text-center md:w-2/3 mx-auto text-gray-600">
        <h4 className="text-4xl text-primary-dark underline decoration-theme-primary decoration-4 underline-offset-4 font-semibold mb-3">
          About Us
        </h4>
        <p className="p-3 leading-7 md:text-center text-justify">
          Our note-taking app was created with the mission to make note-taking simpler, more efficient, and professional. We are a team of passionate developers, designers, and innovators who believe that technology can help transform the way we work and learn. NoteGenie owners are in the medical and behavioral health profession and understand the time, energy and effort it takes to complete notes that meet your professions standards (i.e. medical necessity, ethical standards, educational/legal requirements). With NoteGenie, we are constantly pushing the boundaries of what is possible and striving to deliver the best user experience for our customers. <br />
          Join us on this journey to revolutionize the way you take
          notes! Elevate your professional note taking with Note Genie.
        </p>
        <p className="text-2xl p-3 leading-7 md:text-center text-justify"> Try NoteGenie today and see how easy it can be.</p>
      </section>

      <section className="md:mt-16 mt-5 md:p-16 p-8 flex md:gap- justify-center items-center gap-8">  
        <div className="md:w-2/3">
        <h4 className="text-3xl text-primary-dark underline decoration-theme-primary decoration-4 underline-offset-4 font-semibold mb-3 capitalize mb-6">
          Our users include
        </h4>
          <ul
            className={`list-decimal list-outside md:ml-4 flex flex-col gap-4 text-gray-600 text-justify`}
          >
            <li>
            Doctors and healthcare professionals: Streamline patient documentation, medical research, and clinical note-taking.
            </li>
            <li>
            Related health professionals (i.e., acupuncturist), speech and language therapists, physical therapists, occupational therapists, chiropractors: Create notes of your choice format like SOAP.
            </li>
            <li>
            Psychologists and psychotherapist: Quickly take notes about your sessions and refine it to create a well drafted document. 
            </li>
            <li>
            Lawyers and legal professionals: Organize case notes, research findings, and client communication for efficient legal practice.
            </li>
            <li>Educators and academic professionals: Take lecture notes, create lesson plans, and track student progress for effective teaching.</li>
            <li>Business professionals: Manage meeting notes, project plans, and brainstorming sessions to boost productivity. </li>
            <li>Researchers and scientists: Capture research findings, experimental data, and hypotheses in a structured format.</li>
            <li>Writers and content creators: Jot down ideas, outline articles, and create content drafts with ease.</li>
          </ul>
        </div>
        <div className="w-1/2 lg:flex hidden flex-wrap gap-5 justify-end">
            <img src={gp1} className="w-[15rem]" />
            <img src={gp2} className="w-[15rem]" />
            <img src={gp3} className="w-[15rem]" />
            <img src={gp4} className="w-[15rem]" />
        </div>
      </section>

      <section className="md:mt-16 mt-5 md:p-16 p-8 flex md:gap-16 justify-center items-center gap-8 text-gray-600">
        <div className="md:3/5 lg:block hidden">
          <img src={dashboard} alt="dashboard preview" className="w-full" />
        </div>
        <div className="md:w-2/5">
          <h3 className="text-primary-dark md:text-3xl text-2xl">
            Streamline Your Note-Taking Experience with Modern and Intuitive UI
            Design
          </h3>
          <p className="my-5 text-justify">
            Upgrade your note-taking experience with our sleek and modern app,
            featuring an intuitive UI design. Our integration with chatGPT
            provides personalized and insightful suggestions to improve
            productivity and efficiency. Say goodbye to traditional note-taking
            and embrace the future of productivity. Try our cutting-edge app
            today.
          </p>

          <ul
            className={`list-disc list-outside  marker:text-theme-primary font-medium `}
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
      </section>

      <section id="faq" className="md:mt-8 mt-5 p-8 ">
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
                <h3 className="text-lg  font-medium ">{faq.question}</h3>
                {openIndex === index ? (
                  <FaChevronUp className="" />
                ) : (
                  <FaChevronDown className="" />
                )}
              </div>
              {openIndex === index && <p className="mt-4">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

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
    question: "Who can use NoteGenie?",
    answer:
      " NoteGenie can be used by all the professionals who are into the filed of Medical, Legal, Sports. It can be very helpful to doctors, therapist, acupuncturist, educationalist and others. ",
  },
  {
    question: "What kind of notes I can write?",
    answer:
      "You can write notes like SOAP, BIRP, SBAR, Clinical Reports, Treatment Plans and other related related kind of notes. ",
  },
  {
    question: "Is my data safe with NoteGenie?",
    answer:
      "Yes, your data is safe with NoteGenie as it does not share or save your notes in the server. ",
  },
  {
    question: "Can I export my Notes?",
    answer:
      "Yes you can export your notes as a PDF file, that is downloaded on your system. ",
  },
  {
    question: "Where will my notes get saved?",
    answer:
      "Your notes are saved on your system after download.",
  },
  {
    question: "Are there any restriction on the notes I take?",
    answer:
      "There is no restriction on the number of notes you take on NoteGenie. But you would need to have a premium plan for that.",
  },
];

export default Home;
