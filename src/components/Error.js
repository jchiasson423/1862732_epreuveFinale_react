import React from 'react';
import "../App.css";

/**
 * Affichage des erreurs
 * */
class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Rendu de la composante
     * */
    render() {
        return (
            <div className='box' id='error'>
                <div className='box_saisie box_saisie_main'>
                    <h3>{this.props.error}</h3>
                    <button
                        onClick={() => this.props.eraseError()}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}

export default (Error);