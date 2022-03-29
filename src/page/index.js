import React, { useState } from "react";
import { DisplayData } from '../components/DisplayData'
import { supabase } from '../components/supabaseClient'
import { Navbar } from '../components/navbar'
import { CircularProgressWithLabel } from '../components/atom/CircularProgressWithLabel'
import { Navigate } from "react-router-dom";

export function Index() {
    let [selected, setSelected] = useState(null)
    if (selected !== null) {
      return <Navigate to={`/detail/${selected}`}/>;
    }
    return <IndexView state={setSelected}/>
}

export class IndexView extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
            setSelected: props.state,
			data: {},
			user: {},
			selected: null,
			loaded: false,
		};
		this.getData.bind(this)
    }
	componentDidMount() {
		this.getData()
	}
	getIcon(score) {
		if(score < 20)
			return "/assets/img/1.png"
		else
			if(score < 40)
				return "/assets/img/2.png"
			else
				if(score < 60)
					return "/assets/img/3.png"
				else
					if(score < 80)
						return "/assets/img/4.png"
					else
						return "/assets/img/5.png"
	}
    async getData() {
		// eslint-disable-next-line no-unused-vars
		let { data: today, error: error_today } = await supabase
			.from('health_data')
			.select('*')
			.eq('id', supabase.auth.user().id)
			.eq('date', ((new Date()).toISOString()).toLocaleString('zh-TW'))
		if(today.length === 0) {
			// eslint-disable-next-line no-unused-vars
			const { data, error } = await supabase
  				.from('health_data')
  				.insert([
    				{
						id: supabase.auth.user().id,
						date: ((new Date()).toISOString()).toLocaleString('zh-TW'),
						sleeptime: Math.floor(Math.random()* 480),
						stepsnumber: Math.floor(Math.random()* 12000),
						ambiantvolume: Math.floor(Math.random()* 100),
						globalscore: Math.floor(Math.random()* 100)
					},
  				])
		}
		// eslint-disable-next-line no-unused-vars
		let { data: users, error: error_users } = await supabase
			.from('users')
			.select('*')
	  	// eslint-disable-next-line no-unused-vars
	  	let { data: health_data, error: error_health } = await supabase
			.from('health_data')
			.select("*")
			.eq('id', supabase.auth.user().id)
		health_data.sort((a, b) => (new Date(b.date)) - (new Date(a.date)))
		//setTimeout(() => { 
			this.setState({
				user: users,
				data: health_data,
				selected: 0,
				loaded: true,
			}) 
		//}, 5000)
	}
    getDate(date) {
        let d = new Date(date)
        let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    }
    render() {
        return (
		<>
            <div className="fitness-app">
            <div className="fitness-app-container">
			{
				(this.state.loaded && this.state.data.length > 0) ? (
					<>
                    {[...this.state.data].map((el, index) => (<DisplayData 
                    loaded={this.state.loaded}
                    icon={this.getIcon(el.globalscore)}
                    key={el.date}
                    title={this.getDate(el.date)}
                    goal={""}
                    value={""}
                    component={<CircularProgressWithLabel value={el.globalscore} />}
                    clickHandler={() => this.state.setSelected(index)}
                    />))}
				    </>
				) : (<>
                <DisplayData 
                    loaded={this.state.loaded}
                    icon={this.getIcon(0)}
                    key={0}
                    title={""}
                    goal={""}
                    value={""}
                    component={<CircularProgressWithLabel value={0} />}
                    />
                </>)
			}
            </div>
			<Navbar />
            </div>
		</>
        )
    }
}