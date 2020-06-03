import React, { useEffect, useState } from 'react';
import { fetchSpeakers } from '../../services/api';
import Navigation from "../../components/Navigation/Navigation";
import User from "../../components/User/User";
import './speakers.css';

const Speakers = () => {
  const [ speakers, setSpeakers ] = useState([]);

  useEffect(() => {
    fetchSpeakers().then(setSpeakers);
  }, []);

  return (
      <div>
        <Navigation withLogo />
        <div className="speakers">
          {speakers.map((speaker) => <User user={speaker} key={speaker.id} />)}
        </div>
      </div>
  );
};

export default Speakers;
