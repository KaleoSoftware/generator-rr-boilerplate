// There's gotta be a better way to do this.
// I submitted an issue on GH: https://github.com/yahoo/babel-plugin-react-intl/issues/31
//import enComponent from './en/src/containers/Component.json'

let enMessages = [
  //...enComponent,
]

// Reduces babel-plugin-react-intl's output into the
// key-value pairs react-intl is expecting
enMessages = enMessages.reduce((total, current) => {
  total[current.id] = current.defaultMessage
  return total
}, {})

export default {
  messages: {
    en: enMessages
  },

  formats: {
  }
}
