'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var animate = _interopDefault(require('../../node_modules/animate.css/animate.css'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".index_poll__2yY-U {\n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    font-family: inherit;\n    padding: 10px;\n}\n\n.index_poll__2yY-U * {\n    box-sizing: border-box;\n}\n\n.index_poll__2yY-U .index_question__BzHoV {\n    color: #3a3a3a;\n    text-align: inherit;\n    font-weight: normal;\n    margin: 0;\n    padding-bottom: 3px;\n    border-bottom: 1px solid #6d4b943b;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    margin: 5px 0;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc li {\n    width: 100%;\n    margin: 5px 0;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm,\n.index_poll__2yY-U .index_answers__go1Gc .index_result__1E2_8 {\n    font-weight: bold;\n    border: 2px solid #000000;\n    border-radius: 5px;\n    cursor: pointer;\n    width: 100%;\n    font-size: 100%;\n    line-height: 1.15;\n    margin: 0;\n    padding: 10px;\n    transition: all 0.3s ease;\n    outline: 0;\n    font-family: inherit;\n    background-color: inherit;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm:hover,\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm:active {\n    background: #3030303B;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_purple__1VjHW:hover,\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_purple__1VjHW:active {\n    background: #6d4b943B;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_red__w1X4P:hover,\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_red__w1X4P:active {\n    background: #FF28283B;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_blue__YvkSO:hover,\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_blue__YvkSO:active {\n    background: #283EFF3B;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_white__5BFdc:hover,\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_white__5BFdc:active {\n    background: #ffffff3B;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_cyan__2im9v:hover,\n.index_poll__2yY-U .index_answers__go1Gc .index_option__3YPIm.index_cyan__2im9v:active {\n    background: #00BCDD3B;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_result__1E2_8 {\n    height: 42px;\n    padding: 0;\n    cursor: default;\n    position: relative;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_result__1E2_8 .index_fill__2l7Nj {\n    width: 0%;\n    height: 100%;\n    border-radius: 3px;\n    display: flex;\n    align-items: center;\n    transition: all 0.5s ease;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_result__1E2_8 .index_labels__1uI5z {\n    position: absolute;\n    top: calc(19px - 9px);\n    margin: 0 10px;\n    font-size: 16px;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_result__1E2_8 .index_answer__2yafV {\n    margin-left: 15px;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n}\n\n.index_poll__2yY-U .index_answers__go1Gc .index_result__1E2_8 .index_answer__2yafV.index_vote__gKXll::after {\n    content: ' \\2713';\n}\n\n.index_poll__2yY-U .index_votes__1GglY {\n    text-align: inherit;\n    margin: 0;\n    padding: 0;\n    font-size: 13px;\n    color: #3030305e;\n}";
var styles = {"poll":"index_poll__2yY-U","question":"index_question__BzHoV","answers":"index_answers__go1Gc","option":"index_option__3YPIm","result":"index_result__1E2_8","purple":"index_purple__1VjHW","red":"index_red__w1X4P","blue":"index_blue__YvkSO","white":"index_white__5BFdc","cyan":"index_cyan__2im9v","fill":"index_fill__2l7Nj","labels":"index_labels__1uI5z","answer":"index_answer__2yafV","vote":"index_vote__gKXll","votes":"index_votes__1GglY"};
styleInject(css);

const themes = {
  purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
  red: ['#E23D3D', '#EF4545', '#FF28283B'],
  blue: ['#5674E0', '#5674E0', '#5674E03B'],
  black: ['#303030', '#303030', '#3030303B'],
  white: ['#ffffff', '#ffffff', '#ffffff3B'],
  cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B']
};
const ReactSurvey = ({
  question,
  answers,
  onVote,
  customStyles,
  disable
}) => {
  const [pollData, setPollData] = React.useState({
    poll: {
      voted: false,
      option: ''
    },
    totalVotes: answers.reduce((total, answer) => total + answer.votes, 0)
  });
  const calculatePercent = (votes, total) => {
    if (votes === 0 && total === 0) {
      return '0%';
    }
    return `${parseInt(votes / total * 100)}%`;
  };
  const alignPoll = customAlign => {
    if (customAlign === 'left') {
      return 'flex-start';
    } else if (customAlign === 'right') {
      return 'flex-end';
    } else {
      return 'center';
    }
  };
  const obtainColors = customTheme => {
    const colors = themes[customTheme];
    if (!colors) {
      return themes['black'];
    }
    return colors;
  };
  const colors = obtainColors(customStyles.theme);
  const setPollVote = selectedAnswer => {
    const optionsOnly = answers.map(item => item.option);
    if (optionsOnly.includes(selectedAnswer)) {
      const {
        poll,
        totalVotes
      } = pollData;
      const updatedPoll = {
        ...poll,
        voted: true,
        option: selectedAnswer
      };
      if (!disable) {
        if (!vote) {
          setPollData({
            poll: updatedPoll,
            totalVotes: totalVotes + 1
          });
        } else {
          setPollData({
            poll: updatedPoll
          });
        }
      }
    }
  };
  const vote = answer => {
    setPollVote(answer);
    onVote(answer);
  };
  return /*#__PURE__*/React__default.createElement("article", {
    className: `${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.poll}`,
    style: {
      textAlign: customStyles.align,
      alignItems: alignPoll(customStyles.align)
    }
  }, /*#__PURE__*/React__default.createElement("h3", {
    className: styles.question,
    style: {
      borderWidth: customStyles.questionSeparator ? '1px' : '0',
      alignSelf: customStyles.questionSeparatorWidth === 'question' ? 'center' : 'stretch',
      fontWeight: customStyles.questionBold ? 'bold' : 'normal',
      color: customStyles.questionColor
    }
  }, question), /*#__PURE__*/React__default.createElement("ul", {
    className: styles.answers
  }, answers.map(answer => /*#__PURE__*/React__default.createElement("li", {
    key: answer.option
  }, !poll.voted ? /*#__PURE__*/React__default.createElement("button", {
    className: `${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.option} ${styles[customStyles.theme]}`,
    style: {
      color: colors[0],
      borderColor: colors[1]
    },
    type: "button",
    onClick: () => vote(answer.option)
  }, answer.option) : /*#__PURE__*/React__default.createElement("div", {
    className: `${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.result}`,
    style: {
      color: colors[0],
      borderColor: colors[1]
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles.fill,
    style: {
      width: calculatePercent(answer.votes, totalVotes),
      backgroundColor: colors[2]
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles.labels
  }, /*#__PURE__*/React__default.createElement("span", {
    className: styles.percent,
    style: {
      color: colors[0]
    }
  }, calculatePercent(answer.votes, totalVotes)), /*#__PURE__*/React__default.createElement("span", {
    className: `${styles.answer} ${answer.option === poll.option ? styles.vote : ''}`,
    style: {
      color: colors[0]
    }
  }, answer.option)))))), /*#__PURE__*/React__default.createElement("p", {
    className: styles.votes
  }, `${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`));
};

exports.ReactSurvey = ReactSurvey;
//# sourceMappingURL=index.js.map
