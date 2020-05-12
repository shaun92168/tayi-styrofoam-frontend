import React, { useState } from 'react'

function OrderItem(props) {
    const handleButton = () => {
        props.deleteOrder(props.id)
    }

    return (
        <div className="OrderItem-container">
            <div className="OrderNum-container">
                <div className="OrderNum">{props.orderNum1}</div>
                {props.hasTwoOrder ?
                    <div className="OrderNum">{props.orderNum2}</div>
                    : null}
                <button className="delete-order-btn no-print" onClick={handleButton}>X</button>
            </div>
            {props.styrofoamFormats.map(styrofoamFormat => (
                <div className="Format-container">
                    <div className="StyrofoamFormat-container">
                        <div className="amount">
                            {styrofoamFormat.width} x {styrofoamFormat.thickness} x {styrofoamFormat.height} = {styrofoamFormat.amount1}
                        </div>
                        {props.hasTwoOrder ?
                            <div className="amount"> = {styrofoamFormat.amount2}</div>
                            : null}
                    </div>
                    {props.calculated ?
                        <div className="CutFormat-container">
                            {styrofoamFormat.cutFormat.cutFormatWidth}/{styrofoamFormat.cutFormat.cutFormatSet}丸 多{styrofoamFormat.cutFormat.cutFormatSurplus}, {styrofoamFormat.cutFormat.cutFormatFoamWidth}x{styrofoamFormat.cutFormat.cutFormatWidthNum}, {styrofoamFormat.cutFormat.cutFormatFoamThickness}x{styrofoamFormat.cutFormat.cutFormatThicknessNum}
                        </div>
                        : null}

                </div>
            ))}
        </div>
    )
}

export default OrderItem