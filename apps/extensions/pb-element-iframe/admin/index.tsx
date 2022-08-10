import React from 'react'
import styled from '@emotion/styled'
import { PbEditorPageElementPlugin, DisplayMode,  } from '@webiny/app-page-builder/types'
import {PbEditorPageElementAdvancedSettingsPlugin } from '@webiny/app-page-builder/types'
import { createInitialPerDeviceSettingValue } from '@webiny/app-page-builder/editor/plugins/elementSettings/elementSettingsUtils'
import { ReactComponent as IFrameIcon } from './assets/list.svg'
import IframeEditor from './components/iframeEditor'
import IFrameSettings from "./iframeSettings";



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
      name: 'pb-editor-page-element-iframe-custom',
      type: 'pb-editor-page-element',

      elementType: 'iframe-custom',
      toolbar: {
        // We use `pb-editor-element-group-basic` to put our plugin into the Media group.
        title: 'Car Display',
        group: 'pb-editor-element-group-basic',
        preview() {
          return (
            <PreviewBox>
              <IFrameIcon />
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
        /*
                    Create function is here to create the initial data
                    for the page element, which then is utilized in the
                    IFrameEditor component and in the element settings.
                */
        return {
          type: 'iframe-custom',
          elements: [],
          data: {
            
            iframe: {
              // The URL property will be populated when user enters the URL in the element settings.
              url: "",
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
        /*
                    Every render function receives the page element's
                    data assigned to the "element.data" property in
                    the received props. In here we will store the
                    "iframe.url" which will be provided via the page
                    element's settings.
                */
        return <IframeEditor  {...props} />
      },
      renderElementPreview({ width, height }) {
        return <img style={{ width, height }} alt={'iFrame'} />
      },
    } as PbEditorPageElementPlugin,

    {
      name: "pb-editor-page-element-advanced-settings-iframe-custom",
      type: "pb-editor-page-element-advanced-settings",
      elementType: 'iframe-custom',
      render(props) {
          return <IFrameSettings {...props}/>;
      }
    } as PbEditorPageElementAdvancedSettingsPlugin

  ]
}
