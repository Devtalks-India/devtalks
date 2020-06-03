import React from 'react';
import { styles } from './styles';

const GridItem = ({ icon, link, className, customStyles = {} }) => {
  const classes = styles(customStyles);
  return (
      <div className={classes.gridItem}>
        <a className={className} href={link} rel="noopener noreferrer" target="_blank"><i className={`${icon} fab`} /></a>
      </div>
    );
};

export default GridItem;
