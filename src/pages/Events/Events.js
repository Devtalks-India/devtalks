import React from 'react';
import Navigation from "../../components/Navigation/Navigation";
import './Events.css';

const Events = () => {
  return (
		<div>
		  <Navigation withLogo />
		  <div className="event-container">
			<div className="title">
			  
			  <h1>Online - Devtalks meetup #12 - DynamoDB - NoSQL database</h1>
			  <span>Saturday, August 8, 2020 11:00 AM to 1:00 PM GMT+5:30</span>
			</div>
		  </div>
		  <div className="flex-container">
			<div className="event-details">
			  <h2 style={{ paddingLeft: "2%" }}>Details</h2>
			  <ul className="agenda-list">
				<li>Introduction (What/Why) to DynamoDB</li>
				<li>SQL vs NOSQL</li>
				<li>Q & A</li>
				<li>Creating Access Pattern</li>
				<li>Real-World Example</li>
				<li>Q & A</li>
			  </ul>
			</div>
			<div className="attend-event">
			  <h2 style={{ paddingLeft: "2%" }}>Are you Attending? </h2>
			  <label className="switch">
				<input type="checkbox" />
				<span className="slider round"></span>
			  </label>
			</div>
		  </div>
		  
		  <div className="flex-container">
			<div className="event-details">
			  <h2 style={{ paddingLeft: "2%" }}>Attendees (20)</h2>
			  <ul className="agenda-list">
				<li>Sarab Singh</li>
				<li>Tarun Nagpal</li>
				<li>Jagdeep Singh</li>
				<li>Rishabh Singh</li>
				<li>Prashant Singh</li>
			  </ul>
			</div>
			<div className="attend-event">
			  <h2 style={{ paddingLeft: "2%" }}>Speaker Details</h2>
			    <div class="card">
				  <img src="https://www.w3schools.com/w3images/team2.jpg" alt="John" style={{width:"100%"}} />
				  <h1>Tarun Nagpal</h1>
				  <p class="title">JavaScript Developer, DevTalks</p>
				  <p>DevTalks</p>
				  <p><button>Contact</button></p>
				</div>
			</div>
		  </div>
		</div>

  );
};

export default Events;
