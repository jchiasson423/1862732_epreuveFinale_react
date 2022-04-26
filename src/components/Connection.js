import React from 'react';
import "../App.css";

class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className='box'>
                <div className='box_saisie box_saisie_main'>
                    <label htmlFor='titreMainBox'>Pseudo</label>
                    <input
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        value={this.state.pseudo}
                        onChange={this.handleChange}
                    />
                    <label htmlFor='titreMainBox'>Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button
                        onClick={() => this.props.userConnect(this.state.pseudo, this.state.password)}
                    >
                        Connexion
                    </button>
                </div>

            </div>
        );
    }
}

export default (Connection);