import React, { useEffect, useState } from 'react';
import { fetchEvents } from './services/api';
import './App.css';
import logo from './logo.jpeg';
import Section from "./components/Section/Section";
import List from "./components/List/List";
import GridItem from "./components/GridItem/GridItem";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const [pastEvents, setPastEvents] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents()
      .then(({past = [], upcoming = []}) => {
        setPastEvents(past.reverse().splice(0, 3));
        setEvents(upcoming.splice(0, 3));
      })
        .catch((err) => {
          console.error(err);
        })
    ;
  }, []);
  return (
    <div className="App">
      <Navigation />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="grid">
          <div className="subscribeYoutube">
            <p>Due to COVID-19 outbreak, we have moved all of our meetups online.<br /> Please subscribe to our Youtube channel for updates.</p>
            <a href="https://www.youtube.com/channel/UCebZQVd6GoLtf6Y1uGlqKcQ" rel="noopener noreferrer" target="_blank"><i className="fab fa-youtube"></i> Devtalks India</a>
          </div>
          <Section>
            <h4>Past Events</h4>
            {pastEvents.length > 0 && pastEvents.map((e) => (
                <List key={e.id} title={e.title} description={`"on ${e.date} by ${e.speaker}`} />
            ))}
          </Section>
          <Section>
            <h4>Upcoming Events</h4>
            {events.length > 0 && events.map((e) => (
                <List key={e.id} title={e.title} description={`"on ${e.date} by ${e.speaker}`} />
            ))}
          </Section>
          <Section>
            <h4>Social Accounts</h4>
            <div className="socialIconContainers">
              <GridItem className="border" icon="fa-youtube" link="https://www.youtube.com/channel/UCebZQVd6GoLtf6Y1uGlqKcQ" />
              <GridItem icon="fab fa-twitter" link="https://twitter.com/DevtalksIndia" />
              <GridItem className="border" icon="fab fa-slack" link="https://devtalks01.slack.com/" />
              <GridItem icon="fab fa-github" link="https://github.com/Devtalks-India" />
            </div>

          </Section>
        </div>
        {/*<a
          className="App-link"
          href="https://www.meetup.com/DevTalks-India/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's talk!
        </a>*/}
      </header>
    </div>
  );
}

export default App;
