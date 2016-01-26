import React from 'react'
import {Provider} from 'react-redux'
import {IntlProvider} from 'react-intl'

import intlData from './i18n/intlData'

export default ({store, children, locale = 'en'}) => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={intlData.messages[locale]} formats={intlData.formats}>
      {children}
    </IntlProvider>
  </Provider>
)
