module.exports = (type, { componentName, width, height }) => {
	if (type === 'ts') {
		return `
        import React, { FC } from 'react';
        
        export interface ${componentName}Props {
            width?: number;
            height?: number;
        }
        
        const ${componentName}: FC<${componentName}Props> = ({ width = ${width}, height = ${height}, ...props }) => (
        `;
	}

	return `
        import React from 'react';
            
        const ${componentName} = ({ width = ${width}, height = ${height}, ...props }) => (
    `;
};
