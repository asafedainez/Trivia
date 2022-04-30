import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.css';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const gravatarEmailURL = 'https://www.gravatar.com/avatar/';
    return (
      <header>
        <div>
          <img
            src={ gravatarEmailURL + gravatarEmail }
            alt="Foto do usuário"
            data-testid="header-profile-picture"
          />
          <p>
            Jogador:
            {' '}
            <span data-testid="header-player-name">
              {name}
            </span>
          </p>
        </div>
        <div>
          <p>
            Pontos:
            {' '}
            <span data-testid="header-score">
              {score}
            </span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
