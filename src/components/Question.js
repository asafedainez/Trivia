import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUserScore } from '../services/localStorage';
import { addAssertion, addScore } from '../redux/actions/actions';
import './questions.css';
import he from 'he';

const ONE_SECOND = 1000;
const CORRECT_ANSWER = 'correct-answer';
const THIRTY_SECONDS = 30;
const DIFFICULTY_SCORE = {
	hard: 3, medium: 2, easy: 1,
};
const BASE_SCORE = 10;

class Question extends Component {
	state = {
		timePerQuestion: 30,
		answers: [],
		isShuffled: false,
	};

	interval = undefined;

	componentDidMount = () => {
		this.interval = setInterval(() => {
			const { timePerQuestion } = this.state;
			if (timePerQuestion !== 0) {
				this.setState((prevState) => ({
					timePerQuestion: prevState.timePerQuestion - 1,
				}));
			}
		}, ONE_SECOND);
	};

	componentWillUnmount = () => { clearInterval(this.interval); };

	setThirdySeconds = () => {
		this.setState({
			timePerQuestion: THIRTY_SECONDS,
			isShuffled: false,
		});
	};

	renderBooleanAlternatives = () => {
		const {
			questionData: { correct_answer: correctAnswer },
			disabledOptions,
		} = this.props;
		let valueTRUE = false;
		let valueFALSE = false;

		if (correctAnswer === 'True') {
			valueTRUE = true;
		} else {
			valueFALSE = true;
		}
		return (
			<>
				<button
					type="button"
					value={ valueTRUE }
					data-testid={ valueTRUE ? CORRECT_ANSWER : 'wrong-answer-0' }
					className="alternative"
					onClick={ this.handleVerifyAssertation }
					disabled={ disabledOptions }
				>
          TRUE
				</button>
				<button
					type="button"
					value={ valueFALSE }
					data-testid={ valueFALSE ? CORRECT_ANSWER : 'wrong-answer-0' }
					className="alternative"
					onClick={ this.handleVerifyAssertation }
					disabled={ disabledOptions }
				>
          FALSE
				</button>
			</>
		);
	};

	shuffleArray = (answers) => {
		const { isShuffled } = this.state;
		if (!isShuffled) {
			answers.forEach((answer, index) => {
				const randomIndex = Math.floor(Math.random() * (index + 1));
				const tmpElement = answer;
				answers[index] = answers[randomIndex];
				answers[randomIndex] = tmpElement;
			});
			this.setState({
				answers,
				isShuffled: true,
			});
		}
	};

	renderMultipleAlternatives = () => {
		const INITIAL_WRONG_ANSWER_ID = 0;
		const TRUE = true;
		const { answers } = this.state;
		const { questionData: {
			correct_answer: correctAnswer,
			incorrect_answers: incorrectAnswers }, disabledOptions } = this.props;
		this.shuffleArray([...incorrectAnswers, correctAnswer]);
		let wrongAnswer = INITIAL_WRONG_ANSWER_ID - 1;
		return answers.map((answer) => {
			if (correctAnswer !== answer) {
				wrongAnswer += 1;
			}
			return (
				<button
					key={ answer }
					type="button"
					data-testid={
						correctAnswer === answer
							? CORRECT_ANSWER
							: `wrong-answer-${wrongAnswer}`
					}
					value={
						correctAnswer === answer
							? TRUE
							: false
					}
					className="alternative"
					onClick={ this.handleVerifyAssertation }
					disabled={ disabledOptions }
				>
					{ he.decode(answer) }
				</button>
			);
		});
	};

	handleVerifyAssertation = ({ target: { value } }) => {
		this.changeStyle();

		const { timePerQuestion } = this.state;
		const { questionData: { difficulty } } = this.props;

		if (value === 'true') {
			const { token, incrementScore, incrementAssertation } = this.props;
			const score = BASE_SCORE + (timePerQuestion * DIFFICULTY_SCORE[difficulty]);
			updateUserScore(token, score);
			incrementScore(score);
			incrementAssertation();
		}
		document.querySelector('.button-next').style.display = 'block';
	};

	changeStyle = () => {
		const alternatives = document.querySelectorAll('.alternative');
		alternatives.forEach((alternative) => {
			if (alternative.attributes['data-testid'].value === 'correct-answer') {
				alternative.classList = 'corret-answer';
				return;
			}
			alternative.classList = 'wrong-answers';
		});
	};

	render() {
		const {
			questionData: { category, question, type },
			nextQuestion,
		} = this.props;
		const { timePerQuestion, score } = this.state;
		return (
			<article>
				<div className="time">
					{`Tempo: ${timePerQuestion}`}
				</div>
				<div>
					<div className="question">
						<h3 data-testid="question-category">
							{category}
						</h3>
						<p data-testid="question-text">
							{ he.decode(question) }
							{/* {question} */}
						</p>
					</div>
					<div data-testid="answer-options" className="answer">
						{
							type === 'boolean'
								? this.renderBooleanAlternatives()
								: this.renderMultipleAlternatives()
						}

						<button
							data-testid="btn-next"
							type="button"
							onClick={ () => { nextQuestion(score); this.setThirdySeconds(); } }
							className="button-next"
						>
              Próximo
						</button>
					</div>
				</div>
			</article>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	incrementAssertation: () => dispatch(addAssertion()),
	incrementScore: (score) => dispatch(addScore(score)),
});

const mapStateToProps = (state) => ({
	token: state.token,
});

Question.propTypes = {
	questionData: PropTypes.shape({
		category: PropTypes.string.isRequired,
		correct_answer: PropTypes.string.isRequired,
		difficulty: PropTypes.string.isRequired,
		incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
		question: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
	}).isRequired,
	nextQuestion: PropTypes.func.isRequired,
	disabledOptions: PropTypes.bool.isRequired,
	token: PropTypes.string.isRequired,
	incrementScore: PropTypes.func.isRequired,
	incrementAssertation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
