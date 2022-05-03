import React from "react"
import { imgs } from '../components/imageFiles'

export class Offline extends React.Component {
    render() {
        return (
            <div className="container login">
                <img src={imgs.img1} style={{backgroundColor: "white", borderRadius: "50%", marginBottom: "1em"}} alt="icon"/>
                <div><h2>Ow no ! you're offline</h2></div>
            </div>
            
        )
    }
}