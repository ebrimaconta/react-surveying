import React, { useState, useEffect } from 'react';

import './index.css';

type ThemeColor = [string, string, string];

interface Themes {
  [key: string]: ThemeColor;
}

const themes: Themes = {
  purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
  red: ['#E23D3D', '#EF4545', '#FF28283B'],
  blue: ['#5674E0', '#5674E0', '#5674E03B'],
  black: ['#303030', '#303030', '#3030303B'],
  white: ['#ffffff', '#ffffff', '#ffffff3B'],
  cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B'],
};
interface Answer {
  option: string;
  votes: number;
}

interface ReactSurveyProps {
  question: string;
  answers: Answer[];
  onVote: (answer: Answer) => void;
  customStyles?: {
    questionSeparator: boolean;
    questionSeparatorWidth: 'question' | 'stretch';
    questionBold: boolean;
    questionColor: string;
    align: 'left' | 'right' | 'center';
    theme: 'purple' | 'red' | 'blue' | 'black' | 'white' | 'cyan';
  };
  disable?: boolean;
  vote: boolean;
}

export const ReactSurvey: React.FC<ReactSurveyProps> = ({
  question,
  answers,
  onVote,
  customStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'black',
  },
  disable = false,
  vote,
}) => {
  const [totalVotes, setTotalVotes] = useState(0);

  const calculatePercent = (votes: number, total: number): string => {
    if (votes === 0 && total === 0) {
      return '0%';
    }
    const percentage = Math.round((votes / total) * 100);
    const clampedPercentage = Math.min(percentage, 100);

    return `${clampedPercentage}%`;
  };

  const alignPoll = (customAlign: string) => {
    if (customAlign === 'left') {
      return 'flex-start';
    } else if (customAlign === 'right') {
      return 'flex-end';
    } else {
      return 'center';
    }
  };
  const obtainColors = (customTheme: string) => {
    const colors = themes[customTheme];
    if (!colors) {
      return themes['black'];
    }
    return colors;
  };

  const colors = obtainColors(customStyles.theme);

  useEffect(() => {
    setTotalVotes(answers.reduce((total, answer) => total + answer.votes, 0));
  }, []);

  const votedHandler = () => {
    if (!disable && !vote) {
      setTotalVotes(totalVotes + 1);
    }
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
        {answers.map((answer: { option: string; votes: number }) => (
          <li key={answer.option}>
            {!vote ? (
              <button
                className={`animate__animated  animate__fadeIn animate__faster  option ${customStyles.theme}`}
                style={{ color: colors[0], borderColor: colors[1] }}
                type='button'
                onClick={(e) => {
                  onVote(answer);
                  votedHandler();
                }}
                aria-label={answer.option}
                disabled={disable}
              >
                {answer.option}
              </button>
            ) : (
              <div
                className={`animate__animated animate__fadeIn animate__faster result`}
                style={{ color: colors[0], borderColor: colors[1], padding: '0px 15px' }}
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
                  <span className={`answer ${vote ? 'vote' : ''}`} style={{ color: colors[0] }}>
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
