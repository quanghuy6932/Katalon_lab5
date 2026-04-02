const OrderService = require('../src/orderService');

describe('Integration Test: Order Flow', () => {
  let service, mockApi, mockEmail;

  beforeEach(() => {
    mockApi = jasmine.createSpyObj('ApiClient', ['get', 'post']);
    mockEmail = jasmine.createSpyObj('EmailService', ['sendEmail']);
    service = new OrderService(mockApi, mockEmail);
  });

  it('calculateTotal & applyDiscount hoạt động đúng logic', () => {
    const items = [{ price: 100, quantity: 2 }, { price: 50, quantity: 2 }];
    const total = service.calculateTotal(items);
    expect(total).toBe(300);
    expect(service.applyDiscount(total, 10)).toBe(270);
  });

  it('createOrder: Flow thành công (Get User -> Post Order -> Send Email)', async () => {
    mockApi.get.and.resolveTo({ email: 'huy@gmail.com' });
    mockApi.post.and.resolveTo({ status: 201 });

    const items = [{ price: 200, quantity: 1 }];
    const result = await service.createOrder(1, items, 10);

    expect(result.success).toBeTrue();
    expect(result.total).toBe(180);
    expect(mockApi.get).toHaveBeenCalledBefore(mockApi.post);

    expect(mockEmail.sendEmail).toHaveBeenCalledWith('huy@gmail.com', jasmine.any(String), jasmine.any(String));
  });

  it('createOrder: Không gửi email nếu API tạo đơn hàng lỗi', async () => {
    mockApi.get.and.resolveTo({ email: 'huy@gmail.com' });
    mockApi.post.and.resolveTo({ status: 500 }); 

    await service.createOrder(, []);
    expect(mockEmail.sendEmail).not.toHaveBeenCalled();
  });
});