import React, { useState } from 'react';

import '../styles/Node.css';
import Arrow from '../../images/arrow.png';

function EndNode(props) {
  const [backgroundColor, setColor] = useState('#FF6188');
  const [isHighlited, setHighlited] = useState(false);
  return (
    <div
      // draggable="true"
      className={'node'}
      style={{
        backgroundColor: 'red',
        backgroundSize: 'contain',
        width: '2%',
        paddingBottom: '2%',
      }}
      // onDragOver={(e) => {
      //   setColor('#FFFFFF');
      //   setHighlited(true);
      // }}
    ></div>
  );
}
export default EndNode;
