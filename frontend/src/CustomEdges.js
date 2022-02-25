import React from "react";
import { getBezierPath, getMarkerEnd } from "react-flow-renderer";

import './App.css'

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    arrowHeadType,
    markerEndId,
}) {
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

    return (
        <>
            <path 
                id={id}
                style={{strokeWidth: 10}}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
        </>
    )
}