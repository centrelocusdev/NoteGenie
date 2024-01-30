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
import { addSubscriber } from "../../api";

const Home = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(-1);
  const [input, setInput] = useState("");
  const [susbBtn, setSubsBtn] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await addSubscriber({ email: input });
    res && setSubsBtn(true);
    res && setInput("");
  };
  return (
    <section className="min-h-screen min-w-screen">
      <img
        src={rectangle}
        className="absolute z-60 w-[75%] mx-auto -translate-y-16 hidden md:block"
      />
      <Navbar />
      <div className="mx-auto md:pt-24 p-12 ">
        <div className="md:flex relative w-full">
          <div className="flex flex-col items-center md:items-start justify-center md:justify-start">
            <div className="flex justify-center md:justify-left items-end gap-1 md:text-5xl text-3xl">
              <h2 className="text-primary-dark leading-tight ">
                Note Genie: Write Less, Connect More
              </h2>
              {/* <BsArrowRightShort className="hidden sm:block" /> */}
            </div>

            <p className="mt-5 leading-7 text-justify sm:text-left">
              Welcome to Note Genie, where we revolutionize professional
              note-taking with the power of AI. Embrace the ease of Writing Less
              and Connecting More in your work. Professionals across various
              fields — from social workers and medical experts to educators and
              law enforcement officers — find Note Genie the perfect ally for
              efficient documentation. Our AI-driven platform is meticulously
              designed to enhance clinical documentation, streamline educational
              notes, and optimize legal case reports with unmatched precision.
            </p>
            <p className="mt-5 leading-7 text-justify sm:text-left">
              Experience the transformative power of Note Genie. Here,
              innovation meets efficiency, giving you more time to focus on what
              truly matters in your profession. Unlock a new era of
              documentation efficiency and deepen your professional connections
              with Note Genie.
            </p>
            <p className="mt-5 leading-7 text-justify sm:text-left">
              Start your journey towards streamlined documentation. Discover a
              world where note-taking is no longer a chore but a seamless,
              intuitive process. With Note Genie, step into the future of
              efficient, AI-enhanced professional documentation.
            </p>

            <ButtonPrimary
              text={"Try NoteGenie"}
              isDark={true}
              handleClick={(e) => navigate("/dashboard")}
            />
          </div>
          <img src={sbar} alt="" className="hidden md:block" />
        </div>
      </div>

      <section
        id="features"
        className="mt-5 md:px-8 md:py-16 p-4 md:gap-16 gap-5"
      >
        <h4 className="text-primary-dark text-3xl md:mb-10 mb-6 text-center underline decoration-theme-primary decoration-4 underline-offset-4">
          Our Features
        </h4>
        <div className="flex flex-wrap justify-center">
          {features.map(({ title, desc }, key) => (
            <div
              key={key}
              className="w-72 bg-theme-primary rounded-xl p-5 m-2 border-2 rounded-2xl border-theme-primary"
            >
              <h5 className="text-2xl font- mb-3">{title}</h5>
              <p className="md:text-normal">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        className=" mt-5 md:px-8 md:py-16 p-4 text-center text-gray-600 bg-white flex justify-center items-center"
      >
        <div className="md:w-2/3 mx-auto">
          <h4 className="text-3xl text-primary-dark underline decoration-theme-primary decoration-4 underline-offset-4 mb-3">
            About Us
          </h4>
          <p className="text-md p-3 leading-8 md:text-center text-justify">
            At Note Genie, we are redefining the art of note-taking. Born from a
            vision to simplify and enhance the note-taking process, our app is
            the culmination of expertise, innovation, and a deep understanding
            of professional needs. We are a diverse team of passionate
            designers, and industry experts united by a belief in the
            transformative power of technology in the workplace and educational
            environments.{" "}
          </p>
          <p className="text-md p-3 leading-8 md:text-center text-justify">
            {" "}
            Our roots lie in the medical and behavioral health professions,
            giving us first hand insight into the challenges of maintaining
            rigorous professional standards. We recognize the immense time,
            energy, and effort required to create notes that meet and exceed the
            expectations of medical necessity, ethical standards, and legal or
            educational requirements. It's this understanding that drives our
            commitment to excellence.
          </p>
          <p className="text-md p-3 leading-8 md:text-center text-justify">
            With Note Genie, we're not just developing an app but crafting an
            experience. We focus on pushing the boundaries of what's possible,
            dedicated to delivering a product that stands out for its
            efficiency, professionalism, and ease of use. We strive to provide a
            seamless and intuitive user experience that aligns with the dynamic
            needs of our customers.
          </p>
          <p className="text-md p-3 leading-8 md:text-center text-justify">
            Join us in this revolution. Experience the difference with Note
            Genie, where we empower you to "Write Less, Connect More." Discover
            a world where note-taking is not just a task but a seamless part of
            your professional journey.
          </p>
          <p className="text-xl p-3 leading-7 md:text-center text-justify">
            Join the Note Genie revolution – Write Less, Connect More, and
            transform the way you work
          </p>
        </div>
      </section>

      <section className="md:mt-16 mt-5 md:p-16 p-8 flex md:gap- justify-center items-center gap-8">
        <div className="md:w-4/5 mx-auto">
          <h4 className="text-3xl text-primary-dark underline decoration-theme-primary decoration-4 underline-offset-4 mb-3 capitalize mb-6 text-center">
            Our users include
          </h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {userInclude.map((d) => (
              <div className="w-72 border-2 text-md text-center rounded-2xl border-theme-primary p-5 shadow-lg hover:bg-white cursor-pointer">
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="md:mt-16 mt-5 md:p-16 p-8 flex md:gap-16 justify-center items-center gap-8 text-gray-600 bg-white">
        <div className="md:3/5 lg:block hidden">
          <img src={dashboard} alt="dashboard preview" className="w-full" />
        </div>
        <div className="md:w-2/5">
          <h3 className="text-primary-dark md:text-3xl text-2xl">
            Streamline Your Note-Taking Experience with Modern and Intuitive UI
            Design
          </h3>
          <p className=" mb-2 mt-5 text-justify">
            <span className="font-medium mr-2">Redefine Your Note-Taking with Note Genie:</span>
            Where Efficiency Meets
            Intuitive Design Transform how you capture information with Note
            Genie, the epitome of modern, intuitive note-taking. Our application
            is not just a tool; it's an experience that redefines productivity
            and efficiency in your professional world. With our seamless
            integration of chatGPT technology, Note Genie offers personalized,
            AI-driven insights and suggestions, tailoring your note-taking to
            your unique workflow.
          </p>
          <p className=" text-justify">
            Say farewell to outdated methods and embrace a new era where every
            note is an opportunity to "Write Less, Connect More." Our
            cutting-edge app is designed to adapt to your needs, ensuring you
            spend less time on documentation and more time focusing on what
            truly matters in your profession.
          </p>

          <p className="text-lg font-semibold mt-5 text-justify">
            Key Features of Note Genie:
          </p>
          <ul
            className={`list-disc list-outside  marker:text-theme-primary font-medium `}
          >
            <li className="mt-2">
              <span className="mr-2">Diverse Templates:</span>
              <span className="font-normal">
                Choose from various note templates, each optimized for different
                content types and professional workflows.
              </span>
            </li>
            <li className="my-2">
              <span className="mr-2">Reliable Auto-Save and Backup:</span>
              <span className="font-normal">
                With our robust auto-save and backup functionalities, rest
                assured that your notes are safe and retrievable at any moment.
              </span>
            </li>
            <li className="my-2">
              <span className="mr-2">AI-Enhanced Customization:</span>
              <span className="font-normal">
                At the core of Note Genie is our AI-powered technology, ready to
                refine and adapt each note to your specific requirements.
              </span>
            </li>
          </ul>
          <p>
            Experience the future of note-taking today with Note Genie. Join us
            on a journey where every note is a step towards greater efficiency
            and deeper professional connections.
          </p>
        </div>
      </section>

      <section className="md:mt-16 mt-5 md:p-16 p-8 text-gray-600">
        <h4 className="text-primary-dark text-3xl md:mb-10 mb-6 underline decoration-theme-primary decoration-4 underline-offset-4">
          How to use NoteGenie?
        </h4>
        <div className="md:flex md:gap-16 justify-center gap-8">
          <div className="md:w-1/2">
            <h3 className="text-primary-dark text-2xl">Streamline Workflow</h3>

            <ul className={`list-disc list-outside  marker:text-theme-primary`}>
              <li className="my-2">
                Take advantage of Note Genie’s templates tailored to various
                professional settings and needs.
              </li>
              <li className="my-2">
                Select the appropriate template for your note type (e.g.,
                progress notes, treatment plans, discharge summaries).
              </li>
              <li className="my-2">
                {" "}
                Customize the template to match your specific requirements and
                preferences. Name the template you'd like to create and state
                what you'd like to how you would like Note Genie to elevate your
                notes (i.e. create a note specific to your industry).{" "}
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-primary-dark text-2xl">Elevate your notes</h3>

            <ul className={`list-disc list-outside  marker:text-theme-primary`}>
              <li className="my-2">
                Simply select the type of note you want to use (i.e., SOAP,
                BIRP, etc).
              </li>
              <li className="my-2">
                Start typing your notes (or paste notes already typed) in the
                designated field.
              </li>
              <li className="my-2">Select Elevate Your Notes</li>
              <li className="my-2"> View the Note Genie Results</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="md:mt-8 mt-5 px-8 md:py-16 py-8 bg-white">
        <h4 className="text-primary-dark text-4xl md:mb-10 mb-6 text-center">
          Frequently Asked Questions
        </h4>
        <div className="md:w-3/5 mx-auto mt-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg p-4 bg-[rgba(255,255,255,0.1)] my-4 border-2 border-primary-light "
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <h3 className="text-xl">{faq.question}</h3>
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

      <section className="md:w-3/5 mx-auto mt-5 md:p-16 p-8 text-gray-600">
        <div className="md:flex gap-2 items-end h-[10%] justify-between">
          <input
            type="email"
            className="rounded-lg px-6 py-3 bg-[#ECECEC] w-full focus:outline-none"
            name="input"
            placeholder="Please enter your email address"
            value={input}
            onChange={handleInputChange}
          />
          <button
            onClick={handleClick}
            className="rounded-lg py-3 px-5 bg-primary-dark text-white font-semibold md:w-fit w-full md:mt-0 mt-3 hover:bg-gray-800"
          >
            {susbBtn ? "Subsribed!" : "Subscribe"}
          </button>
        </div>
      </section>

      <Footer />
    </section>
  );
};

const userInclude = [
  " Social Worker and psychotherapist: Quickly take notes about your sessions and refine it to create a well drafted document.",
  "Related health professionals (i.e., acupuncturist), speech and language therapists, physical therapists, occupational therapists,chiropractors: Create notes of your choice format like SOAP.",
  "Doctors and healthcare professionals: Streamline patient documentation, medical research, and clinical note-taking.",
  "Lawyers and legal professionals: Organize case notes, research findings, and client communication for efficient legal practice.",
  "Educators and academic professionals: Take lecture notes, create lesson plans, and track student progress for effective teaching.",
  "Business professionals: Manage meeting notes, project plans, and brainstorming sessions to boost productivity.",
  "Researchers and scientists: Capture research findings, experimental data, and hypotheses in a structured format.",
  "Writers and content creators: Jot down ideas, outline articles, and create content drafts with ease.",
];

const features = [
  {
    title: "Note Optimization ",
    desc: "Save time, reduce errors, and enhance insurance reimbursement accuracy with AI-powered note optimization.",
  },
  {
    title: "Export your notes in any format",
    desc: "With our app, you can easily export your notes in a variety of file formats, including PDF, DOCX, and TXT. Simply click the export button.",
  },
  {
    title: "Enhance your note-taking experience",
    desc: "Improve your progress notes. Note Genie will ensure your notes are specific, objective, and focused on measurable outcomes.",
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
    answer: "Your notes are saved on your system after download.",
  },
  {
    question: "Are there any restriction on the notes I take?",
    answer:
      "There is no restriction on the number of notes you take on NoteGenie. But you would need to have a premium plan for that.",
  },
];

export default Home;
