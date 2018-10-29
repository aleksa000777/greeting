class Cache {
  constructor(capacity) {
    this.size = 0;
    this.capacity = capacity;
    this.table = {};
    this.list = [];
  }

  get(key) {
    if (this.table[key]) {
      const index = this.list.indexOf(key);
      this.list.splice(index, 1);
      this.list.unshift(key);
      return this.table[key];
    }
    return false;
  }

  put(key, value) {
    if (this.table[key]) {
      const index = this.list.indexOf(key);
      this.list.splice(index, 1);
      this.list.unshift(key);
      return this.table[key];
    }
    if (this.size === this.capacity) {
      this.list.splice(-1, 1);
    } else {
      this.size += 1;
    }
    this.table[key] = value;
    this.list.unshift(key);
    return true;
  }
}

module.exports = Cache;
