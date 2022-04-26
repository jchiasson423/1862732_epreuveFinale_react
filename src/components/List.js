import React from 'react';
import "../App.css";
import Task from './Task';

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const Liste = this.props.tasks.map((task, index) => (
            <Task task={task} modifyTask={this.props.modifyTask} deleteTask={this.props.deleteTask} completeTask={this.props.completeTask}/>
        )
        )

        return (
            <div className='box' id='error'>
                <div className='box_saisie box_saisie_main'>
                    <table>
                        <tr>
                            <h1>Liste de tâches</h1>
                        </tr>
                        {Liste}
                    </table>
                </div>
            </div>
        );
    }
}

export default (List);