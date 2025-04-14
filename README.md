# React Surveying

A modern, customizable polling component for React applications that allows users to create and participate in interactive polls with various styling options.

## Features

- 🎨 Multiple theme options (purple, red, blue, black, white, cyan)
- 📱 Fully responsive design
- ⚡ Smooth animations
- 🎯 Customizable styling
- 🔒 TypeScript support
- 📊 Real-time vote counting
- 🎭 Support for both voting and results display

## Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install react-surveying

# Using yarn
yarn add react-surveying
```

## Basic Usage

Here's a simple example of how to use React Surveying in your application:

```jsx
import React, { useState } from 'react';
import { ReactSurvey } from 'react-surveying';

interface Answer {
  option: string;
  votes: number;
}

const App = () => {
  const question = 'What is your favorite color?';
  const [vote, setVote] = useState(false);
  const [poll, setPoll] = useState({
    pollAnswers: [
      { option: 'Red', votes: 19 },
      { option: 'Blue', votes: 0 },
      { option: 'Green', votes: 5 },
    ],
  });

  const handleVote = (voteAnswer: Answer) => {
    const { pollAnswers } = poll;
    const newPollAnswers = pollAnswers.map((answer) => {
      if (answer.option === voteAnswer.option) {
        return { ...answer, votes: answer.votes + 1 };
      }
      return answer;
    });

    setVote(true);
    setPoll({
      pollAnswers: newPollAnswers,
    });
  };

  return <ReactSurvey vote={vote} question={question} answers={poll.pollAnswers} onVote={handleVote} />;
};

export default App;
```

## Props

| Prop           | Type                     | Required | Default   | Description                                    |
| -------------- | ------------------------ | -------- | --------- | ---------------------------------------------- |
| `question`     | string                   | Yes      | -         | The poll question to display                   |
| `answers`      | Answer[]                 | Yes      | -         | Array of answer options with their vote counts |
| `onVote`       | (answer: Answer) => void | Yes      | -         | Callback function when a vote is cast          |
| `vote`         | boolean                  | Yes      | -         | Whether the user has already voted             |
| `disable`      | boolean                  | No       | false     | Whether the poll is disabled                   |
| `customStyles` | CustomStyles             | No       | See below | Custom styling options                         |

### CustomStyles Interface

```typescript
interface CustomStyles {
  questionSeparator: boolean; // Show separator line under question
  questionSeparatorWidth: 'question' | 'stretch'; // Width of separator
  questionBold: boolean; // Make question text bold
  questionColor: string; // Question text color
  align: 'left' | 'right' | 'center'; // Text alignment
  theme: 'purple' | 'red' | 'blue' | 'black' | 'white' | 'cyan'; // Color theme
}
```

## Advanced Usage

### Custom Styling Example

```jsx
<ReactSurvey
  question='What is your favorite programming language?'
  answers={[
    { option: 'JavaScript', votes: 25 },
    { option: 'Python', votes: 18 },
    { option: 'TypeScript', votes: 12 },
  ]}
  onVote={handleVote}
  vote={vote}
  customStyles={{
    questionSeparator: true,
    questionSeparatorWidth: 'stretch',
    questionBold: true,
    questionColor: '#333333',
    align: 'center',
    theme: 'purple',
  }}
/>
```
