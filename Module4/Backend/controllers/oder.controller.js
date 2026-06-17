const orderModel = require('../models/oders.model');

//method: Post
//process: create a new order
//access  admin and user only
exports.createOrder = async (req, res, next) =>{
    try{
       
        const newOrder = new orderModel(
            {
                userId: req.body.userId,
                orders: req.body.orders,
                totalAmount: req.body.totalAmount
            });

        const savedOrder = await newOrder.save();
        res.status(201).json({message: "OrderPlaced", savedOrder});
    }catch(err) {
       next(err);
    }
}


//method: Get
//process: Get all orders
//access to admin user 
exports.getAllOrders = async (req, res, next) => {
  try {
     
    const orders = await orderModel.find()
      .populate('userId', 'username email') // populate user details
      .populate('orders.productId', 'title price'); // populate product details
    res.json(orders);

  } catch(err) {
       next(err);
    }
};

//method: Get
//process: Get order by id
//access to admin user 
exports.getOrderById = async (req, res, next) => {
  try {
    
    const order = await orderModel.findById(req.params.id)
      .populate('userId', 'username email')
      .populate('orders.productId', 'title price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch(err) {
       next(err);
    }
};

//method: Get
//process: Get order by userid
//access to admin user 
exports.getOrderByUserId = async (req, res, next) => {
  try {
   
    const order = await orderModel.findOne({userId : req.params.id})
      .populate('userId', 'username email')
      .populate('orders.productId', 'title price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch(err) {
       next(err);
    }
};

//method: Put
//process: Update order by id
//access to admin user 
exports.updateOrder = async (req, res) => {
  try {
   
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch(err) {
       next(err);
    }
};

//method: Delete
//process: Delete order by id
//access to admin 
exports.deleteOrder = async (req, res) => {
  try {
    
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch(err) {
       next(err);
    }
};