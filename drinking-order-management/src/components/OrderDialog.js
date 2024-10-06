import React, {Component} from 'react';

class OrderDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.order.items || [],
        };
    };

    // xu ly them do uong vao don hang
    // item co the la drinks hoac sidesDishes
    handleAddItem = (item) => {

        // khoi tao mot item moi
        const newItem = {
            id: Date.now(),
            item,
            name: '',
            price: 0,
            quantity: 1
        };

        // su dung spread operator de ket hop item moi voi danh sach cac item hien tai
        this.setState((prevState) => ({
            items: [...prevState.items, newItem]
        }));
    }

    // xu ly khi thay doi do uong hoac so luong 
    handleItemChange = (index, field, value) => {
        const newItems = this.state.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        );
        this.setState({ items: newItems });
    };

    
      


    // xu ly xac nhan luu don hang
    handleSave = () => {
        // lay ra order va onSave tu props
        const {order, onSave} = this.props;
        // dung spread operator de lay cac don hang da mua va cap nhat lai items neu co thay doi thuoc tinh
        onSave({...order, items: this.state.items});
    }

    render() {

        // lay ra data do uong va mon phu tu props, va state close dialog
        const {drinks, sidesDishes, onClose} = this.props;
        // lay ra items la danh sach don hang hien co tu state
        const {items} = this.state;
        // tinh tong tien cua don hang bang reduce()
        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        return (
            <div>
              <h2>Đơn hàng</h2>
              {items.map((order, index) => (
            <div key={order.id}>
              <select
                value={order.name}

                // neu mon duoc chon la do uong thi lay tu data drinks, nguoc lai lay tu sidesDishes
                // dong thoi cap nhat gia tien
                onChange={(e) => {
                  const selected = (order.item === 'drink' ? drinks : sidesDishes).find(d => d.name === e.target.value);
                  if (selected) {
                    this.handleItemChange(index, 'name', selected.name);
                    this.handleItemChange(index, 'price', selected.price);
                  }
                }}
              >
                <option value="">Chọn món</option>

                {/* neu chon them do uong thi lay data tu drinks gan len dropdown, tuong tu cho sidesDishes */}
                {(order.item === 'drink' ? drinks : sidesDishes).map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {/* input so luong */}
              <input
                type="number"
                value={order.quantity}
                min="1"
                style={{width: '50px', margin: '10px'}}
                onChange={(e) => this.handleItemChange(index, 'quantity', parseInt(e.target.value))}
              />
              <span style={{margin: '30px'}}>Giá: {order.price} VND</span>
            </div>
              ))}

              {/* hai button them do uong hoac mon phu */}
              <button style={{margin: '10px'}} onClick={() => this.handleAddItem('drink')}>Thêm thức uống</button>
              <button onClick={() => this.handleAddItem('sideDish')}>Thêm món phụ</button>

              <p>Tổng tiền: {totalPrice} VND</p>

              {/* button luu don hang va dong dialog */}
              <button style={{margin: '10px'}} onClick={this.handleSave}>Lưu đơn hàng</button>
              <button onClick={onClose}>Đóng</button>
            </div>
          );
            
            
        
    }



}

export default OrderDialog;