import { LoadData } from '../components/LoadData'
import React, { useState } from "react";
import { DisplayData } from '../components/DisplayData'
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
    }
	componentDidMount() {
		LoadData().then(data => this.setState(data))
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
                <img src="/assets/icon.png" alt="icon"/>
			{
				(this.state.loaded && this.state.data.length > 0) ? (
					<>
                    {[...this.state.data].map((el, index) => (<DisplayData 
                    loaded={this.state.loaded}
                    img={this.getIcon(el.globalscore)}
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
                    img={this.getIcon(0)}
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