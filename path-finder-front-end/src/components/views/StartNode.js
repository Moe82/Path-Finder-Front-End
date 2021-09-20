import React, { useState } from 'react';

import '../styles/Node.css';
import Arrow from '../../images/arrow.png';

function StartNode(props) {
	const [backgroundColor, setColor] = useState('#A9DC76');
	const [isHighlited, setHighlited] = useState(false);
	return (
		<div
			// draggable="true"
			className={'node'}
			style={{
				backgroundColor: backgroundColor,
				backgroundSize: 'contain',
				width: '2%',
				paddingBottom: '2%',
			}}
		></div>
	);
}
export default StartNode;
