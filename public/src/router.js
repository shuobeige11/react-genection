if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

const test = {
  path: '/test',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/Test').default)
    })
  }
}


const test1 = {
  path: '/test1',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/Test1').default)
    })
  }
}

const home = {
  path: '/',
  component:require('./containers/App').default,
  childRoutes: [test, test1]
}

export default () => home