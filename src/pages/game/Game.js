import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAssertion, addScore } from '../../redux/actions/actions';
import Header from '../../components/Header';
import Question from '../../components/Question';
import './game.css';

const THIRTY_SECONDS = 30000;
const QUESTIONS_QUANTITY = 5;

class Game extends Component {
	state = {
		questionSequence: 0,
		disabledOptions: false,
	};

	thirdSeconds = undefined;

	timeOutThirtySeconds = () => {
		this.thirdSeconds = setTimeout(() => {
			document.querySelector('.button-next').style.display = 'block';
			this.setState({
				disabledOptions: true,
			});
		}, THIRTY_SECONDS);
	};

	componentDidMount = () => {
		this.timeOutThirtySeconds();
	};

	componentWillUnmount = () => {
		clearTimeout(this.thirdSeconds);
	};

	redirectToFeedbackPage = () => {
		console.log('redirect');
		const { questionSequence } = this.state;
		const { history } = this.props;

		if (questionSequence === QUESTIONS_QUANTITY) {
			history.push('/feedback');
		}
	};

	handlerNextQuestion = () => {
		clearTimeout(this.thirdSeconds);

		this.setState((prevState) => ({
			questionSequence: prevState.questionSequence + 1,
			disabledOptions: false,
		}), this.redirectToFeedbackPage);
		document.querySelector('.button-next').style.display = 'none';
		this.timeOutThirtySeconds();
	};

	render() {
		const { questions: { results } } = this.props;
		const { questionSequence, disabledOptions } = this.state;

		return (
			<section className="game">
				<div className="container-questions">
					<Header />
					{
						questionSequence < QUESTIONS_QUANTITY && (
							<Question
								questionData={ results[questionSequence] }
								nextQuestion={ this.handlerNextQuestion }
								disabledOptions={ disabledOptions }
							/>)
					}
				</div>
			</section>
		);
	}
}

Game.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
	questions: PropTypes.shape({
		results: PropTypes.arrayOf(PropTypes.object).isRequired,
	}).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	incrementAssertation: () => dispatch(addAssertion()),
	incrementScore: (score) => dispatch(addScore(score)),
});

const mapStateToProps = (state) => ({
	questions: state.questions,
	token: state.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
