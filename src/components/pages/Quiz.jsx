import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQuestionsList from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../Miniplayer";
import ProgressBar from "../Progressbar";
// eslint-disable-next-line no-unused-vars
import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useAuth } from "../../contexts/AuthContext";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach(question => {
        question.options.forEach(option => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      // eslint-disable-next-line no-case-declarations
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();

  const { loading, error, questions } = useQuestionsList(id);

  // eslint-disable-next-line no-unused-vars
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const history = useNavigate();
  const { state } = useLocation();
  const { videoTitle } = state;

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  //handle when user clicks the next button to get the next question

  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prevCurrent => prevCurrent + 1);
    }
  }

  //handle when user clicks the prev button to get back the prev question

  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion(prevCurrent => prevCurrent - 1);
    }
  }

  // calculate precentage of progress

  const precentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    history(`/result/${id}`, {
      state: {
        qna,
      },
    });
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error...</div>}
      {!loading && !error && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title} </h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
            progress={precentage}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
