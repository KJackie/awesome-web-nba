import React, { useState } from 'react';
import { FcInfo } from 'react-icons/fc';

const Labels = ({ short, desc }) => {
	const [description, setDescription] = useState(false);

	function showDescription() {
		setDescription(true);
	}

	function close() {
		setDescription(false);
	}

	return (
		<div className='label'>
			<p>{short}</p>
			<FcInfo
				className='info-icon'
				onMouseOver={showDescription}
				onMouseOut={close}
			/>
			{description && <p className='description-bar'>{desc}</p>}
		</div>
	);
};

export default Labels;
