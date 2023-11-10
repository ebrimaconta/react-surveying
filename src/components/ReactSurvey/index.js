import React, { useState, useEffect } from 'react';

import './index.css';
import 'animate.css';

const themes = {
  purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
  red: ['#E23D3D', '#EF4545', '#FF28283B'],
  blue: ['#5674E0', '#5674E0', '#5674E03B'],
  black: ['#303030', '#303030', '#3030303B'],
  white: ['#ffffff', '#ffffff', '#ffffff3B'],
  cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B'],
};

export const ReactSurvey = ({
  question,
  answers,
  onVote,
  noStorage,
  customStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'black',
  },
  disable = false,
}) => {
  const [totalVotes, setTotalVotes] = useState(0);
  const [voted, setVoted] = useState(false);

  const calculatePercent = (votes, total) => {
    if (votes === 0 && total === 0) {
      return '0%';
    }
    return `${parseInt((votes / total) * 100, 10)}%`;
  };

  const alignPoll = (customAlign) => {
    if (customAlign === 'left') {
      return 'flex-start';
    } else if (customAlign === 'right') {
      return 'flex-end';
    } else {
      return 'center';
    }
  };
  const obtainColors = (customTheme) => {
    const colors = themes[customTheme];
    if (!colors) {
      return themes['black'];
    }
    return colors;
  };

  const colors = obtainColors(customStyles.theme);

  const setPollVote = (selectedAnswer) => {
    setVoted(true);
    
  };

  const checkVote = () => {
    const storage = getStoragePolls();
    const answer = storage.filter((answer) => answer.question === question && answer.url === window.location.href);

    if (answer.length) {
      setPollVote(answer[0].option);
    }
  };

  useEffect(() => {
    if (!noStorage) checkVote();
  }, []);

  const getStoragePolls = () => JSON.parse(localStorage.getItem('react-polls')) || [];
  const vote = (answer) => {
    if (voted === false) {
      setTotalVotes(totalVotes + 1);
      setVoted(!voted);
      if (!noStorage) {
        const storage = getStoragePolls();
        storage.push({
          url: window.location.href,
          question: question,
          option: answer,
        });
        localStorage.setItem('react-polls', JSON.stringify(storage));
      }
    }
    onVote(answer);
  };

  return (
    <article
      className={`animate__animated animate__fadeIn animate__faster poll`}
      style={{
        textAlign: customStyles.align,
        alignItems: alignPoll(customStyles.align),
      }}
    >
      <h3
        className='question'
        style={{
          borderWidth: customStyles.questionSeparator ? '1px' : '0',
          alignSelf: customStyles.questionSeparatorWidth === 'question' ? 'center' : 'stretch',
          fontWeight: customStyles.questionBold ? 'bold' : 'normal',
          color: customStyles.questionColor,
        }}
      >
        {question}
      </h3>
      <ul className='answers'>
        {answers.map((answer) => (
          <li key={answer.option}>
            {!voted ? (
              <button
                className={`animate__animated  animate__fadeIn animate__faster  option ${customStyles.theme}`}
                style={{ color: colors[0], borderColor: colors[1] }}
                type='button'
                onClick={(e) => vote(answer.option)}
                aria-label={answer.option}
              >
                {answer.option}
              </button>
            ) : (
              <div
                className={`animate__animated animate__fadeIn animate__faster result`}
                style={{ color: colors[0], borderColor: colors[1] }}
              >
                <div
                  className='fill'
                  style={{
                    width: calculatePercent(answer.votes, totalVotes),
                    backgroundColor: colors[2],
                  }}
                />
                <div className='label'>
                  <span className='percent' style={{ color: colors[0] }}>
                    {calculatePercent(answer.votes, totalVotes)}
                  </span>
                  <span className={`answer ${voted ? 'vote' : ''}`} style={{ color: colors[0] }}>
                    {answer.option}
                  </span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className='votes'>{`${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`}</p>
    </article>
  );
};
