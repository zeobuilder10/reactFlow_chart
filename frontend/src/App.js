import React, { Component, useState, useRef } from 'react'
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, Background } from 'react-flow-renderer'

import './App.css';
import { nodeMesure, nodeOperateur, nodeOutput } from './CustomNodes';

class App extends Component {
  render() {
    const initialElements = []
    let id = 0
    const getId = () => `node_${id++}`

    const onNodeDragStop = (event, node) => console.log('drag stop', node);

    const nodeTypes = {
      mesureNode: nodeMesure,
      operateurNode: nodeOperateur,
      outputNode: nodeOutput
    }

    const onDragStartMesure = (event, mesure_id) => {
      event.dataTransfer.setData('application/reactflow', mesure_id);
      event.dataTransfer.setData('application/adrien', 'mesure')
      event.dataTransfer.effectAllowed = 'move';
    }

    const onDragStartOperateur = (event, operateur_id) => {
      event.dataTransfer.setData('application/reactflow', operateur_id);
      event.dataTransfer.setData('application/adrien', 'operateur')
      event.dataTransfer.effectAllowed = 'move';
    }

    const onDragStartOutput = (event) => {
      event.dataTransfer.setData('application/adrien', 'output')
      event.dataTransfer.effectAllowed = 'move';
    }

    const mesures = {
      mesure_1: {
        label: 'mesure 1',
        nodeType: nodeTypes.mesureNode
      },
      mesure_2:{
        label: 'mesure 2',
        nodeType: nodeTypes.mesureNode
      },
      mesure_3:{
        label: 'mesure 3',
        nodeType: nodeTypes.mesureNode
      },
      mesure_4:{
        label: 'mesure 4',
        nodeType: nodeTypes.mesureNode
      }
    }

    const operateurs = {
      operateur_1: {
        label: '+',
        nodeType: nodeTypes.operateurNode,
        icon: 'plus',
        size:'big'
      },
      operateur_2: {
        label: '-',
        nodeType: nodeTypes.operateurNode,
        icon: 'minus',
        size:'big'
      },
      operateur_3: {
        label: 'x',
        nodeType: nodeTypes.operateurNode,
        icon: 'close',
        size:'big'
      }
    }

    const items = []
    for(const mesure in mesures) {
      items.push(<div className='button-mesure' onDragStart={(event) => onDragStartMesure(event, mesure)} draggable>{ mesures[mesure].label }</div>)
    }
    items.push(<div className='button-output' onDragStart={(event) => onDragStartOutput(event)} draggable>Output</div>)

    const items_operateur = []
    for(const operateur in operateurs) {
      items_operateur.push(<div className='button-operateur' onDragStart={(event) => onDragStartOperateur(event, operateur)} draggable>{ operateurs[operateur].label }</div>)
    }

    const DnDFlow = () => {
      const reactFlowWrapper = useRef(null);
      const [reactFlowInstance, setReactFlowInstance] = useState(null);
      const [elements, setElements] = useState(initialElements);
      const onConnect = (params) => setElements((els) => addEdge(params, els));
      const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els))

      const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance)

      const onDragOver = (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
      }

      const onDrop = (event) => {
        event.preventDefault()

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const dataAdrien = event.dataTransfer.getData('application/adrien')
        if (dataAdrien === 'mesure') {
          const data = event.dataTransfer.getData('application/reactflow')
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          })
          const newNode = {
            id: getId(),
            type: 'mesureNode',
            position,
            data: { label: mesures[data].label },
          }

          setElements((es) => es.concat(newNode))
        } else if (dataAdrien === 'operateur') {
          const data = event.dataTransfer.getData('application/reactflow')
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          })
          const newNode = {
            id: getId(),
            type: 'operateurNode',
            position,
            data: { label: operateurs[data].label, icon: operateurs[data].icon, size: operateurs[data].size },
          }

          setElements((es) => es.concat(newNode))
        } else if (dataAdrien === 'output') {
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          })
          const newNode = {
            id: getId(),
            type: 'outputNode',
            position,
            data: { label: dataAdrien },
          }

          setElements((es) => es.concat(newNode))
        }
      }

      return (
        <div>
          <ReactFlowProvider>
            <div className='reactflow-wrapper' ref={reactFlowWrapper}>
              <ReactFlow
                elements={elements}
                onConnect={onConnect}
                onElementsRemove={onElementsRemove}
                onLoad={onLoad}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                snapToGrid={true}
                onNodeDragStop={onNodeDragStop}
              >
                <Controls />
                <Background />
              </ReactFlow>
            </div>
            <div className='div-aside'>
              <aside className='aside-mesure'>
                { items }
              </aside>
              <aside className='aside-operateur'>
                { items_operateur }
              </aside>
            </div>
          </ReactFlowProvider>
        </div>
      )
    }

    return (
      <div>
        <DnDFlow />
      </div>
    );
  }
}

export default App