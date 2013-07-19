var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs');
var cubes = require('../cubes.js').cubes;

var suite = vows.describe('Drilldown tests');

suite.addBatch({
  'cuts on loaded model': {
    topic: (new cubes.Model(JSON.parse(fs.readFileSync('test/model.json')))),
    'basic toString': function(model) { 
      var dd = new cubes.Drilldown(model.dimension('daily_date'), null, 'year');
      assert.strictEqual("daily_date@ymd:year", dd.toString());
    },
    'keys in result cell': function(model) { 
      var dd = new cubes.Drilldown(model.dimension('daily_date'), null, 'year');
      assert.deepEqual(["daily_date.year"], dd.keysInResultCell());
    },
    'keys in result cell 2': function(model) { 
      var dd = new cubes.Drilldown(model.dimension('daily_date'), 'yqmd', 'month');
      assert.deepEqual(["daily_date.year", "daily_date.quarter", "daily_date.month"], dd.keysInResultCell());
    }
  }
});

suite.export(module);