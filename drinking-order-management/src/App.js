import logo from './logo.svg';
import React, {Component} from 'react';
import {drinks, sidesDishes} from './data';
import './App.css';
import OrderList from './components/OrderList';
import OrderDialog from './components/OrderDialog';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// function TestComponent() {
//     return (
//         <div>
//             <h1>Test Component</h1>
//             <p>This is a test component.</p>
//         </div>
//     );
// }

// do import Component o tren roi nen duoi day k can ghi la React.Component nua
class App extends Component {

    constructor(props) {
        super(props);
        // khoi tao trang thai ban dau k co don hang nao
        this.state = {
            orders: [],
            currentOrder: null,
            isDialogOpen: false
        };

    };

    // xu ly them do uong vao don hang
    addOrderItem = () => {
        const newOrder = {
            id: Date.now(),
            date: new Date().toLocaleDateString('en-GB'),
            items: []
        };
        // cap nhat trang thai de hien thi dialog la them do uong
        this.setState({currentOrder: newOrder, isDialogOpen: true});
    };

    // xu ly chinh sua do uong trong don hang
    editOrderItem = (order) => {

        // cap nhat trang thai de hien thi dialog la chinh sua do uong
        this.setState({currentOrder: order, isDialogOpen: true});
    };

    // xu ly xoa do uong trong don hang
    deleteOrderItem = (orderId) => {
        this.setState((prevState) => (
            {
                // loc ra cac don hang khong phai la don hang can xoa
                orders: prevState.orders.filter((order) => order.id !== orderId),
            }
        )
    );
    };

    // xu ly luu don hang
    saveOrder = (order) => {
        // lay ra danh sach cac don hang hien tai (su dung destructuring)
        const {orders} = this.state;
        // kiem tra don hang co ton tai trong danh sach cac don hang hay khong
        const existingOrder = orders.find((o) => o.id === order.id);

        if (existingOrder) {
            // cap nhat lai don hang neu don hang da ton tai
            this.setState({
                orders: orders.map((o) => (o.id === order.id ? order : o)),
                isDialogOpen: false
            });
        }
        else {
            // them don hang moi vao danh sach cac don hang
            this.setState({
                // su dung spread operator de them tat ca cac don hang hien tai va don hang moi vao mang
                orders: [...orders, order],
                isDialogOpen: false
            });
        }
    };


    render() {
        // lay ra cac trang thai
        const {orders, currentOrder, isDialogOpen} = this.state;
        return (
            <div className="App">
                <h1>Quản lý đơn hàng bán thức uống đơn giản</h1>
                <button onClick={this.addOrderItem}>Thêm đơn hàng</button>

                {/* goi component OrderList va truyen props vao */}
                <OrderList
                    orders={orders}
                    onEdit={this.editOrderItem}
                    onDelete={this.deleteOrderItem}
                />

                {/* hien thi dialog khi them hoac chinh sua do uong */}
                {
                    isDialogOpen && (
                        <OrderDialog
                            order={currentOrder}
                            onSave={this.saveOrder}
                            onClose={() => this.setState({isDialogOpen: false})}
                            drinks={drinks}
                            sidesDishes={sidesDishes}
                        />
                    )
                }
                
            </div>
            
            
            
        )
    }
}

export default App;
