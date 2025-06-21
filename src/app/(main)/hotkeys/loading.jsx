


import KeyRow from "../../components/KeyRow";
import "../../stylesheets/hotkeys.css";


export default function Hotkeys() {
    return (
        <div className="page">
            <h1>Hotkeys</h1>
            <p>Hotkeys allow you to navigate through the calendar quickly. If you're on desktop, try it out! It's blazingly fast.</p>
            <p>Here's a quick one. Try pressing "B" to go back.</p>
            <div style={{height: "1px"}}></div>
            <KeyRow action="Back" keys="B" />
            <div style={{height: "1px"}}></div>
            <p>Cool right? Now, here's a list of all the hotkeys:</p>
            <div style={{fontWeight: "bold", marginTop: "30px", marginBottom: "25px"}}>
                <KeyRow action="What it does" keys="The keys(s)" />
            </div>
            <KeyRow action="Go to present (this week)" keys="P" />
            <div style={{height: "1px"}}></div>
            <KeyRow action="Sunday" keys="S+U" />
            <KeyRow action="Monday" keys="M" />
            <KeyRow action="Tuesday" keys="T+U" />
            <KeyRow action="Wednesday" keys="W" />
            <KeyRow action="Thursday" keys="T+H" />
            <KeyRow action="Friday" keys="F" />
            <KeyRow action="Saturday" keys="S+A" />
            <div style={{height: "1px"}}></div>
            <KeyRow action="Next week" keys="K" />
            <KeyRow action="Previous week" keys="J" />
            <div style={{height: "1px"}}></div>
            {/* <p style={{width: "90%", margin: "auto"}}>While in each day memo,</p> */}
            <KeyRow action="Next day" keys="L" />
            <KeyRow action="Previous day" keys="H" />
            <div style={{height: "1px"}}></div>
            <KeyRow action="Focus to write text" keys="I" />
            <KeyRow action="Unfocus" keys="Esc" />
            <div style={{height: "1px"}}></div>


            <p>Changing days or focusing/unfocusing is only for the day memo page.</p>
        </div>
    )
}