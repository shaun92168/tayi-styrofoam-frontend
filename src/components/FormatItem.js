import React, { useState } from 'react'

function FormatItem(props) {
    let hasTwoOrders = props.amount2 != "" && props.amount2 != "0"

    const handleButton = () => {
        props.deleteFormat(props.id)
    }

    return (
        <div className="FormatItem-container no-print">
            <div className="firstFormat-container">
                {props.width} x {props.thickness} x {props.height} = {props.amount1}
            </div>
            {hasTwoOrders ? 
                <div className="firstFormat-container">
                    = {props.amount2}
                </div>
            : null}

            <button className="delete-btn" onClick={handleButton}>刪除</button>
        </div>
    )
}

export default FormatItem