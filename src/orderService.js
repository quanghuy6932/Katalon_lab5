class OrderService {
  constructor(apiClient, emailService) {
    this.apiClient = apiClient;
    this.emailService = emailService;
  }
  calculateTotal(items) {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  applyDiscount(total, percent) {
    return total - (total * (percent / 100));
  }
  async createOrder(userId, items, discount = 0) {
    try {
      const user = await this.apiClient.get(`/users/${userId}`);
      const finalTotal = this.applyDiscount(this.calculateTotal(items), discount);
      const res = await this.apiClient.post('/orders', { userId, total: finalTotal });
      if (res.status === 201) {
        this.emailService.sendEmail(user.email, 'Order Success', `Paid: ${finalTotal}`);
        return { success: true, total: finalTotal };
      }
      return { success: false };
    } catch (e) { return { success: false, error: e.message }; }
  }
}
module.exports = OrderService;