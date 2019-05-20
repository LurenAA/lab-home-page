requirejs.config({
  baseUrl: '/script/lib',
  paths: {
    jquery: 'jquery-3.3.1.slim.min',
    bootstrap: 'bootstrap.min',
    popper: 'popper.min',
    chart: 'chart',
    md5: 'md5'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery', 'popper']
    }
  },
  map: {
    'bootstrap': {
      'popper.js': 'popper'
    }
  }
})
