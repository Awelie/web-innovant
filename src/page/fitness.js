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
		this.setState({
			user: users,
			data: health_data,
			selected: 0,
			loaded: true,
		})
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
								key={'stepsnumber'} 
								title={"Nombre de pas"} 
								goal={"8000 pas"} 
								value={this.state.data[this.state.selected].stepsnumber} 
								percentage={this.state.data[this.state.selected].stepsnumber/8000*100} 
								icon={mdiWalk}/>
							<DisplayData 
								key={'sleeptime'} 
								title={"Sommeil"} 
								goal={"480mins (8h)"} 
								value={this.state.data[this.state.selected].sleeptime} 
								percentage={this.state.data[this.state.selected].sleeptime/480*100} 
								icon={mdiSleep}/>
							<DisplayData 
								key={'volume'} 
								title={"Volume ambiant"} 
								goal={"Environnement calme 80db max"} 
								value={this.state.data[this.state.selected].ambiantvolume} 
								percentage={this.state.data[this.state.selected].ambiantvolume/60} 
								icon={mdiVolumeSource}/>
						</div>
					</>
				) : (<div>En cours de chargement</div>)
			}
			<Navbar />
            </div>
		</>
        )
    }
}