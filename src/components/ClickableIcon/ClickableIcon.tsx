import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import '../styles/clickableIcon.css';

interface IProps {
  onClick: () => void;
  icon: IconDefinition;
}


export const ClickableIcon = (props: IProps) => {
  return (
    <a className="clickableIcon" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
    </a>

  );
}