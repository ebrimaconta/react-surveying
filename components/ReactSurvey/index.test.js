import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ReactSurvey } from '.';

describe('ReactSurvey', () => {
  const question = 'What is your favorite color?';
  const answers = [
    { option: 'Red', votes: 0 },
    { option: 'Blue', votes: 0 },
  ];
  const customStyles = {
    theme: 'purple',
    align: 'center',
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: 'black',
  };
  const onVote = jest.fn();
  const disable = false;

  it('renders the component correctly', () => {
    const { getByText, getByRole } = render(
      <ReactSurvey
        question={question}
        answers={answers}
        onVote={onVote}
        customStyles={customStyles}
        disable={disable}
      />
    );
    const redButton = getByRole('button', { name: 'Red' });
    const blueButton = getByRole('button', { name: 'Blue' });
    const questionElement = getByText(question);

    expect(redButton).toBeInTheDocument();
    expect(blueButton).toBeInTheDocument();
    expect(questionElement).toBeInTheDocument();
  });

  it('triggers the vote function when an option is clicked', () => {
    const { getByText } = render(
      <ReactSurvey
        question={question}
        answers={answers}
        onVote={onVote}
        customStyles={customStyles}
        disable={disable}
      />
    );

    fireEvent.click(getByText(answers[0].option));
    expect(onVote).toHaveBeenCalledTimes(1);
  });
});
