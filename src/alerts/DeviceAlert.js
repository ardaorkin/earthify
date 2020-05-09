/*
    This file is part of Earthify.

    Earthify is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Earthify is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Earthify.  If not, see <https://www.gnu.org/licenses/>.
*/
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