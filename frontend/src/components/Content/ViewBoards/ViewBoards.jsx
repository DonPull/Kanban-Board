import React, { useState, useEffect } from 'react';
import './ViewBoards.css';
import { useParams } from 'react-router-dom';

function ViewBoards() {
    const { projectId } = useParams();

    return (
        <div>The project (id) we are currently in: {projectId}</div>
    );
}

export default ViewBoards;
