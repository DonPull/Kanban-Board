import React, { useState, useEffect } from 'react';

function BoardCard() {
    return (
        <div className='board-card flex column'>
            <label className='board-card-title'>Frontend</label>
            <div className='board-card-info-container flex'>
                <label>Columns <span className='span-badge'>5</span></label>
                <div className='separator-vertical'/>
                <label>Tasks <span className='span-badge'>31</span></label>
            </div>
        </div>
    );
}

export default BoardCard;