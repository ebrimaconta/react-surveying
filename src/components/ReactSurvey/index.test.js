import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ReactSurvey } from '../ReactSurvey';

describe('ReactSurvey', () => {
  const question = 'What is your favorite color?';
  const answers = [
    { option: 'Red', votes: 4 },
    { option: 'Blue', votes: 5 },
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
  it('renders the component as disabled when disable prop is true', () => {
    const question = 'How do you feel today?';
    const answers = [
      { option: 'Happy', votes: 0 },
      { option: 'Sad', votes: 0 },
    ];
    const onVoteMock = jest.fn();

    const { getByText } = render(
      <ReactSurvey
        question={question}
        answers={answers}
        onVote={onVoteMock}
        disable={true} // Set disable to true
      />
    );

    // Check that the buttons are not clickable
    answers.forEach((answer) => {
      const button = getByText(answer.option);
      expect(button).toBeDisabled();
    });

    // Attempt to click the button and verify that onVoteMock is not called
    answers.forEach((answer) => {
      const button = getByText(answer.option);
      fireEvent.click(button);
      expect(onVoteMock).not.toHaveBeenCalled();
    });
  });
  it('increases vote count when a user clicks on an option', () => {
    const question = 'How do you feel today?';
    const answers = [
      { option: 'Happy', votes: 0 },
      { option: 'Sad', votes: 0 },
    ];
    const onVoteMock = jest.fn();

    const { getByText } = render(<ReactSurvey question={question} answers={answers} onVote={onVoteMock} />);

    // Click on the "Happy" option
    const happyButton = getByText('Happy');
    fireEvent.click(happyButton);

    // Check that the onVoteMock is called with the correct argument
    expect(onVoteMock).toHaveBeenCalledWith(answers[0]);

    // Check that the vote count has increased
    const votesText = getByText('1 vote');
    expect(votesText).toBeInTheDocument();
  });
});
