import React from 'react'
import { PbRenderElementPlugin } from '@webiny/app-page-builder/types'


import BuyersGuide from './components/buyersGuide'

export default () =>
  ({
    name: 'pb-render-page-element-buyersGuide',
    type: 'pb-render-page-element',
    elementType: 'buyersGuide-custom',
    render({ element }) {
      return <BuyersGuide element={element} />
    },
  } as PbRenderElementPlugin);
