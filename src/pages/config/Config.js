import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';

class Config extends Component {
	render() {
		return (
			<section>
				<Header />
				<h1 data-testid="settings-title">Configuração</h1>
			</section>
		);
	}
}

export default connect()(Config);