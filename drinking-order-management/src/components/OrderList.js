import React,{Component} from 'react';

class OrderList extends Component {

    
    render() {
        const {orders, onEdit, onDelete} = this.props;
        return (
            <div>
                <h2>Danh sách đơn hàng</h2>
                {
                    orders.length === 0 ? (
                        <p>Chưa có đơn hàng nào</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ngày</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order) => (
                                        // them key de React phan biet cac phan tu
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>
                                                <button onClick={() => onEdit(order)}>Sửa</button>
                                                <button onClick={() => onDelete(order.id)}>Xóa</button>
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