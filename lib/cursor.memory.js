'use strict';

var util = require('util');
var transformations = require('./transformations.js');

module.exports = MemoryCursor;
var Cursor = require('./cursor.js');
util.inherits(MemoryCursor, Cursor);

// MongoDB Cursor
//
function MemoryCursor(provider, dataset) {
  this.provider = provider;
  this.dataset = dataset;
  this.jsql = [];
}

MemoryCursor.prototype.copy = function() {
  var ds = transformations.copy(this.dataset);
  return new MemoryCursor(this.provider, ds);
};

MemoryCursor.prototype.clone = function() {
  var ds = transformations.clone(this.dataset);
  return new MemoryCursor(this.provider, ds);
};

MemoryCursor.prototype.enroll = function(jsql) {
  this.jsql = jstp;
  return this;
};

MemoryCursor.prototype.empty = function() {
  this.dataset = [];
  this.jsql = [];
  return this;
};

MemoryCursor.prototype.next = function() {
  return {
    done: true,
    value: null
  };
};

MemoryCursor.prototype.from = function(arr) {
  this.dataset = transformations.clone(arr);
  return this;
};

MemoryCursor.prototype.map = function(fn, immediate) {
  if (immediate) {
    this.dataset = this.dataset.map(fn);
  } else {
    this.jsql.push({ op: 'map', fn: fn });
  }
  return this;
};

MemoryCursor.prototype.projection = function(mapping, immediate) {
  if (immediate) {
    this.dataset = transformations.projection(mapping);
  } else {
    this.jsql.push({ op: 'projection', fields: mapping });
  }
  return this;
};

MemoryCursor.prototype.filter = function(fn, immediate) {
  if (immediate) {
    this.dataset = this.dataset.filter(fn);
  } else {
    this.jsql.push({ op: 'find', fn: fn });
  }
  return this;
};

MemoryCursor.prototype.select = function(query, immediate) {
  if (immediate) {
    this.dataset = this.dataset.filter(function(item) {
      return true;
    });
  } else {
    this.jsql.push({ op: 'select', query: query });
  }
  return this;
};

MemoryCursor.prototype.distinct = function(immediate) {
  if (immediate) {
  } else {
    this.jsql.push({ op: 'distinct' });
  }
  return this;
};

MemoryCursor.prototype.find = function(fn, immediate) {
  if (immediate) {
  } else {
    this.jsql.push({ op: 'find', fn: fn });
  }
  return this;
};

MemoryCursor.prototype.sort = function(fn, immediate) {
  if (immediate) {
  } else {
    this.jsql.push({ op: 'sort', fn: fn });
  }
  return this;
};

MemoryCursor.prototype.order = function(fields, immediate) {
  if (immediate) {
    var order = {};
    if (typeof(fields) === 'string') {
      order[fields] = 1;
      this.jsql.push({ op: 'order', fields: [fields] });
    } else {
      fields.forEach(function(field) {
        order[field] = 1;
      });
    }
  } else {
    this.jsql.push({ op: 'order', fields: fields });
  }
  return this;
};

MemoryCursor.prototype.desc = function(fields, immediate) {
  if (immediate) {
    var order = {};
    if (typeof(fields) === 'string') {
      order[fields] = -1;
      this.jsql.push({ op: 'desc', fields: [fields] });
    } else {
      fields.forEach(function(field) {
        order[field] = -1;
      });
    }
  } else {
    this.jsql.push({ op: 'desc', fields: fields });
  }
  return this;
};

MemoryCursor.prototype.toArray = function(done) {
  var ds = transformations.clone(this.dataset);
  done(null, ds);
  return this;
};