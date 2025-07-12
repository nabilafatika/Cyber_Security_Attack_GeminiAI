
import { useState } from "react";
import "../../index.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import 'remixicon/fonts/remixicon.css';
import Header from "../../components/Header";

function Ai() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading the answer... \n It might take up to 5 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
                process.env.REACT_APP_GENERATIVE_LANGUAGE_CLIENT}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Can You Please Try Again!");
    }
    setGeneratingAnswer(false);
  }
  return (
    <>
      <div className="w-full h-screen flex-col justify-center items-center flex m-0">
      <Header  subtitle="Predict the IP Address Or You Can Ask Anything with AI"/>
        <form
          onSubmit={generateAnswer}
          style={{ backgroundColor: '#a1a4ab' }}
          className="mb-20 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-gradient-to-r from-grey-200 to-blue-50 py-6 px-4 transition-all duration-500 transform"
        >
        <h1 className="text-2xl font-bold text-black-500 mb-4">
        Risk Prediction
        </h1>
          <textarea
            required
            className="w-full text-black text-justify border border-gray-300 rounded my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="You can ask anything, e.g : Risk of This IP 12.3.xxxx"
          ></textarea>
          <button
            type="submit"
            className={`bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-all duration-300 ${
              generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={generatingAnswer}
          >
            Generate Risk with AI
          </button>
        <div
          className="w-full border text-black border-gray-300 text-justify rounded-lg bg-white my-4 px-4 shadow-lg transition-all duration-500 transform max-h-64 overflow-y-auto"
        >
          <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
        </div>
        </form>
      </div>
    </>
  );
}

export default Ai;
