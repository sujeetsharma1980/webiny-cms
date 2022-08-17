import React,{useState} from 'react'
import { Cell, Grid } from '@webiny/ui/Grid'
import {
  ButtonContainer,
  classes,
  SimpleButton,
} from '@webiny/app-page-builder/editor/plugins/elementSettings/components/StyledComponents'
import Accordion from '@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion'
import { BindComponent } from "@webiny/form";



interface buyersGuideSettingsProp {
  Bind: BindComponent;
}

//get heading elememnt by element ID and save title after hitting the save button
function submit() {
  ((document.getElementById("dynamicHeader")) as HTMLHeadingElement).innerHTML =  ((document.getElementById("title-input")) as HTMLInputElement).value;  return;
}

const buyersGuideSettings: React.FC<buyersGuideSettingsProp> = () => {

  const [textInput, setTextInput] = useState("");

  function handleTextInput(event:any) {
    setTextInput(event.target.value);
  } 
    
    return (
      <Accordion title={'Title'} defaultValue={true}>
        <React.Fragment>
            <input type="text" id="title-input" value ={textInput} onChange={handleTextInput}/>
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

export default buyersGuideSettings;

