import React, { useState } from 'react'
import OrderForm from './OrderForm'
import OrderItem from './OrderItem'
import axios from "axios"

function OrderList(props) {
    const exampleOrders = [
        {
            id: 1,
            orderNum1: "#1111",
            hasTwoOrder: true,
            styrofoamFormats: [
                {
                    width: "250",
                    thickness: "180",
                    height: "40",
                    amount1: "200",
                    amount2: "200",
                    cutFormat: {
                        cutFormatFoamThickness: 180,
                        cutFormatFoamWidth: 40,
                        cutFormatSet: 4,
                        cutFormatSurplus: 0,
                        cutFormatThicknessNum: 4,
                        cutFormatWidth: 100,
                        cutFormatWidthNum: 25
                    }
                },
                {
                    width: "285",
                    thickness: "80",
                    height: "35",
                    amount1: "400",
                    amount2: "400",
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
            ],
            orderNum2: "#2222"
        },
        {
            id: 2,
            orderNum1: "#1001",
            hasTwoOrder: false,
            styrofoamFormats: [
                {
                    width: "200",
                    thickness: "200",
                    height: "55",
                    amount1: "640",
                    amount2: "0",
                    cutFormat: {
                        cutFormatFoamThickness: 0,
                        cutFormatFoamWidth: 0,
                        cutFormatSet: 0,
                        cutFormatSurplus: 0,
                        cutFormatThicknessNum: 0,
                        cutFormatWidth: 0,
                        cutFormatWidthNum: 0
                    }
                },
                {
                    width: "280",
                    thickness: "280",
                    height: "12",
                    amount1: "320",
                    amount2: "0",
                    cutFormat: {
                        cutFormatFoamThickness: 0,
                        cutFormatFoamWidth: 0,
                        cutFormatSet: 0,
                        cutFormatSurplus: 0,
                        cutFormatThicknessNum: 0,
                        cutFormatWidth: 0,
                        cutFormatWidthNum: 0
                    }
                },
                {
                    width: "285",
                    thickness: "80",
                    height: "55",
                    amount1: "320",
                    amount2: "0",
                    cutFormat: {
                        cutFormatFoamThickness: 0,
                        cutFormatFoamWidth: 0,
                        cutFormatSet: 0,
                        cutFormatSurplus: 0,
                        cutFormatThicknessNum: 0,
                        cutFormatWidth: 0,
                        cutFormatWidthNum: 0
                    }
                },
                {
                    width: "285",
                    thickness: "130",
                    height: "55",
                    amount1: "320",
                    amount2: "0",
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
            ],
            orderNum2: ""
        }
    ]
    const [calculated, setCalculated] = useState(false)
    const [orders, setOrders] = useState([])

    const addOrder = (orderNum1, orderNum2, styrofoamFormats) => {
        let hasTwoOrder = orderNum2 != ""
        const newOrder = {
            id: orders.length + 1,
            orderNum1: orderNum1,
            hasTwoOrder: hasTwoOrder,
            styrofoamFormats: styrofoamFormats,
            orderNum2: orderNum2
        }
        const newOrders = [...orders, newOrder]
        setOrders(newOrders)
    }

    const deleteOrder = (id) => {
        var newOrders = []
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].id != id) {
                if (orders[i].id > id) {
                    orders[i].id--
                }
                newOrders.push(orders[i])
            }
        }
        setOrders(newOrders)
    }

    const createCutFormats = () => {
        var newCutFormats = []
        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < orders[i].styrofoamFormats.length; j++) {
                var newCutFormat = {
                    width: parseInt(orders[i].styrofoamFormats[j].width),
                    thickness: parseInt(orders[i].styrofoamFormats[j].thickness),
                    height: parseInt(orders[i].styrofoamFormats[j].height),
                    amount: parseInt(orders[i].styrofoamFormats[j].amount1) + parseInt(orders[i].styrofoamFormats[j].amount2),
                }
                console.log(newCutFormat)
                newCutFormats.push(newCutFormat)
            }
        }
        return newCutFormats
    }

    const calculateCutFormats = () => {
        var cutFormats = createCutFormats()
        console.log(cutFormats)
        axios.post(`http://ec2-54-238-221-188.ap-northeast-1.compute.amazonaws.com:8080/styrofoam/cutFormats`, cutFormats).then(json => {
            var newOrders = orders
            var current_order = 0
            var current_styrofoamFormat = 0
            for (var i = 0; i < json.data.length; i++) {
                if (current_styrofoamFormat == newOrders[current_order].styrofoamFormats.length) {
                    current_order++
                    current_styrofoamFormat = 0
                }
                var newCutFormat = {
                    cutFormatWidth: json.data[i].width,
                    cutFormatSet: json.data[i].set,
                    cutFormatSurplus: json.data[i].surplus,
                    cutFormatFoamWidth: json.data[i].styrofoam_width,
                    cutFormatFoamThickness: json.data[i].styrofoam_thickness,
                    cutFormatWidthNum: json.data[i].width_num,
                    cutFormatThicknessNum: json.data[i].thickness_num
                }
                newOrders[current_order].styrofoamFormats[current_styrofoamFormat].cutFormat = newCutFormat
                current_styrofoamFormat++
            }
            setOrders(newOrders)
            setCalculated(true)
        })
    }

    const clearCalculated = () => {
        setCalculated(false)
    }

    return (
        <div className="list">

            <OrderForm addOrder={addOrder}></OrderForm>
            <button className="no-print print-btn" onClick={window.print}>Print</button>
            <button className="no-print print-btn" onClick={calculateCutFormats}>計算</button>
            <button className="no-print print-btn" onClick={clearCalculated}>清除計算</button>
            {orders.map(order => (
                <OrderItem
                    id={order.id}
                    hasTwoOrder={order.hasTwoOrder}
                    orderNum1={order.orderNum1}
                    orderNum2={order.orderNum2}
                    styrofoamFormats={order.styrofoamFormats}
                    calculated={calculated}
                    deleteOrder={deleteOrder}
                />
            ))}
        </div>
    )
}

export default OrderList