import React from 'react'
import { validation } from '@webiny/validation'
import { Input } from '@webiny/ui/Input'
import { Cell, Grid } from '@webiny/ui/Grid'
import {
  ButtonContainer,
  classes,
  SimpleButton,
} from '@webiny/app-page-builder/editor/plugins/elementSettings/components/StyledComponents'
import Accordion from '@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion'
import { BindComponent } from "@webiny/form";

interface iFrameImagesSettingsProps {
  Bind: BindComponent;
  submit: () => void;
}

const IFrameSettings: React.FC<iFrameImagesSettingsProps> = props => {
    const { Bind, submit } = props;
    return (
      <Accordion title={'Vehicle ID'} defaultValue={true}>
        <React.Fragment>
          <Bind name={'vehicleID.number'} validators={validation.create('required')}>
            <Input label={'Vehicle ID'} description={'Enter a Vehicle ID'} />
          </Bind>
          <Grid className={classes.simpleGrid}>
            <Cell span={12}>
              {/*  @ts-ignore */}
              <ButtonContainer>
                {/*  @ts-ignore */}
                <SimpleButton onClick={submit}>Save</SimpleButton>
              </ButtonContainer>
            </Cell>
          </Grid>
        </React.Fragment>
      </Accordion>
    )

}

export default IFrameSettings;

