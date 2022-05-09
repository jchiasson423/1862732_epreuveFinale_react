import { render } from 'react-dom';
import './App.css';
import axios from "axios";
import React from 'react';
import Connection from './components/Connection'
import Task from './components/Task'
import Error from './components/Error'
import User from './components/User'
import List from './components/List'
import AddTask from './components/AddTask'
import RandomImage from './components/RandomImage'

/**
 * Application g�n�rale
 * */
class App extends React.Component {

    constructor() {
        super();
        this.state = {
            data: null,
            id: 0,
            user: null,
            id: 0,
            apiError: null,
            formError: null,
            taskList: null,
            apiKey: "7e8e9eabec3976b632ff533b5b77c7bf48e4a64413e7fbb3762cf957b5c59d42"
        };

        this.userConnect = this.userConnect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.verifTask = this.verifTask.bind(this);
        this.verifConnect = this.verifConnect.bind(this);
        this.modifyTask = this.modifyTask.bind(this);
        this.eraseError = this.eraseError.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
    }

    /**
     * Efface les erreurs pr�sentes
     * */
    eraseError() {
        this.setState({ apiError: null });
        this.setState({ formError: null });
    }

    /**
     * Connecte un user � sa liste de t�ches
     * @param {any} pseudo pseudo du user
     * @param {any} password mot de passe du user
     */
    userConnect(pseudo, password) {
        let errorForm = this.verifConnect(pseudo, password);
        if (errorForm == "") {
            this.setState({ formError: null });
            axios.get('https://api-services-web.mia-assist.ca/users?pseudo=' + pseudo + '&password=' + password + '&apiKey=' + this.state.apiKey)
                .then((response) => {
                    const data = response.data.id;
                    this.setState({ id: data });
                    this.setState({ user: pseudo });
                    this.setState({ apiError: null });
                    this.getTasks(data);
                })
                .catch((error) => {
                    const data = error.response.status;
                    let errorText = "Erreur inconnue";
                    if (data == 404) {
                        errorText = "Pseudo ou mot de passe incorrect";
                    }
                    else if (data == 401) {
                        errorText = "Erreur de connexion � l'API";
                    }
                    else if (data == 403) {
                        errorText = "Format du pseudo ou du mot de passe incorrect."
                    }
                    this.setState({ user: null });
                    this.setState({ id: 0 });
                    this.setState({ apiError: errorText });
                    this.setState({ taskList: null });
                });
        }
        else {
            this.setState({ user: null });
            this.setState({ id: 0 });
            this.setState({ apiError: null });
            this.setState({ taskList: null });
            this.setState({ formError: errorForm });
        }
    }

    /**
     * D�connecte un user
     * */
    disconnect() {
        this.setState({ user: null });
        this.setState({ id: 0 });
        this.setState({ apiError: null });
        this.setState({ taskList: null });
        this.setState({ formError: null });
    }

    /**
     * Va chercher les t�ches d'un user dans un api
     * @param {any} id id du user
     */
    getTasks(id) {
        this.setState({ id: id });
        axios.get('https://api-services-web.mia-assist.ca/task/' + id + '?apiKey=' + this.state.apiKey)
            .then((response) => {
                const data = response.data;
                this.setState({ taskList: data });
            })
            .catch((error) => {
                let errorText = "Erreur inconnue";
                if (error.response.status == 404) {
                    errorText = "Usager introuvable";
                }
                else if (error.response.status == 401) {
                    errorText = "Erreur de connexion � l'API";
                }
                this.setState({ apiError: errorText });
                this.setState({ taskList: null });
            });
    }

    /**
     * V�rifie les donn�es des formulaires des t�ches
     * @param {any} task la t�che
     * @param {any} id l'id de la t�che
     */
    verifTask(task, id) {
        var error = "";
        if (!id) {
            error += "Id manquant. ";
        }

        if (task.title) {
            if (task.title.length < 1 || task.title.length > 255) {
                error += "Le titre doit contenir entre 1 et 255 caract�res. "
            }
        }
        else {
            error += "Titre manquant. "
        }

        if (task.descr) {
            if (task.descr.length < 1 || task.descr.length > 255) {
                error += "La description doit contenir entre 1 et 255 caract�res. "
            }
        }
        else {
            error += "Description manquante. "
        }

        if (task.due_time) {
            if (task.due_time.length != 19) {
                error += "Format de date incorrect, veuillez utiliser le formulaire. "
            }
        }
        else {
            error += "Description manquante. "
        }

        return error;
    }

    /**
     * V�rifie le formulaire de connexion du user
     * @param {any} pseudo pseudo du user
     * @param {any} password mot de passe du user
     */
    verifConnect(pseudo, password) {
        var error = "";

        if (pseudo.length < 1 || pseudo.length > 255) {
            error += "Le pseudo doit contenir entre 1 et 255 caract�res. "
        }

        if (password.length < 1 || password.length > 255) {
            error += "Le mot de passe doit contenir entre 1 et 255 caract�res. "
        }

        return error;
    }

    /**
     * Modifie une t�che dans l'api
     * @param {any} task la t�che
     * @param {any} id id de la t�che
     */
    modifyTask(task, id) {
        let errorForm = this.verifTask(task, id);
        if (errorForm == "") {
            this.setState({ formError: null });
            axios.put('https://api-services-web.mia-assist.ca/task/' + this.state.id + '?apiKey=' + this.state.apiKey, {
                task_id: id,
                due_time: task.due_time,
                title: task.title,
                descr: task.descr
            })
                .then((response) => {
                    this.setState({ apiError: "T�che modifi�e" });
                })
                .catch((error) => {
                    const data = error.response.status;
                    let errorText = "Erreur inconnue";
                    if (data == 404) {
                        errorText = "Usager introuvable";
                    }
                    else if (data == 401) {
                        errorText = "Erreur de connexion � l'API";
                    }
                    else if (data == 403) {
                        errorText = "Format des informations fournies incorrect."
                    }
                    this.setState({ apiError: errorText });
                });
        }
        else {
            this.setState({ apiError: null });
            this.setState({ formError: errorForm });
        }
    }

    /**
     * Ajoute une t�che dans l'Api
     * @param {any} task la t�che
     */
    addTask(task) {
        let errorForm = this.verifTask(task, 1);
        if (errorForm == "") {
            this.setState({ formError: null });
            axios.post('https://api-services-web.mia-assist.ca/task/' + this.state.id + '?apiKey=' + this.state.apiKey, {
                due_time: task.due_time,
                title: task.title,
                descr: task.descr
            })
                .then((response) => {
                    this.setState({ apiError: "T�che ajout�e" });
                    this.setState({ taskList: null });
                    this.getTasks(this.state.id);
                })
                .catch((error) => {
                    const data = error.response.status;
                    let errorText = "Erreur inconnue";
                    if (data == 404) {
                        errorText = "Usager introuvable";
                    }
                    else if (data == 401) {
                        errorText = "Erreur de connexion � l'API";
                    }
                    else if (data == 403) {
                        errorText = "Format des informations fournies incorrect."
                    }
                    this.setState({ apiError: errorText });
                });
        }
        else {
            this.setState({ apiError: null });
            this.setState({ formError: errorForm });
        }
    }

    /**
     * Supprime une t�che dans l'api
     * @param {any} id id de la t�che
     */
    deleteTask(id) {
        axios.delete('https://api-services-web.mia-assist.ca/task/' + this.state.id + '?apiKey=' + this.state.apiKey + "&task_id=" + id)
            .then((response) => {
                this.setState({ apiError: "T�che supprim�e" });
                this.setState({ taskList: null });
                this.getTasks(this.state.id);
            })
            .catch((error) => {
                let errorText = "Erreur inconnue";
                if (error.response.status == 404) {
                    errorText = "Usager introuvable";
                }
                else if (error.response.status == 401) {
                    errorText = "Erreur de connexion � l'API";
                }
                this.setState({ apiError: errorText });
                this.setState({ taskList: null });
            });
    }

    /**
     * Complete une t�che dans l'Api
     * @param {any} id id de la t�che
     */
    completeTask(id) {
        axios.put('https://api-services-web.mia-assist.ca/taskDone/' + this.state.id + '?apiKey=' + this.state.apiKey + "&task_id=" + id)
            .then((response) => {

            })
            .catch((error) => {
                let errorText = "Erreur inconnue";
                if (error.response.status == 404) {
                    errorText = "Usager introuvable";
                }
                else if (error.response.status == 401) {
                    errorText = "Erreur de connexion � l'API";
                }
                this.setState({ apiError: errorText });
                this.setState({ taskList: null });
            });
    }

    /**
     * Rendu de l'application
     * */
    render() {
        var erreurApi;
        if (this.state.apiError != null) {
            erreurApi = <Error error={this.state.apiError} eraseError={this.eraseError} />
        }

        var erreurForm;
        if (this.state.formError != null) {
            erreurForm = <Error error={this.state.formError} eraseError={this.eraseError} />
        }

        var user;
        var connexion;
        var addTask;
        if (this.state.user != null) {
            user = <User pseudo={this.state.user} disconnect={this.disconnect} />;
            addTask = <AddTask addTask={this.addTask} />;
        }
        else {
            connexion = <Connection userConnect={this.userConnect} />
        }

        var list;
        if (this.state.taskList != null) {
            list = <List tasks={this.state.taskList} modifyTask={this.modifyTask} deleteTask={this.deleteTask} completeTask={this.completeTask} />
        }

        var page =
            <div className="App">
                <RandomImage/>
                {connexion}
                {user}
                {erreurForm}
                {erreurApi}
                {addTask}
                {list}
            </div>;

        

        return page;
    }
}

export default App;
