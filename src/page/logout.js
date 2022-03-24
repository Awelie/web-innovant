import React, { useState } from "react"
import { supabase } from '../components/supabaseClient'
import { Navigate } from "react-router-dom";

export function Logout() {
    let [auth, setAuth] = useState(supabase.auth.user())
    console.log(auth)
    if (!auth) {
      return <Navigate to="/login"/>;
    }
    return <LogoutView state={setAuth}/>
}

class LogoutView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setAuth: props.state
        }
        this.out = this.out.bind(this);
    }
    async componentDidMount() {
        this.out()
    }
    async out() {
        const { error } = await supabase.auth.signOut()
        this.state.setAuth(error)
    }
    render() {
        return <>En cours de déconnection</>
    }
}
