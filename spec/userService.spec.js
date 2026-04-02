const UserService = require('../src/userService');

describe('Spy/Mock Test: UserService', () => {
  let service, mockApi;

  beforeEach(() => {
    mockApi = jasmine.createSpyObj('ApiClient', ['get', 'post']);
    service = new UserService(mockApi);
  });

  it('getUser: chỉ gọi API 1 lần nhờ cache', async () => {
    mockApi.get.and.resolveTo({ id: 1, name: 'Huy' });
    await service.getUser(1);
    const user = await service.getUser(1);
    
    expect(user.name).toBe('Huy');
    expect(mockApi.get).toHaveBeenCalledTimes(1);
  });

  it('createUser: báo lỗi khi email sai định dạng', async () => {
    const data = { name: 'Huy', email: 'sai-email' };
    await expectAsync(service.createUser(data)).toBeRejectedWithError('Invalid user data');
  });

  it('createUser: gọi đúng API post khi data chuẩn', async () => {
    mockApi.post.and.resolveTo({ status: 201 });
    const data = { name: 'Hoang Huy', email: 'huy@test.com' };
    await service.createUser(data);
    expect(mockApi.post).toHaveBeenCalledWith('/users', data);
  });
});