export const mockData = {
  users: [
    { mobile: '9876543210', type: 'customer' as const, name: 'Ravi Kumar' },
    { mobile: '9123456789', type: 'agent' as const, name: 'Agent Sharma' },
  ],

  items: [
    { id: '1', name: 'Fresh Milk', icon: '🥛', price: 25, unit: 'per 500ml', brand: 'Amul', description: 'Fresh daily milk' },
    { id: '2', name: 'Pure Water', icon: '💧', price: 20, unit: 'per bottle', brand: 'Bisleri', description: 'Pure drinking water' },
    { id: '3', name: 'Fresh Curd', icon: '🧀', price: 40, unit: 'per 200g', brand: 'Heritage', description: 'Fresh homemade curd' },
    { id: '4', name: 'Groceries', icon: '🛒', price: 150, unit: 'per pack', brand: 'Local Store', description: 'Daily grocery items' },
    { id: '5', name: 'Vegetables', icon: '🥬', price: 80, unit: 'per kg', brand: 'Fresh Farm', description: 'Fresh vegetables' },
    { id: '6', name: 'Fruits', icon: '🍎', price: 120, unit: 'per kg', brand: 'Organic', description: 'Fresh organic fruits' },
  ],

  suggestions: [
    { id: '1', text: '🎯 Try Premium Organic Milk - Special Offer!', color: '#E74C3C' },
    { id: '2', text: '💧 Switch to RO Water - Health Benefits!', color: '#3498DB' },
    { id: '3', text: '🥬 Fresh Vegetables Daily - Order Now!', color: '#2ECC71' },
  ],

  customers: [
    {
      id: '1', name: 'Ravi Kumar', mobile: '9876543210', apartment: 'Merlion Apartments',
      tower: 'A', flat: '101', delivered: 28, pending: 2, total: 750
    },
    {
      id: '2', name: 'Sita Patel', mobile: '9123456789', apartment: 'Sri Krishna Complex',
      tower: 'B', flat: '202', delivered: 25, pending: 5, total: 625
    },
  ],

  payments: [
    {
      id: '1', customerName: 'Ravi Kumar', mobile: '9876543210', item: 'Fresh Milk',
      amount: 840, dueDate: '2024-01-31', status: 'overdue' as const, daysOverdue: 5
    },
    {
      id: '2', customerName: 'Sita Patel', mobile: '9123456789', item: 'Fresh Milk',
      amount: 750, dueDate: '2024-01-31', status: 'pending' as const
    },
  ],
};