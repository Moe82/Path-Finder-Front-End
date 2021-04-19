import React, { useState } from 'react';

import '../styles/Node.css';

function Node(props) {
	const [backgroundColor, setColor] = useState('#FFFFFF');
	const [isHighlited, setHighlited] = useState(false);
	return (
		<div
			draggable="true"
			className={'node'}
			style={{
				backgroundColor: backgroundColor,
				width: '2%',
				paddingBottom: '2%',
			}}
			onDragOver={(e) => {
				setColor('#2D2A2E');
				setHighlited(true);
			}}
		/>
	);
}
export default Node;
