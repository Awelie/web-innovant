import React from "react";
import { DisplayData } from '../components/DisplayData'
import { GlobalData } from '../components/GlobalData'
import { TimeNavigator } from '../components/TimeNavigator'
import { supabase } from '../components/supabaseClient'
import { Navbar } from '../components/navbar'

import {
	mdiSleep,
	mdiWalk,
	mdiVolumeSource,
	mdiBrain
} from '@mdi/js'

export class Fitness extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
			data: {},
			user: {},
			selected: null,
			loaded: false,
		};
		//this.getData();
		this.getData.bind(this)
    }
	componentDidMount() {
		this.getData()
	}
    async getData() {
		// eslint-disable-next-line no-unused-vars
		let { data: users, error: error_users } = await supabase
			.from('users')
			.select('*')
	  	// eslint-disable-next-line no-unused-vars
	  	let { data: health_data, error: error_health } = await supabase
			.from('health_data')
			.select("*")
			.eq('id', '1')
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
	setStateSelected = (val) => {
		this.setState({selected: this.state.selected + val});
	}
    render() {
        return (
		<>
            <div className="fitness-app">
			{
				this.state.loaded ? (
					<>
						<GlobalData icon={mdiBrain} title={this.state.data[this.state.selected].globalscore} goal={100}/>
						<TimeNavigator date={this.state.data[this.state.selected].date} before={this.state.selected < this.state.data.length-1} after={this.state.selected > 0} changeState={this.setStateSelected}/>
						<div className="fitness-app-container">
							<DisplayData 
							loaded={this.state.loaded}
								key={'stepsnumber'} 
								title={"Nombre de pas"} 
								goal={"8000 pas"} 
								value={this.state.data[this.state.selected].stepsnumber} 
								percentage={this.state.data[this.state.selected].stepsnumber/8000*100} 
								icon={mdiWalk}/>
							<DisplayData 
							loaded={this.state.loaded}
								key={'sleeptime'} 
								title={"Temps de sommeil"} 
								goal={"480mins (8h)"} 
								value={this.state.data[this.state.selected].sleeptime} 
								percentage={this.state.data[this.state.selected].sleeptime/480*100} 
								icon={mdiSleep}/>
							<DisplayData 
							loaded={this.state.loaded}
								key={'volume'} 
								title={"Volume ambiant moyen"} 
								goal={"Environnement calme : moyenne 82.5dB"} 
								value={this.state.data[this.state.selected].ambiantvolume} 
								percentage={this.state.data[this.state.selected].ambiantvolume/82.5} 
								icon={mdiVolumeSource}/>
						</div>
					</>
				) : (
				// <div className="fitness-app-container">En cours de chargement</div>
				<>
				<GlobalData icon={mdiBrain} title={""} goal={100}/>
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