import React from 'react';
import "../App.css";

class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='box' id='User'>
                <div className='box_saisie box_saisie_main'>
                    <p>Bonjour {this.props.pseudo}</p>
                    <button
                        onClick={() => this.props.disconnect()}
                    >
                        Déconnecter
                    </button>
                </div>
            </div>
        );
    }
}

export default (User);