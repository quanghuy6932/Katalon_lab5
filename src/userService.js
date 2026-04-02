class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.cache = new Map();
  }
  async getUser(id) {
    if (this.cache.has(id)) return this.cache.get(id);
    const user = await this.apiClient.get(`/users/${id}`);
    this.cache.set(id, user);
    return user;
  }
  async createUser(userData) {
    if (!userData.name || !this.isValidEmail(userData.email)) throw new Error('Invalid user data');
    return await this.apiClient.post('/users', userData);
  }
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
module.exports = UserService;