

import React, { Component } from 'react'
import Products from './components/Products'
import Filter from './components/Filter';
import Basket from './components/Basket';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import store from './store'

// const store = createStore(()=>{}, {});

export default class App extends Component {

  state = {
    products: [],
    filteredProducts: [],
    sort: '',
    size: '',
    cartItems: []
  }

  componentDidMount(){
    fetch("http://localhost:8000/products")
    .then(res => res.json())
    . then(data => this.setState({
        products: data,
        filteredProducts: data
    }))
  }

  handleChangeSort = (e) => {
    this.setState({
      sort: e.target.value
    })
    this.listProducts()
  }

  handleChangeSize = (e) => {
    this.setState({
      size: e.target.value
    })
    this.listProducts()
  }

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems
      let productsAlreadyInCart = false
      cartItems.forEach( item => {
        if(item.id === product.id){
          productsAlreadyInCart = true
          item.count++
        }
      })
      if(!productsAlreadyInCart){
        cartItems.push({...product, count: 1})
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return cartItems
    })
  }

  handleRemoveItemFromCart  = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter( elm => elm.id !== product.id)
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return { cartItems: cartItems}
    })
  }

  listProducts = () => {
    this.setState( state => {
      if(state.sort !== ''){
        state.products.sort((a,b) => (state.sort === 'lowest' 
        ? (a.price > b.price ? 1: -1)
        : (a.price < b.price ? 1: -1)
        ))
      } else {
        state.products.sort((a,b) => (a.id < b.di ?1: -1))
      }

      if(this.state.size !== ''){
        return {
          filteredProducts: this.state.products.filter( a => 
            a.availableSizes.indexOf(this.state.size.toUpperCase()) >= 0
          )
        }
    
      }
      return { filteredProducts: this.state.products}
    }) 

    
  }
  render() {
    return (
      <Provider store={store}>

      <div className="container">
      <h1>Ecommerce Shopping Cart App</h1>
      <hr />
      <div className="row"> 
        <div className="col-md-8">
        <Filter size={this.state.size} 
          sort={this.state.sort}
          handleChangeSize={this.handleChangeSize}
          handleChangeSort={this.handleChangeSort}
          count={this.state.filteredProducts.length}
        />
        <hr/>
          <Products 
            products={this.state.filteredProducts} 
            handleAddToCart={this.handleAddToCart} 
            />
        </div>
        <div className="col-md-4">
          <Basket 
            cartItems={this.state.cartItems}
            handleRemoveItemFromCart={this.handleRemoveItemFromCart}
            />
        </div>
      </div>
    </div>
    </Provider>

    )
  }
}

