'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

var css = ".poll{border-radius:5px;display:flex;flex-direction:column;align-items:center;font-family:inherit;padding:10px}.poll *{box-sizing:border-box}.poll .question{color:#3a3a3a;text-align:inherit;font-weight:400;margin:0;padding-bottom:3px;border-bottom:1px solid #6d4b943b}.poll .answers{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;margin:5px 0}.poll .answers li{width:100%;margin:5px 0}.poll .answers .option,.poll .answers .result{font-weight:700;border:2px solid #000;border-radius:5px;cursor:pointer;width:100%;font-size:100%;line-height:1.15;margin:0;padding:10px;transition:all .3s ease;outline:0;font-family:inherit;background-color:inherit}.poll .answers .option:active,.poll .answers .option:hover{background:#3030303B}.poll .answers .option.purple:active,.poll .answers .option.purple:hover{background:#6d4b943B}.poll .answers .option.red:active,.poll .answers .option.red:hover{background:#FF28283B}.poll .answers .option.blue:active,.poll .answers .option.blue:hover{background:#283EFF3B}.poll .answers .option.white:active,.poll .answers .option.white:hover{background:#ffffff3B}.poll .answers .option.cyan:active,.poll .answers .option.cyan:hover{background:#00BCDD3B}.poll .answers .result{height:42px;padding:0;cursor:default;position:relative}.poll .answers .result .fill{width:0;margin-top:10px;border-radius:3px;display:flex;align-items:center;transition:all .5s ease}.poll .answers .result .labels{position:absolute;top:10px;margin:0 10px;font-size:16px}.poll .answers .result .answer{margin-left:15px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.poll .answers .result .answer.vote:after{content:\" \\2713\"}.poll .votes{text-align:inherit;margin:0;padding:0;font-size:13px;color:#3030305e}";
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
  userEmail = '',
  listVoted = [],
  customStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'black'
  },
  disable = false
}) => {
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [voted, setVoted] = React.useState(false);
  const calculatePercent = (votes, total) => {
    if (votes === 0 && total === 0) {
      return '0%';
    }
    return `${parseInt(votes / total * 100, 10)}%`;
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
  React.useEffect(() => {
    setTotalVotes(answers.reduce((total, answer) => total + answer.votes, 0));
  }, []);
  const vote = () => {
    if (!disable) {
      setTotalVotes(totalVotes + 1);
      setVoted(!voted);
    }
  };
  const checkIfVoted = listVoted.includes(userEmail);
  return /*#__PURE__*/React__default.createElement("article", {
    className: `animate__animated animate__fadeIn animate__faster poll`,
    style: {
      textAlign: customStyles.align,
      alignItems: alignPoll(customStyles.align)
    }
  }, /*#__PURE__*/React__default.createElement("h3", {
    className: "question",
    style: {
      borderWidth: customStyles.questionSeparator ? '1px' : '0',
      alignSelf: customStyles.questionSeparatorWidth === 'question' ? 'center' : 'stretch',
      fontWeight: customStyles.questionBold ? 'bold' : 'normal',
      color: customStyles.questionColor
    }
  }, question), /*#__PURE__*/React__default.createElement("ul", {
    className: "answers"
  }, answers.map(answer => /*#__PURE__*/React__default.createElement("li", {
    key: answer.option
  }, !checkIfVoted ? /*#__PURE__*/React__default.createElement("button", {
    className: `animate__animated  animate__fadeIn animate__faster  option ${customStyles.theme}`,
    style: {
      color: colors[0],
      borderColor: colors[1]
    },
    type: "button",
    onClick: e => {
      onVote(answer);
      vote(answer.option);
    },
    "aria-label": answer.option,
    disabled: disable
  }, answer.option) : /*#__PURE__*/React__default.createElement("div", {
    className: `animate__animated animate__fadeIn animate__faster result`,
    style: {
      color: colors[0],
      borderColor: colors[1],
      padding: '0px 15px'
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "fill",
    style: {
      width: calculatePercent(answer.votes, totalVotes),
      backgroundColor: colors[2]
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "label"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "percent",
    style: {
      color: colors[0]
    }
  }, calculatePercent(answer.votes, totalVotes)), /*#__PURE__*/React__default.createElement("span", {
    className: `answer ${voted ? 'vote' : ''}`,
    style: {
      color: colors[0]
    }
  }, answer.option)))))), /*#__PURE__*/React__default.createElement("p", {
    className: "votes"
  }, `${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`));
};

exports.ReactSurvey = ReactSurvey;
//# sourceMappingURL=index.js.map
