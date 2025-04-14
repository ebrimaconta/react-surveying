import React, { useState, useEffect, useCallback, useMemo } from 'react';

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

type Theme = keyof typeof themes;
type Alignment = 'left' | 'right' | 'center';
type SeparatorWidth = 'question' | 'stretch';

interface CustomStyles {
  questionSeparator: boolean;
  questionSeparatorWidth: SeparatorWidth;
  questionBold: boolean;
  questionColor: string;
  align: Alignment;
  theme: Theme;
}

interface ReactSurveyProps {
  question: string;
  answers: Answer[];
  onVote: (answer: Answer) => void;
  customStyles?: Partial<CustomStyles>;
  disable?: boolean;
  vote: boolean;
}

const DEFAULT_STYLES: CustomStyles = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: true,
  questionColor: '#303030',
  align: 'center',
  theme: 'black',
};

export const ReactSurvey: React.FC<ReactSurveyProps> = ({
  question,
  answers,
  onVote,
  customStyles = DEFAULT_STYLES,
  disable = false,
  vote,
}) => {
  const [totalVotes, setTotalVotes] = useState(0);

  const mergedStyles = useMemo(() => ({ ...DEFAULT_STYLES, ...customStyles }), [customStyles]);

  const calculatePercent = useCallback((votes: number, total: number): string => {
    if (votes === 0 && total === 0) return '0%';
    const percentage = Math.round((votes / total) * 100);
    return `${Math.min(percentage, 100)}%`;
  }, []);

  const alignPoll = useCallback((customAlign: Alignment): string => {
    switch (customAlign) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  }, []);

  const obtainColors = useCallback((customTheme: Theme): ThemeColor => {
    return themes[customTheme] || themes.black;
  }, []);

  const colors = useMemo(() => obtainColors(mergedStyles.theme), [mergedStyles.theme, obtainColors]);

  useEffect(() => {
    setTotalVotes(answers.reduce((total, answer) => total + answer.votes, 0));
  }, [answers]);

  const handleVote = useCallback(() => {
    if (!disable && !vote) {
      setTotalVotes((prev) => prev + 1);
    }
  }, [disable, vote]);

  const handleAnswerClick = useCallback(
    (answer: Answer) => {
      onVote(answer);
      handleVote();
    },
    [onVote, handleVote]
  );

  return (
    <article
      className='animate__animated animate__fadeIn animate__faster poll'
      style={{
        textAlign: mergedStyles.align,
        alignItems: alignPoll(mergedStyles.align),
      }}
    >
      <h3
        className='question'
        style={{
          borderWidth: mergedStyles.questionSeparator ? '1px' : '0',
          alignSelf: mergedStyles.questionSeparatorWidth === 'question' ? 'center' : 'stretch',
          fontWeight: mergedStyles.questionBold ? 'bold' : 'normal',
          color: mergedStyles.questionColor,
        }}
      >
        {question}
      </h3>
      <ul className='answers'>
        {answers.map((answer) => (
          <li key={answer.option}>
            {!vote ? (
              <button
                className={`animate__animated animate__fadeIn animate__faster option ${mergedStyles.theme}`}
                style={{ color: colors[0], borderColor: colors[1] }}
                type='button'
                onClick={() => handleAnswerClick(answer)}
                aria-label={answer.option}
                disabled={disable}
              >
                {answer.option}
              </button>
            ) : (
              <div
                className='animate__animated animate__fadeIn animate__faster result'
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
