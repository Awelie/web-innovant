import React from "react";
import { DisplayData } from '../components/DisplayData'
import { GlobalData } from '../components/GlobalData'
import { TimeNavigator } from '../components/TimeNavigator'
import { Navbar } from '../components/navbar'
import { CircularProgressWithLabel } from '../components/atom/CircularProgressWithLabel'
import { LoadData } from '../components/LoadData'
import { imgs } from '../components/imageFiles'

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
    }
	componentDidMount() {
		LoadData().then(data => this.setState(data))
	}
	getIcon(score) {
		if(score < 20)
			return imgs.img1
		else
			if(score < 40)
				return imgs.img2
			else
				if(score < 60)
					return imgs.img3
				else
					if(score < 80)
						return imgs.img4
					else
						return imgs.img5
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
								component={<CircularProgressWithLabel color={this.state.data[this.state.selected].stepsnumber/8000*100 > 80 ? "success" : this.state.data[this.state.selected].stepsnumber/8000*100 > 30 ? "primary" : "error" } value={this.state.data[this.state.selected].stepsnumber/8000*100 < 100 ? this.state.data[this.state.selected].stepsnumber/8000*100 : 100} />}
								icon={mdiWalk}/>
							<DisplayData 
							loaded={this.state.loaded}
								key={'sleeptime'} 
								title={"Temps de sommeil"} 
								goal={"480mins (8h)"} 
								value={this.state.data[this.state.selected].sleeptime} 
								component={<CircularProgressWithLabel color={this.state.data[this.state.selected].sleeptime/480*100 > 80 ? "success" : this.state.data[this.state.selected].sleeptime/480*100 > 30 ? "primary" : "error" } value={this.state.data[this.state.selected].sleeptime/480*100 < 100 ? this.state.data[this.state.selected].sleeptime/480*100 : 100} />} 
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
				<GlobalData icon={imgs.icon} title={""} goal={100}/>
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