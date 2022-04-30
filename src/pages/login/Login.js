import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../../services/images/trivia.png';
import './login.css';
import {
	addNewUser,
} from '../../services/localStorage';
import {
	dispatchToken,
	addPlayer,
	dispatchQuestions,
} from '../../redux/actions/actions';

class Login extends Component {
	GRAVATAR_EMAIL_URL_PREFIX = 'https://www.gravatar.com/avatar/';

	state = {
		name: '',
		gravatarEmail: '',
		isDisabled: true,
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState({
			[name]: value,
		}, this.verifyFields);
	};

	verifyFields = () => {
		const { name, gravatarEmail } = this.state;
		let isDisabled = true;

		if (name.length > 0 && gravatarEmail.length > 0) {
			isDisabled = false;
		}

		this.setState({
			isDisabled,
		});
	};

	saveAndRedirect = () => {
		const { name, gravatarEmail } = this.state;
		const { addNewPlayer, history, token } = this.props;

		addNewUser({
			name,
			score: 0,
			picture: this.GRAVATAR_EMAIL_URL_PREFIX + md5(gravatarEmail).toString(),
			token,
		});
		addNewPlayer({ name, gravatarEmail: md5(gravatarEmail).toString() });
		history.push('/game');
	};

	handleClick = async () => {
		const {
			requestQuestions,
			requestToken,
		} = this.props;
		await requestToken();
		const { token } = this.props;
		await requestQuestions(token);

		const { questions } = this.props;
		if (questions.response_code) {
			await requestToken();
			const { token: newToken } = this.props;
			await requestQuestions(newToken);
		}
		this.saveAndRedirect();
	};

	render() {
		const { name, gravatarEmail, isDisabled } = this.state;
		const { history } = this.props;

		return (
			<section className="container-login">
				<div className="login-div">
					<button
						data-testid="btn-settings"
						type="button"
						onClick={ () => history.push('/config') }
					>
						{/* <img src="https://img.icons8.com/ios/344/settings--v2.png" alt="" /> */}
					</button>
					<div className="login-header">
						<img src={ logo } className="login-logo" alt="logo" />
					</div>
					<form>
						<input
							data-testid="input-player-name"
							name="name"
							type="text"
							value={ name }
							placeholder="Nome"
							onChange={ this.handleChange }
						/>
						<input
							data-testid="input-gravatar-email"
							name="gravatarEmail"
							type="email"
							value={ gravatarEmail }
							placeholder="E-mail"
							onChange={ this.handleChange }
						/>
						<div className="login-button">
							<button
								data-testid="btn-play"
								type="button"
								onClick={ this.handleClick }
								disabled={ isDisabled }
							>
                Play
							</button>
						</div>
					</form>
				</div>
			</section>
		);
	}
}

Login.propTypes = {
	requestToken: PropTypes.func.isRequired,
	requestQuestions: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
	questions: PropTypes.shape({
		response_code: PropTypes.number,
		results: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
	addNewPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	token: state.token,
	questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
	requestToken: () => dispatch(dispatchToken()),
	addNewPlayer: (player) => dispatch(addPlayer(player)),
	requestQuestions: (token) => dispatch(dispatchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
