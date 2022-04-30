import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import './FeedbackGame.css';

const THREE_ASSERTIONS = 3;

class FeedbackGame extends Component {
	render() {
		const { player: { assertions, score }, history } = this.props;
		return (
			<section className="feedback-page">
				<div className="container-feedback">
					<Header />
					<div className="feedback-message">
						{
							assertions < THREE_ASSERTIONS
								? <h3 data-testid="feedback-text">Could be better...</h3>
								: <h3 data-testid="feedback-text">Well Done!</h3>
						}
						<p>
              Você acertou
							{' '}
							<span data-testid="feedback-total-question">{assertions}</span>
							{' '}
              questões!
						</p>
						<p>
              Um total de
							{' '}
							<span data-testid="feedback-total-score">{score}</span>
							{' '}
              pontos
						</p>
					</div>
					<div className="feedback-buttons">
						<button
							type="button"
							data-testid="btn-ranking"
							onClick={ () => history.push('/ranking') }
						>
              Ver Ranking
						</button>
						<button
							type="button"
							data-testid="btn-play-again"
							onClick={ () => history.push('/') }
						>
              Jogar Novamente
						</button>
					</div>
				</div>
			</section>
		);
	}
}

FeedbackGame.propTypes = {
	player: PropTypes.shape({
		assertions: PropTypes.number.isRequired,
		score: PropTypes.number.isRequired,
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = (state) => ({
	player: state.player,
});

export default connect(mapStateToProps)(FeedbackGame);
