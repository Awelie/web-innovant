import React, { useEffect } from "react";
import { Navbar } from '../components/navbar'
import { NavLink } from 'react-router-dom'
import { imgs } from '../components/imageFiles'
import { supabase } from '../components/supabaseClient'
import { LoadData } from '../components/LoadData'
import { useState } from 'react';

export class About extends React.Component {
    render() {
        return (
            <>
                <div className="container about"
                style={{
                    color: "white"
                }}
                >
                    <Resume background={""} profilpic={imgs.icon} name={supabase.auth.user().email} title={supabase.auth.user().phone}/>
			        <NavLink to="/logout" className={"logout"}>Deconnection</NavLink>
                </div>
                <Navbar />
            </>
        )
    }
}

function Resume({ background, profilpic, name, title }) {
    const [data, setData] = useState("");
    useEffect(() => {
        LoadData().then(data => setData(data))
    }, [])
    return (
      <div className={"resume"}>
        <img className={"resume-profil"} src={profilpic} alt="profile" />
        <div className={"resume-name"}>{name}</div>
        <div className={"resume-title"}>{title}</div>
        <div className={"wrapper"}>
          <div className={"info"}>
            <div className={"info-value"}>{""}</div>
            <div className={"info-title"}>jours</div>
          </div>{/* 
          <div className={"info"}>
            <div className={"info-value"}>456</div>
            <div className={"info-title"}>followers</div>
          </div>
          <div className={"info"}>
            <div className={"info-value"}>789</div>
            <div className={"info-title"}>following</div>
          </div> */}
        </div>
      </div>
    );
  }