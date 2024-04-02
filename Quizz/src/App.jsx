import React, { useState, useEffect } from 'react';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: ''
  });
  const [timer, setTimer] = useState(60);
  const [resultShown, setResultShown] = useState(false);

  useEffect(() => {
    if (currentQuestion < 4) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (timer === 0 && currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(60);
    }
  }, [timer, currentQuestion]);

  const Reponsechanger = (event) => {
    const { id, value } = event.target;
    setAnswers({ ...answers, [id]: value });
  };

  const Reponseenvoyer = (event) => {
    event.preventDefault();
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(60);
    } else {
      setResultShown(true);
    }
  };

  const rendrequestion = (questionNumber, questionText) => {
    return (
      <div>
        <label htmlFor={`q${questionNumber}`}>{questionText}</label>
        <input type="text" id={`q${questionNumber}`} value={answers[`q${questionNumber}`]} onChange={Reponsechanger} />
        <button type="submit">Soumettre</button>
        <p>Temps restant : {timer} secondes</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Quiz</h1>
      <form onSubmit={Reponseenvoyer}>
        {currentQuestion === 1 && rendrequestion(1, 'Question 1: Quelle est la capitale de la France ?')}
        {currentQuestion === 2 && rendrequestion(2, 'Question 2: Combien fait 1-1 ?')}
        {currentQuestion === 3 && rendrequestion(3, 'Question 3: Combien font 2 + 2 ?')}
        {currentQuestion === 4 && !resultShown && <button type="submit">Voir les résultats</button>}
      </form>
      {resultShown && (
        <div>
          <h2>Résultats</h2>
          <p>Question 1: Quelle est la capitale de la France ? - Réponse: {answers.q1}</p>
          <p>Question 2: Combien fait 1-1 ? - Réponse: {answers.q2}</p>
          <p>Question 3: Combien font 2 + 2 ? - Réponse: {answers.q3}</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
