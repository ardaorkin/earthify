import React, { useEffect } from 'react'

class DeviceAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: "none"
        }
        this.handleConfirmed = this.handleConfirmed.bind(this)
    }

    handleConfirmed = () => {
        this.setState({
            display: "none"
        })
    }
    render() {
        return (
            <>
                <div className="alert-component" style={{ display: this.state.display }}>
                    <div className="alert">
                    </div>
                    <div className="alert-card">
                        <p className="alert-text">No running app found.<br></br>Please run Spotify App in your device.</p>
                        <button className="alert-button" style={{ backgroundColor: "#00a800" }} onClick={this.handleConfirmed}>OK</button>
                    </div>
                </div>
            </>
        )

    }
}
export default DeviceAlert