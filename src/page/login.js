import React, { useState } from "react"
import { supabase } from '../components/supabaseClient'
import { Navigate } from "react-router-dom";

export function Login() {
    let [auth, setAuth] = useState(supabase.auth.user())
    if (auth) {
      return <Navigate to="/"/>;
    }
    return <LoginView state={setAuth}/>
}

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {setAuth: props.state, username: '', password: ''};
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.signup = this.signup.bind(this);
    }
    async checkLogin() {
        // eslint-disable-next-line no-unused-vars
        let { user, error } = await supabase.auth.signIn({
            email: this.state.username,
            password: this.state.password
        })
        if(!error)
            this.state.setAuth(supabase.auth.user())
    }
    async signup() {
        // eslint-disable-next-line no-unused-vars
        let { user, error } = await supabase.auth.signUp({
            email: this.state.username,
            password: this.state.password
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        this.checkLogin();
    }
    render() {
        return (
            <form className="container login" style={{
                color: "white",
                justifyContent: "center",
                alignItems: "center"
            }}
            onSubmit={this.handleSubmit}>
		        <input value={this.state.username} onChange={(ev) => {this.setState({username: ev.target.value})}}/>
                <input type="password" value={this.state.password} onChange={(ev) => {this.setState({password: ev.target.value})}}/>
                <input type="submit"/>
            </form>
        )
    }
}