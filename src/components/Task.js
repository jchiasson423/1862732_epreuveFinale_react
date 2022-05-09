import React from 'react';
import "../App.css";

class Task extends React.Component {
    constructor(props) {
        super(props);
        var table = this.props.task.due_time.split("", 16);
        table[10] = "T";
        var datetime = table.join("");
        this.state = {
            ìd: this.props.task.id,
            title: this.props.task.title,
            descr: this.props.task.descr,
            due_time: datetime,
            user_id: this.props.task.user_id,
            done: this.props.task.done
        };

        this.handleChange = this.handleChange.bind(this);
        this.modify = this.modify.bind(this);
        this.complete = this.complete.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    modify() {
        var table = this.state.due_time.split("", 16);
        table[10] = " ";
        var datetime = table.join("");
        datetime += ":00";

        var task = {
            ìd: this.props.task.id,
            title: this.state.title,
            descr: this.state.descr,
            due_time: datetime,
        }
        this.props.modifyTask(task, this.props.task.id);
    }

    complete() {
        this.setState({ done: 1 });
        this.props.completeTask(this.props.task.id)
    }

    render() {
        var completed;
        if (this.state.done == 1) {
            completed =
                <tr>
                    Complétée
                </tr>;
        }
        else {
            completed =
                <tr>
                <tr>
                    Non complétée
                </tr>
                <tr>
                    <button
                        onClick={() => this.complete()}
                    >
                        Compléter
                    </button>
                </tr>
                </tr>
        }
        return (
            <tr>
                <table>
                    <tr>
                        <label htmlFor='titreMainBox'>Titre</label>
                    </tr>
                    <tr>
                        <input
                            type="text"
                            id="titre"
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
                            id="descr"
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
                            id="due_time"
                            name="due_time"
                            value={this.state.due_time}
                            onChange={this.handleChange}
                        />
                    </tr>
                    {completed}
                    <tr>
                        <button
                            onClick={() => this.modify()}
                        >
                            Modifier
                        </button>
                        <button
                            onClick={() => this.props.deleteTask(this.props.task.id)}
                        >
                            Supprimer
                        </button>
                    </tr>
                </table>
                <hr/>
            </tr>
        );
    }
}

export default (Task);