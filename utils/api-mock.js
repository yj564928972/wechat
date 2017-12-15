const Mock = require("./mock.js")

const MockRequest = function (opts, rule) {
  console.log(JSON.stringify(opts))
  const res = Mock.mock(rule)
  opts.success(res)
}

const s = {
  main: {
    "carousel|3-5": [{
      "banner|1": function(){
        return Mock.Random.image("375x200", Mock.Random.color())
      }
    }],
    "news|5-7": [{
      "title|+1": "@ctitle(8, 30)",
      "banner|0-1": "@image()"
    }],
    "times|5-7": [{
      "title|+1": "@ctitle(8, 30)",
      "banner|1": "@image()"
    }]
  }
}

module.exports = {
  main: (params) => MockRequest(params, s.main)
}