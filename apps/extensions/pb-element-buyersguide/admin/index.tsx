import React from 'react'
import styled from '@emotion/styled'
import { PbEditorPageElementPlugin, DisplayMode,  } from '@webiny/app-page-builder/types'
import {PbEditorPageElementAdvancedSettingsPlugin } from '@webiny/app-page-builder/types'
import { createInitialPerDeviceSettingValue } from '@webiny/app-page-builder/editor/plugins/elementSettings/elementSettingsUtils'
import { ReactComponent as Icon } from './assets/list.svg'
import BuyersGuideEdior from './components/buyersGuideEditor'
import BuyersGuideSettings from "./buyersGuideSettings";


const PreviewBox = styled('div')({
  textAlign: 'center',
  height: 50,
  svg: {
    height: 50,
    width: 50,
    color: 'var(--mdc-theme-text-secondary-on-background)',
  },
})

export default () => {
  return [
    {
      name: 'pb-editor-page-element-buyersGuide-custom',
      type: 'pb-editor-page-element',

      elementType: 'buyersGuide-custom',
      toolbar: {
        // We use `pb-editor-element-group-basic` to put our plugin into the Basic group.
        title: 'Buyers Guide',
        group: 'pb-editor-element-group-basic',
        preview() {
          return (
            <PreviewBox>
              <Icon />
            </PreviewBox>
          )
        },
      },
      settings: [
        'pb-editor-page-element-settings-delete',
        'pb-editor-page-element-style-settings-height',
        "pb-editor-page-element-style-settings-width"
      ],
      target: ['cell', 'block'],

      onCreate: 'open-settings',
      create(options) {
      
        return {
          type: 'buyersGuide-custom',
          elements: [],
          data: {
            buyersGuide: {
              title: "",
              height: 370,
            },
            settings: {
              height: createInitialPerDeviceSettingValue({ value: '380px' }, DisplayMode.DESKTOP),
            },
          },
          ...options,
        }
      },
      render(props) {
       
        return <BuyersGuideEdior  {...props} />
      },
      renderElementPreview({ width, height }) {
        return <img style={{ width, height }} alt={'buyersGuide'} />
      },
    } as PbEditorPageElementPlugin,

    {
      name: "pb-editor-page-element-advanced-settings-buyersGuide-custom",
      type: "pb-editor-page-element-advanced-settings",
      elementType: 'buyersGuide-custom',
      render(props) {
          return <BuyersGuideSettings {...props}/>;
      }
    } as PbEditorPageElementAdvancedSettingsPlugin

  ]
}
