import React from 'react';
import "../App.css";

/**
 * Formulaire d'ajout d'une tâche
 * */
class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            descr: "",
            due_time: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
    }

    /**
     * Changement des variables d'état
     * @param {any} event évènement de changement
     */
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    /**
     * Ajoute une tâche à la liste
     * */
    add() {
        var table = this.state.due_time.split("", 16);
        table[10] = " ";
        var datetime = table.join("");
        datetime += ":00";

        var task = {
            id: 0,
            title: this.state.title,
            descr: this.state.descr,
            due_time: datetime
        }
        this.props.addTask(task);
    }

    /**
     * Rendu de la composante
     * */
    render() {
        return (
            <div className='box'>
                <div className='box_saisie box_saisie_main'>
                    <table>
                        <tr>
                            <h1>Ajouter une tache</h1>
                        </tr>
                        <tr>
                            <label htmlFor='titreMainBox'>Titre</label>
                        </tr>
                        <tr>
                            <input
                                type="text"
                                id="titleAdd"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </tr>
                        <tr>
                            <label htmlFor='titreMainBox'>Description</label>
                        </tr>
                        <tr>
                            <textarea
                                rows="4"
                                type="text"
                                id="descrAdd"
                                name="descr"
                                value={this.state.descr}
                                onChange={this.handleChange}
                            />
                        </tr>
                        <tr>
                            <label htmlFor='titreMainBox'>Date de remise</label>
                        </tr>
                        <tr>
                            <input
                                type="datetime-local"
                                id="due_timeAdd"
                                name="due_time"
                                value={this.state.due_time}
                                onChange={this.handleChange}
                            />
                        </tr>
                        <tr>
                            <button
                                onClick={() => this.add()}
                            >
                                Ajouter la tache
                            </button>
                        </tr>
                    </table>
                </div>

            </div>
        );
    }
}

export default (AddTask);