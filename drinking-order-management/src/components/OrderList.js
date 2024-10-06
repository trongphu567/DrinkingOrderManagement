import React,{Component} from 'react';

class OrderList extends Component {

    
    render() {
        // nhan props truyen vao tu App
        const {orders, onEdit, onDelete} = this.props;

        return (
            <div className="table-container">
                <h2>Danh sách đơn hàng</h2>
                {
                    orders.length === 0 ? (
                        <p>Chưa có đơn hàng nào</p>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ngày</th>
                                    <th>Tổng tiền</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order) => (
                                        // them key de React phan biet cac phan tu
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{new Date(order.date).toLocaleDateString('en-GB')}</td>
                                            <td>
                                                {
                                                    // tinh tong tien cua don hang su dung reduce
                                                    // acc la bien tich luy tong tien, item la don hang hien tai
                                                    order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
                                                }
                                            </td>
                                            <td>
                                                <button onClick={() => onEdit(order)}>Sửa</button>
                                                <button className='delete' onClick={() => onDelete(order.id)}>Xóa</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        );
    }
}

export default OrderList;