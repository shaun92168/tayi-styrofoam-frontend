import React, { useState } from 'react'
import FormatItem from './FormatItem'

function OrderForm(props) {
    const [hasSecondOrder, setHasSecondOrder] = useState(false)
    const [width, setWidth] = useState("")
    const [thickness, setThickness] = useState("")
    const [height, setHeight] = useState("")
    const [orderNum1, setOrderNum1] = useState("")
    const [amount1, setAmount1] = useState("")
    const [orderNum2, setOrderNum2] = useState("")
    const [amount2, setAmount2] = useState("0")
    const [styrofoamFormats, setStyrofoamFormats] = useState([])
    const [missingArgument, setMissingArguement] = useState(false)
    const [missingFormat, setMissingFormat] = useState(false)

    const clearSizeInput = () => {
        setWidth("")
        setThickness("")
        setHeight("")
        setAmount1("")
        setAmount2("0")
    }

    const clearAll = () => {
        clearSizeInput()
        setOrderNum1("")
        setOrderNum2("")
        setStyrofoamFormats([])
    }

    const handleHasSecondOrder = (e) => {
        setHasSecondOrder(e.target.checked)
        if (!hasSecondOrder) {
            setOrderNum2("")
            setAmount2("0")
        }
    }

    const handleWidth = (e) => {
        setWidth(e.target.value)
    }

    const handleThickness = (e) => {
        setThickness(e.target.value)
    }

    const handleHeight = (e) => {
        setHeight(e.target.value)
    }

    const handleOrderNum1 = (e) => {
        setOrderNum1(e.target.value)
    }

    const handleAmount1 = (e) => {
        setAmount1(e.target.value)
    }

    const handleOrderNum2 = (e) => {
        setOrderNum2(e.target.value)
    }

    const handleAmount2 = (e) => {
        setAmount2(e.target.value)
    }

    const handleAdd = e => {
        e.preventDefault()
        if (orderNum1 == "" || width == "" || thickness == "" || height == "" || amount1 == "") {
            setMissingArguement(true)
        } else if (hasSecondOrder && (orderNum2 == "" || amount2 == "0")) {
            setMissingArguement(true)
        } else {
            addStyrofoamFormat(width, thickness, height, amount1, amount2)
            setMissingArguement(false)
            clearSizeInput()
            document.getElementById('width-input').focus()
        }

    }

    const handleComplete = e => {
        if (styrofoamFormats.length == 0) {
            setMissingFormat(true)
        } else {
            setMissingFormat(false)
            props.addOrder(orderNum1, orderNum2, styrofoamFormats)
            clearAll()
        }
        e.preventDefault()
    }

    const addStyrofoamFormat = (width, thickness, height, amount1, amount2) => {
        const newStyrofoamFormat = {
            id: styrofoamFormats.length + 1,
            width: width,
            thickness: thickness,
            height: height,
            amount1: amount1,
            amount2: amount2,
            cutFormat: {
                cutFormatFoamThickness: 0,
                cutFormatFoamWidth: 0,
                cutFormatSet: 0,
                cutFormatSurplus: 0,
                cutFormatThicknessNum: 0,
                cutFormatWidth: 0,
                cutFormatWidthNum: 0
            }
        }
        const newStyrofoamFormats = [...styrofoamFormats, newStyrofoamFormat]
        setStyrofoamFormats(newStyrofoamFormats)
    }

    const deleteFormat = (id) => {
        var newStyrofoamFormats = []
        for (var i = 0; i < styrofoamFormats.length; i++) {
            if (styrofoamFormats[i].id != id) {
                if (styrofoamFormats[i].id > id) {
                    styrofoamFormats[i].id--
                }
                newStyrofoamFormats.push(styrofoamFormats[i])
            }
        }
        setStyrofoamFormats(newStyrofoamFormats)
    }

    return (
        <div className="form-container no-print">
            <form className="no-print" onSubmit={handleAdd}>
                {missingArgument ? <p className="alert-message">請填寫所有欄位</p> : null}
                {missingFormat ? <p className="alert-message">至少新增一個尺寸</p> : null}
                <div className="orderNum-container">
                    <div>
                        <p />
                        {hasSecondOrder ? "1. " : null}
                    訂單編號&nbsp;
                    <input type="text" className="orderNum-input" id="OrderNum1" onChange={handleOrderNum1} value={orderNum1} />
                        <input type="checkbox" onChange={handleHasSecondOrder} value={hasSecondOrder} id="hasSecondOrder" tabindex="-1" />
                        <label for="hasSecondOrder">雙編號</label>
                    </div>

                    {hasSecondOrder ?
                        <div className="secondOrder">
                            2. 訂單編號&nbsp;
                        <input type="text" className="orderNum-input" onChange={handleOrderNum2} value={orderNum2} />
                        </div> : null
                    }
                </div>

                <div className="styrofoamFormat-container">
                    <div className="firstFormat-container">
                        <p />
                        <input type="number" className="size-input" onChange={handleWidth} value={width} id="width-input" />
                    &nbsp;x&nbsp;
                    <input type="number" className="size-input" onChange={handleThickness} value={thickness} />
                    &nbsp;x&nbsp;
                    <input type="number" className="size-input" onChange={handleHeight} value={height} />
                    &nbsp;=&nbsp;
                    <input type="number" className="size-input" onChange={handleAmount1} value={amount1} />
                    </div>

                    {hasSecondOrder ?
                        <div className="secondFormat-container">
                            &nbsp;=&nbsp;
                        <input type="number" className="size-input" onChange={handleAmount2} value={amount2} />
                        </div> : null
                    }

                    <input type="submit" className="add-btn" value="新增" />
                </div>
            </form>
            {styrofoamFormats.map(styrofoamFormat => (
                <FormatItem
                    id={styrofoamFormat.id}
                    width={styrofoamFormat.width}
                    thickness={styrofoamFormat.thickness}
                    height={styrofoamFormat.height}
                    amount1={styrofoamFormat.amount1}
                    amount2={styrofoamFormat.amount2}
                    deleteFormat={deleteFormat}
                />
            ))}
            <div className="no-print">
                <button onClick={handleComplete}>完成</button>
            </div>
        </div>
    )
}

export default OrderForm