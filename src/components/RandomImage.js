import React from 'react';
import "../App.css";

/**
 * Affiche une image random provenant de l'api https://random.imagecdn.app/
 * */
class RandomImage extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Rendu de la composante
     * */
    render() {
        return (
            <div className='box' id='Image'>
                <div className='box_saisie box_saisie_main'>
                    <img src="https://random.imagecdn.app/500/150"></img>
                </div>
            </div>
        );
    }
}

export default (RandomImage);