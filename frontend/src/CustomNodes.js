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
                style={{ background: 'black', width: '10px', height: '10px' }}
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
                style={{ background: 'black', width: '10px', height: '10px'}}
            />
            <div className='node-output'>
                output
            </div>
        </>
    )
}

const nodeOperateur = ({ data, isConnectable }) => {

    var item = undefined
    if (data.icon) {
        item = 
        <div className='node-operateur'>
                <Icon size={data.size} name={data.icon}/>
        </div>
    } else {
        item = 
            <div className='node-operateur-label'>
                { data.label }
            </div>
    }

    return (
        <>
            <Handle 
                type="target"
                position="left"
                id="operateur_a"
                style={{ top: 10, background: 'black', width: '10px', height: '10px' }}
                isConnectable={isConnectable}
            />
            <Handle 
                type="target"
                position="left"
                id="operateur_b"
                style={{ bottom:10, background: 'black', width: '10px', height: '10px' }}
                isConnectable={isConnectable}
            />
            { item }
            <Handle 
                type="source"
                position="right"
                id="operateur_c"
                style={{ background: 'black', width: '10px', height: '10px' }}
                isConnectable={isConnectable}
            />
        </>
    )
}

export { nodeMesure, nodeOperateur, nodeOutput }