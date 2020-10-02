import React, { Component } from 'react';
class Homepage extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  changedata(data) {
    this.setState({ code: data })
  }

  render() {

    return (
      <div className="animated fadeIn" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>

        <h1>Dashboards Home</h1>
      </div >
    );
  }
}

export default Homepage;