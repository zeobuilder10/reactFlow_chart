import React from 'react';

import { Handle } from 'react-flow-renderer';
import { Icon } from 'semantic-ui-react'


const nodeMesure = ({ data, isConnectable }) => {
    return (
        <>
            <div className='node-mesure'>
                { data.label }
            </div>
            <Handle 
                type="source"
                position="right"
                id="mesure_a"
                style={{ background: 'black' }}
                isConnectable={isConnectable}
            />
        </>
    )
}

const nodeOutput = ({ data, isConnectable })  => {
    return (
        <>
            <Handle 
                type="target"
                position="left"
                id="output_a"
                style={{ background: 'black' }}
                isConnectable={isConnectable}
            />
            <div className='node-output'>
                output
            </div>
        </>
    )
}

const nodeOperateur = ({ data, isConnectable }) => {
    return (
        <>
            <Handle 
                type="target"
                position="left"
                id="operateur_a"
                style={{ top: 10, background: 'black' }}
                isConnectable={isConnectable}
            />
            <Handle 
                type="target"
                position="left"
                id="operateur_b"
                style={{ bottom:10, background: 'black' }}
                isConnectable={isConnectable}
            />
            <div className='node-operateur'>
                <Icon size={data.size} name={data.icon}/>
            </div>
            <Handle 
                type="source"
                position="right"
                id="operateur_c"
                style={{ background: 'black' }}
                isConnectable={isConnectable}
            />
        </>
    )
}

export { nodeMesure, nodeOperateur, nodeOutput }