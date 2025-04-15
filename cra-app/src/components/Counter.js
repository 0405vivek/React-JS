import {Component, Componet} from 'react'

class Counter extends Component{
    constructor(props){
        super(props);
        // this.state = ({
        //     count : 0,
        //     name : "Vivek Prajpati"            
        // })
    }

    handlclick(){
        this.setState({
            count : this.state.count + 1
        })
    }
    diclick(){
        if(this.state.count > 0){
        this.setState({
                count : this.state.count - 1
            })
        }
    }

    render(){
        return(
            <div>
                <h1>Vivek Prajapati</h1>
                <p>Count : {this.props.name}</p>
                <p>Count : {this.props.cours}</p>
                <p>Count : {this.props.Time}</p>
                <button onClick={()=>this.handlclick()}>Count++</button>
                <button onClick={()=>this.diclick()}>Count--</button>
            </div>
        )
    }
}



export default Counter;

export class Button extends Component{
    constructor(){
        super();
        <button>{this.props.Click}</button>
    }
}