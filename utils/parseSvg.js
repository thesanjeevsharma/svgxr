module.exports = str => {
	const allProps = str.replace('<svg', '').replace('>', '').split(' ');

	const widthProp = allProps.find(prop => prop.startsWith('width'));
	const heightProp = allProps.find(prop => prop.startsWith('height'));
	const viewBoxProp = allProps.find(prop => prop.startsWith('viewBox'));

	const remainingProps = allProps.filter(
		prop =>
			prop.includes('=') &&
			!['width', 'height', 'viewBox'].includes(prop.split('=')[0])
	);

	const width = widthProp.split('=')[1].replace(/"/g, '');
	const height = heightProp.split('=')[1].replace(/"/g, '');
	const restProps = {};

	remainingProps.forEach(prop => {
		const [key, value] = prop.split('=');
		restProps[key] = value;
	});

	return { width, height, restProps };
};
