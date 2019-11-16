import React, { Component } from 'react'

export default class Basket extends Component {
    render() {
        const {cartItems} = this.props
        return (
            <div className="alert alert-info">
                {cartItems.length === 0 ?
                    "Basket is empty" :
                    <div>You have {cartItems.length} in Basket </div>
                }

                {cartItems.length > 0 && 
                    <div>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <b>{item.title}</b>
                                    x {item.count}
                                    <button className="btn btn-danger"
                                    onClick={(e) => this.props.handleRemoveItemFromCart(e, item)}
                                    >x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        )
    }
}
