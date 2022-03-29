import React from "react";
import { DisplayData } from '../components/DisplayData'
import { GlobalData } from '../components/GlobalData'
import { TimeNavigator } from '../components/TimeNavigator'
import { supabase } from '../components/supabaseClient'
import { Navbar } from '../components/navbar'
import { CircularProgressWithLabel } from '../components/atom/CircularProgressWithLabel'

import {
	mdiSleep,
	mdiWalk,
	mdiVolumeSource,
} from '@mdi/js'

export class Fitness extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
			data: {},
			user: {},
			selected: parseInt(this.props.id),
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
				loaded: true,
			}) 
		//}, 5000)
	}
	setStateSelected = (val) => {
		this.setState({selected: this.state.selected + val});
	}
    render() {
        return (
		<>
            <div className="fitness-app">
			{
				(this.state.loaded && this.state.data.length > 0) ? (
					<>
						<GlobalData icon={this.getIcon(this.state.data[this.state.selected].globalscore)} 
						title={this.state.data[this.state.selected].globalscore} goal={100}/>
						<TimeNavigator date={this.state.data[this.state.selected].date} before={this.state.selected < this.state.data.length-1} after={this.state.selected > 0} changeState={this.setStateSelected}/>
						<div className="fitness-app-container">
							<DisplayData 
							loaded={this.state.loaded}
								key={'stepsnumber'} 
								title={"Nombre de pas"} 
								goal={"8000 pas"} 
								value={this.state.data[this.state.selected].stepsnumber} 
								component={<CircularProgressWithLabel value={this.state.data[this.state.selected].stepsnumber/8000*100 < 100 ? this.state.data[this.state.selected].stepsnumber/8000*100 : 100} />}
								icon={mdiWalk}/>
							<DisplayData 
							loaded={this.state.loaded}
								key={'sleeptime'} 
								title={"Temps de sommeil"} 
								goal={"480mins (8h)"} 
								value={this.state.data[this.state.selected].sleeptime} 
								component={<CircularProgressWithLabel value={this.state.data[this.state.selected].sleeptime/480*100 < 100 ? this.state.data[this.state.selected].sleeptime/480*100 : 100} />} 
								icon={mdiSleep}/>
							<DisplayData 
							loaded={this.state.loaded}
								key={'volume'} 
								title={"Volume ambiant moyen"} 
								goal={"Environnement calme : moyenne 82.5dB"} 
								value={this.state.data[this.state.selected].ambiantvolume} 
								
								percentage={this.state.data[this.state.selected].ambiantvolume/82.5*100} 
								icon={mdiVolumeSource}/>
						</div>
					</>
				) : (
				<>
				<GlobalData icon={"/assets/img/1.png"} title={""} goal={100}/>
				<TimeNavigator date={null} before={false} after={false} changeState={this.setStateSelected}/>
				<div className="fitness-app-container">
					<DisplayData 
						loaded={this.state.loaded}
						key={'stepsnumber'} 
						title={"Nombre de pas"} 
						goal={"8000 pas"} 
						value={""} 
						percentage={0} 
						icon={mdiWalk}/>
					<DisplayData
						loaded={this.state.loaded}
						key={'sleeptime'} 
						title={"Temps de sommeil"} 
						goal={"480mins (8h)"} 
						value={""} 
						percentage={0} 
						icon={mdiSleep}/>
					<DisplayData 
						loaded={this.state.loaded}
						key={'volume'} 
						title={"Volume ambiant moyen"} 
						goal={"Environnement calme : moyenne 82.5dB"} 
						value={""} 
						percentage={0} 
						icon={mdiVolumeSource}/>
				</div>
				</>
				)
			}
			<Navbar />
            </div>
		</>
        )
    }
}