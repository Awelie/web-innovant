import React, { useState } from "react"
import { supabase } from '../components/supabaseClient'
import { Navigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

export function Signup() {
    let [auth, setAuth] = useState(supabase.auth.user())
    if (auth) {
      return <Navigate to="/login"/>;
    }
    return <SignupView state={setAuth}/>
}

class SignupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {setAuth: props.state, username: '', password: ''};
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signup = this.signup.bind(this);
    }
    async signup() {
        // eslint-disable-next-line no-unused-vars
        let { user, error } = await supabase.auth.signUp({
            email: this.state.username,
            password: this.state.password
        })
        if(!error)
            this.state.setAuth(supabase.auth.user())
    }
    handleSubmit(event) {
        event.preventDefault();
        this.signup();
    }
    render() {
        return (
            <div className="container login">
                <div><h2>Inscription</h2></div>
                <form style={{width: "80%", maxWidth: "400px"}} className="loginForm" onSubmit={this.handleSubmit}>
                    <TextField id="username" label="Adresse mail" value={this.state.username} onChange={(ev) => { this.setState({ username: ev.target.value }) }}/>
                    <TextField id="password" type="password" label="Mot de passe" value={this.state.password} onChange={(ev) => { this.setState({ password: ev.target.value }) }}/>
                    <TextField type="submit"/>
                </form>
                <hr style={{
                    width: "70%",
                    maxWidth: "400px",
                    marginTop: "10px",
                    marginBottom: "10px"
                }}/>
                <Link to="/login">Se connecter</Link>
            </div>
        )
    }
}