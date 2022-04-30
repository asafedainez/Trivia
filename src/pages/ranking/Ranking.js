import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getStore } from '../../services/localStorage';
import './ranking.css';

const GREATER_THAN = -1;
const LESS_THAN = 1;

class Ranking extends Component {
  ordenationRules = (a, b) => {
    if (a.score > b.score) {
      return GREATER_THAN;
    }
    if (a.score < b.score) {
      return LESS_THAN;
    }
    if (a.score === b.score) {
      if (a.name > b.name) {
        return LESS_THAN;
      }
      return GREATER_THAN;
    }
  }

  render() {
    const users = getStore('ranking');
    const { history } = this.props;
    return (
      <section className="ranking-page">
        <div className="container-ranking">
          <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
          <ul className="ranking-list">
            {
              users.sort(this.ordenationRules).map((user, index) => (
                <li
                  key={ user.token }
                >
                  <div className="ranking-user">
                    <img src={ user.picture } alt="Imagem de perfil do usuário" />
                    <p data-testid={ `player-name-${index}` }>{user.name}</p>
                    <p data-testid={ `player-score-${index}` }>{user.score}</p>
                  </div>
                </li>
              ))
            }
          </ul>
          <button
            type="button"
            data-testid="btn-go-home"
            className="btn-home"
            onClick={ () => history.push('/') }
          >
            Jogar Novamente!
          </button>
        </div>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
