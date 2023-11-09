import React, { useState } from 'react';
import animate from 'animate.css';
import styles from './index.css';

const themes = {
  purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
  red: ['#E23D3D', '#EF4545', '#FF28283B'],
  blue: ['#5674E0', '#5674E0', '#5674E03B'],
  black: ['#303030', '#303030', '#3030303B'],
  white: ['#ffffff', '#ffffff', '#ffffff3B'],
  cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B'],
};

export const ReactSurvey = ({ question, answers, onVote, customStyles, disable }) => {
  const [pollData, setPollData] = useState({
    poll: {
      voted: false,
      option: '',
    },
    totalVotes: answers.reduce((total, answer) => total + answer.votes, 0),
  });

  const calculatePercent = (votes, total) => {
    if (votes === 0 && total === 0) {
      return '0%';
    }
    return `${parseInt((votes / total) * 100)}%`;
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
    const optionsOnly = answers.map((item) => item.option);

    if (optionsOnly.includes(selectedAnswer)) {
      const { poll, totalVotes } = pollData;
      const updatedPoll = {
        ...poll,
        voted: true,
        option: selectedAnswer,
      };

      if (!disable) {
        if (!vote) {
          setPollData({
            poll: updatedPoll,
            totalVotes: totalVotes + 1,
          });
        } else {
          setPollData({
            poll: updatedPoll,
          });
        }
      }
    }
  };

  const vote = (answer) => {
    setPollVote(answer);
    onVote(answer);
  };
  const { poll, totalVotes } = pollData;
  return (
    <article
      className={`${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.poll}`}
      style={{
        textAlign: customStyles.align,
        alignItems: alignPoll(customStyles.align),
      }}
    >
      <h3
        className={styles.question}
        style={{
          borderWidth: customStyles.questionSeparator ? '1px' : '0',
          alignSelf: customStyles.questionSeparatorWidth === 'question' ? 'center' : 'stretch',
          fontWeight: customStyles.questionBold ? 'bold' : 'normal',
          color: customStyles.questionColor,
        }}
      >
        {question}
      </h3>
      <ul className={styles.answers}>
        {answers.map((answer) => (
          <li key={answer.option}>
            {!poll.voted ? (
              <button
                className={`${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.option} ${
                  styles[customStyles.theme]
                }`}
                style={{ color: colors[0], borderColor: colors[1] }}
                type='button'
                onClick={() => vote(answer.option)}
                aria-label={answer.option}
              >
                {answer.option}
              </button>
            ) : (
              <div
                className={`${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.result}`}
                style={{ color: colors[0], borderColor: colors[1] }}
              >
                <div
                  className={styles.fill}
                  style={{
                    width: calculatePercent(answer.votes, totalVotes),
                    backgroundColor: colors[2],
                  }}
                />
                <div className={styles.labels}>
                  <span className={styles.percent} style={{ color: colors[0] }}>
                    {calculatePercent(answer.votes, totalVotes)}
                  </span>
                  <span
                    className={`${styles.answer} ${answer.option === poll.option ? styles.vote : ''}`}
                    style={{ color: colors[0] }}
                  >
                    {answer.option}
                  </span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className={styles.votes}>{`${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`}</p>
    </article>
  );
};
