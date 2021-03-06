import React, { useState } from "react"
import { supabase } from '../components/supabaseClient'
import { Navigate, Link } from "react-router-dom";
import { TextField, CircularProgress } from '@mui/material';
import { imgs } from '../components/imageFiles'

export function Login() {
    let [auth, setAuth] = useState(supabase.auth.user())
    if (auth) {
        return <Navigate to="/" />;
    }
    return <LoginView state={setAuth} />
}

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { setAuth: props.state, username: '', password: '', loaded: true };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }
    async checkLogin() {
        if(!this.state.loaded)
            return
        this.setState({loaded: false})
        // eslint-disable-next-line no-unused-vars
        let { user, error } = await supabase.auth.signIn({
            email: this.state.username,
            password: this.state.password
        })
        console.log(error)
        this.setState({loaded: true})
        if (!error)
            this.state.setAuth(supabase.auth.user())
    }
    handleSubmit(event) {
        event.preventDefault();
        this.checkLogin();
    }
    render() {
        return (
            <div className="container login">
                <img src={imgs.icon} alt="icon"/>
                <div><h2>Connexion</h2></div>
                <form style={{width: "80%", maxWidth: "400px"}} className="loginForm" onSubmit={this.handleSubmit}>
                    <TextField id="username" label="Adresse mail" value={this.state.username} onChange={(ev) => { this.setState({ username: ev.target.value }) }}/>
                    <TextField id="password" type="password" label="Mot de passe" value={this.state.password} onChange={(ev) => { this.setState({ password: ev.target.value }) }}/>
                    {(this.state.loaded) ? (<TextField type="submit" />) : (<CircularProgress className="loadForm"/>) }
                </form>
                <hr style={{
                    width: "70%",
                    maxWidth: "400px",
                    marginTop: "10px",
                    marginBottom: "10px"
                }}/>
                <Link to="/signup">S'inscrire</Link>
            </div>
            
        )
    }
}