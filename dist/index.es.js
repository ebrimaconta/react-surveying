import React, { useState, useEffect } from 'react';

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

var css_248z = ".poll{align-items:center;border-radius:5px;display:flex;flex-direction:column;font-family:inherit;padding:10px}.poll *{box-sizing:border-box}.poll .question{border-bottom:1px solid #6d4b943b;color:#3a3a3a;font-weight:400;margin:0;padding-bottom:3px;text-align:inherit}.poll .answers{align-items:center;display:flex;flex-direction:column;justify-content:center;list-style:none;padding:0}.poll .answers,.poll .answers li{margin:5px 0;width:100%}.poll .answers .option,.poll .answers .result{background-color:inherit;border:2px solid #000;border-radius:5px;cursor:pointer;font-family:inherit;font-size:100%;font-weight:700;line-height:1.15;margin:0;outline:0;padding:10px;transition:all .3s ease;width:100%}.poll .answers .option:active,.poll .answers .option:hover{background:#3030303b}.poll .answers .option.purple:active,.poll .answers .option.purple:hover{background:#6d4b943b}.poll .answers .option.red:active,.poll .answers .option.red:hover{background:#ff28283b}.poll .answers .option.blue:active,.poll .answers .option.blue:hover{background:#283eff3b}.poll .answers .option.white:active,.poll .answers .option.white:hover{background:#ffffff3b}.poll .answers .option.cyan:active,.poll .answers .option.cyan:hover{background:#00bcdd3b}.poll .answers .result{cursor:default;height:42px;padding:0;position:relative}.poll .answers .result .fill{align-items:center;border-radius:3px;display:flex;margin-top:10px;transition:all .5s ease;width:0}.poll .answers .result .labels{font-size:16px;margin:0 10px;position:absolute;top:10px}.poll .answers .result .answer{margin-left:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.poll .answers .result .answer.vote:after{content:\" \\2713\"}.poll .votes{color:#3030305e;font-size:13px;margin:0;padding:0;text-align:inherit}";
styleInject(css_248z);

const themes = {
    purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
    red: ['#E23D3D', '#EF4545', '#FF28283B'],
    blue: ['#5674E0', '#5674E0', '#5674E03B'],
    black: ['#303030', '#303030', '#3030303B'],
    white: ['#ffffff', '#ffffff', '#ffffff3B'],
    cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B'],
};
const ReactSurvey = ({ question, answers, onVote, userEmail = '', listVoted = [], customStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'black',
}, disable = false, }) => {
    const [totalVotes, setTotalVotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const calculatePercent = (votes, total) => {
        if (votes === 0 && total === 0) {
            return '0%';
        }
        return `${Math.round((votes / total) * 100)}%`;
    };
    const alignPoll = (customAlign) => {
        if (customAlign === 'left') {
            return 'flex-start';
        }
        else if (customAlign === 'right') {
            return 'flex-end';
        }
        else {
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
    useEffect(() => {
        setTotalVotes(answers.reduce((total, answer) => total + answer.votes, 0));
    }, []);
    const vote = () => {
        if (!disable) {
            setTotalVotes(totalVotes + 1);
            setVoted(!voted);
        }
    };
    const checkIfVoted = listVoted.includes(userEmail);
    return (React.createElement("article", { className: `animate__animated animate__fadeIn animate__faster poll`, style: {
            textAlign: customStyles.align,
            alignItems: alignPoll(customStyles.align),
        } },
        React.createElement("h3", { className: 'question', style: {
                borderWidth: customStyles.questionSeparator ? '1px' : '0',
                alignSelf: customStyles.questionSeparatorWidth === 'question' ? 'center' : 'stretch',
                fontWeight: customStyles.questionBold ? 'bold' : 'normal',
                color: customStyles.questionColor,
            } }, question),
        React.createElement("ul", { className: 'answers' }, answers.map((answer) => (React.createElement("li", { key: answer.option }, !checkIfVoted ? (React.createElement("button", { className: `animate__animated  animate__fadeIn animate__faster  option ${customStyles.theme}`, style: { color: colors[0], borderColor: colors[1] }, type: 'button', onClick: (e) => {
                onVote(answer);
                vote();
            }, "aria-label": answer.option, disabled: disable }, answer.option)) : (React.createElement("div", { className: `animate__animated animate__fadeIn animate__faster result`, style: { color: colors[0], borderColor: colors[1], padding: '0px 15px' } },
            React.createElement("div", { className: 'fill', style: {
                    width: calculatePercent(answer.votes, totalVotes),
                    backgroundColor: colors[2],
                } }),
            React.createElement("div", { className: 'label' },
                React.createElement("span", { className: 'percent', style: { color: colors[0] } }, calculatePercent(answer.votes, totalVotes)),
                React.createElement("span", { className: `answer ${voted ? 'vote' : ''}`, style: { color: colors[0] } }, answer.option)))))))),
        React.createElement("p", { className: 'votes' }, `${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`)));
};

export { ReactSurvey };
//# sourceMappingURL=index.es.js.map
