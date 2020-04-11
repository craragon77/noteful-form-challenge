import React, {Component} from 'react'

export default class FolderErrorBoundries extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        }
        
    }
    static getDerivedStateFromError(error) {
        return( {hasError: true} )
    }

    render(){
        if (this.state.hasError){
           return(
            <h2>There has been an error in your request. Please double check to make sure that you didn't buff it</h2>
            )
        }
        return this.props.children
    }
}