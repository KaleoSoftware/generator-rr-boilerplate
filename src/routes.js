import Layout from '../components/Layout'
import Index from '../components/Index'

export default (dispatch) => ([
  {
    path: '/',
    component: Layout,
    indexRoute: {
      component: Index
    },
  }
])
