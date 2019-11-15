

import React, { Component } from 'react'
import Products from './components/Products'
import Filter from './components/Filter';
export default class App extends Component {

  state = {
    products: [],
    filteredProducts: [],
    sort: ''
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
    }) 
  }
  render() {
    return (
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
      </div>
    </div>
    )
  }
}

