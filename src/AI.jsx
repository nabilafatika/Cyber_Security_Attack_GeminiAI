import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import 'remixicon/fonts/remixicon.css';

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
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
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
        <form
          onSubmit={generateAnswer}
          className=" text-center "
        >
        <h1 className="text-2xl font-bold text-black-500 mb-4">
      Risk Prediction
        </h1>
          <textarea
            required
            className="w-full text-black border border-gray-300 rounded min-h-fit p-1 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="You can ask anything, e.g : Risk of This IP 12.3.xxxx"
          ></textarea>
          <button
            type="submit"
            className={`bg-gray-500 text-white p-2 mb-1 mt-1 rounded-md hover:bg-gray-600 transition-all duration-300 ${
              generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={generatingAnswer}
          >
            Generate Risk with AI
          </button>
        <div
          className="text-black w-full border border-gray-300 text-justify mt-1 rounded-lg bg-white shadow-lg transition-all duration-500 transform max-h-64 overflow-y-auto"
        >
          <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
        </div>
        </form>
    </>
  );
}

export default Ai;
