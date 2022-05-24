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
			        <NavLink to="/logout" className={"logout"}>Déconnexion</NavLink>
                </div>
                <Navbar />
            </>
        )
    }
}

function Resume({ background, profilpic, name, title }) {
    const [data, setData] = useState("");
    useEffect(() => {
      let d;  
      LoadData().then(data => {
        d = data
        let c = {
          total: d.data.length,
          good: d.data.filter(el => el.globalscore >= 70).length,
          mean: d.data.filter(el => el.globalscore < 70 && el.globalscore >= 30).length,
          bad: d.data.filter(el => el.globalscore < 30).length
        }
        setData(c)
      })
    }, [])
    return (
      <div className={"resume"}>
        <img className={"resume-profil"} src={profilpic} alt="profile" />
        <div className={"resume-name"}>{name}</div>
        <div className={"resume-title"}>{data.total} jours</div>
        <div className={"wrapper"}>
          <div className={"info"}>
            <div className={"info-value"}>{data.good}</div>
            <div className={"info-title"}>jours sympas</div>
          </div>
          <div className={"info"}>
            <div className={"info-value"}>{data.mean}</div>
            <div className={"info-title"}>jours normaux</div>
          </div>
          <div className={"info"}>
            <div className={"info-value"}>{data.bad}</div>
            <div className={"info-title"}>jours mauvais</div>
          </div>
        </div>
      </div>
    );
  }