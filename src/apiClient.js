class ApiClient {
  async get(url) { return { data: null }; }
  async post(url, data) { return { status: 201, data }; }
}
module.exports = ApiClient;