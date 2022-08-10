import React, {useEffect, useState} from 'react'
import { css } from 'emotion'
import styled from '@emotion/styled'
import { ElementRoot } from '@webiny/app-page-builder/render/components/ElementRoot'
import { ReactComponent as IFrameIcon } from '../assets/list.svg'
import { PbEditorElement } from "@webiny/app-page-builder/types";
import { Tabs, Tab } from "@webiny/ui/Tabs";
import { Scrollbar } from "@webiny/ui/Scrollbar";
import { Grid, Cell } from "@webiny/ui/Grid";
import {Form} from "@webiny/form";
import { Select} from "@webiny/ui/Select";



const outerWrapper = css({
  boxSizing: "border-box"
});

const PreviewBox = styled('div')({
  textAlign: 'center',
  height: 50,
  svg: {
    height: 50,
    width: 50,
    color: 'var(--mdc-theme-text-secondary-on-background)',
  },
})

interface IFrameProps {
    element: PbEditorElement;
    
}


const IframeEditor: React.FC<IFrameProps> =  ({ element }) => {

  
  
 

  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");

  const [makes, setMakes] = useState({results :  [{makeName : ''}]});
  const [models, setModels] = useState({results :  [{modelNames : ''}]});
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  useEffect(() => {
    const url = "https://d253he7xobk0g4.cloudfront.net/cms/manage/en-US";

    const fetchData = async() => {
      try{
        const response = await fetch(
          url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': 'a4ce5c7d54aa7963785ff2d4c1c6bbb846624526e2a01b47',
            },
            body: JSON.stringify({
              query: `{
                listJatoCarData{
                  data{
                    vehicleId
                    mmy {make,model, year}
                  }
                }
              }`
            }),
          }
        );
        const json = await response.json();
       
        setCarMake(json.data.listJatoCarData.data[1].mmy.make);
        setCarModel(json.data.listJatoCarData.data[1].mmy.model);
        setCarYear(json.data.listJatoCarData.data[1].mmy.year);
      }catch(error) {
        console.log('error', error);
      }
    };
    fetchData();
    
  }, []);
 
  if (!element?.data?.iframe?.url) {
    return (
      <PreviewBox>
        <IFrameIcon />
      </PreviewBox>
    )
  }

  const jatoToken = "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjhlMTBkNTU2LTE4MTMtNDc0My1iOTI4LTA5NTU5Y2UwOTJiOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ1cy5tb3RvcnRyZW5kIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiYWJjNThiZGMtOGFlOC00NGU5LWJiZDktMTc3MDJlZWNjY2RkIiwiaHR0cDovL3NjaGVtYXMuamF0by5jb20vd3MvMjAxNS8wNi9pZGVudGl0eS9jbGFpbXMvY2EvYWxsb3dlZGN1bHR1cmVzIjpbImVuLUNBIiwiZnItQ0EiXSwiaHR0cDovL3NjaGVtYXMuamF0by5jb20vd3MvMjAxOC8xMC9pZGVudGl0eS9jbGFpbXMvY2EvYWxsb3dlZHNwZWNzIjoidHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTYvMDYvaWRlbnRpdHkvY2xhaW1zL2NhL2FsbG93ZWRoaXN0b3JpY2FsIjoidHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTUvMDcvaWRlbnRpdHkvY2xhaW1zL2NhL2FsbG93ZWRpbmNlbnRpdmVzIjoidHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTUvMDgvaWRlbnRpdHkvY2xhaW1zL2NhL2FsbG93ZWR2aW5kZWNvZGluZyI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE1LzA2L2lkZW50aXR5L2NsYWltcy91cy9hbGxvd2VkY3VsdHVyZXMiOiJlbi1VUyIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTgvMTAvaWRlbnRpdHkvY2xhaW1zL3VzL2FsbG93ZWRzcGVjcyI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE2LzA2L2lkZW50aXR5L2NsYWltcy91cy9hbGxvd2VkaGlzdG9yaWNhbCI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE1LzA3L2lkZW50aXR5L2NsYWltcy91cy9hbGxvd2VkaW5jZW50aXZlcyI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE1LzA4L2lkZW50aXR5L2NsYWltcy91cy9hbGxvd2VkdmluZGVjb2RpbmciOiJ0cnVlIiwiaHR0cDovL3NjaGVtYXMuamF0by5jb20vd3MvMjAxNy8wNC9pZGVudGl0eS9jbGFpbXMvbXgvc3Vic2NyaXB0aW9ua2V5IjoiMDZmYmMxYWI4YTAxNDZkYjgwYTcxODdjZTgzNWMwMjMiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE3LzA0L2lkZW50aXR5L2NsYWltcy91cy9zdWJzY3JpcHRpb25rZXkiOiIwNmZiYzFhYjhhMDE0NmRiODBhNzE4N2NlODM1YzAyMyIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTcvMDQvaWRlbnRpdHkvY2xhaW1zL2NhL3N1YnNjcmlwdGlvbmtleSI6IjA2ZmJjMWFiOGEwMTQ2ZGI4MGE3MTg3Y2U4MzVjMDIzIiwiaHR0cDovL3NjaGVtYXMuamF0by5jb20vd3MvMjAxNy8wNC9pZGVudGl0eS9jbGFpbXMvYnIvc3Vic2NyaXB0aW9ua2V5IjoiMDZmYmMxYWI4YTAxNDZkYjgwYTcxODdjZTgzNWMwMjMiLCJuYmYiOjE2NTk1NDg4OTUsImV4cCI6MTY1OTYzNTI5NCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmphdG9mbGV4LmNvbSIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIn0.noCIZt5HB4xGamRaim_M839kdFGmqaIXkkXWosqsqR4"
 
 


  useEffect(() => {
    async function fetchMakes() {
      const response = await fetch("https://api.jatoflex.com/api/en-us/makes?page=!1&pageSize=1000", {headers : {
        'authorization' : jatoToken,
        'Subscription-Key': '06fbc1ab8a0146db80a7187ce835c023'
      }});
      const fetchedMakes = await response.json();
      setMakes(fetchedMakes);
    }
    fetchMakes();
  }, []);

  useEffect(() => {
    console.log("Calling model api " + selectedMake);
    if(selectedMake)
    {
      async function fetchModels() {
        const response = await fetch(`https://api.jatoflex.com/api/en-us/filters/${selectedMake}/models`, {headers : {
          'authorization' : jatoToken,
          'Subscription-Key': '06fbc1ab8a0146db80a7187ce835c023'
        }});
        console.log({selectedMake});
        const fetchedModels = await response.json();

        setModels(fetchedModels);
      }
      fetchModels();
    }
  }, [selectedMake]);

  console.log("Make:" + selectedMake);
  console.log("Model" +selectedModel);
  const test = (event:string) =>{
    console.log('event' + event)
}
  return (
    
    <ElementRoot
      className={'webiny-pb-base-page-element-style webiny-pb-page-element-iframe ' + outerWrapper}
      element={element}
    >
      
      
      <Grid>
        <Cell span={3}>
          <Form>
          {({Bind}) =>(
          <Bind name = "Make">
            <Select
            label='Make'
            onChange={test}
            >
              {makes.results.map(name => <option onChange={(e) => setSelectedMake(e +"honda")} key={name.makeName} value={name.makeName}>{name.makeName}</option>)} 
            </Select>
          </Bind>
        )}
          </Form>
        </Cell>
        <Cell span={3}>
          <Form >
          {({Bind}) =>(
          <Bind name = "Model" >
            <Select
            onChange={(e) => setSelectedModel(e.target.value)}
            label='Model'
            > 
              {models.results.map(name => <option key = {name.modelNames} value ={name.modelNames}>{name.modelNames}</option>)}
            </Select>
          </Bind>
        )}
          </Form>
        </Cell>
        <Cell span={3}>
        <Form>
        {({Bind}) =>(
          <Bind name = "Version">
            <Select
            label='Version'
            >
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </Select>
          </Bind>
        )}
      </Form>
        </Cell>
        <Cell span={3}>
        <Form>
        {({Bind}) =>(
          <Bind name = "Year">
            <Select
            label='Year'
            >
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </Select>
          </Bind>
        )}
      </Form>
        </Cell>
      </Grid>
     
     
      <Tabs>
        <Tab label="Main Features">
            <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
            <Grid>
            <Cell  span={4}>
              Make: {carMake}
            </Cell>
            <Cell  span={4} >
              Model: {carModel}
            </Cell>
            <Cell  span={4} >
              Year: {carYear}
            </Cell>
            <Cell  span={4} >
              Trim: 
            </Cell>
            <Cell  span={4} >
              Combined MPG_EPA: 
            </Cell>
            <Cell  span={4} >
              Body Style: 
            </Cell>
            <Cell  span={4} >
              Body Type: 
            </Cell>
            <Cell  span={4} >
              Doors: 
            </Cell>
            <Cell  span={4} >
              Drive: 
            </Cell>
          </Grid>
          </Scrollbar>
        </Tab>
        <Tab label="Interior Dimensions">
            <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
            <Grid>
            <Cell  span={4}>
              Make:
            </Cell>
            <Cell  span={4} >
              Model: 3 Series
            </Cell>
            <Cell  span={4} >
              Year: 2022
            </Cell>
            <Cell  span={4} >
              Trim: M340i Sedan
            </Cell>
            <Cell  span={4} >
              Combined MPG_EPA: 9.4
            </Cell>
            <Cell  span={4} >
              Body Style: S
            </Cell>
            <Cell  span={4} >
              Body Type: SA
            </Cell>
            <Cell  span={4} >
              Doors: 4
            </Cell>
            <Cell  span={4} >
              Drive: S
            </Cell>
          </Grid>
          </Scrollbar>
        </Tab>
        <Tab label="Exterior Dimensions">
            <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
            <Grid>
            <Cell  span={4}>
              Make: 
            </Cell>
            <Cell  span={4} >
              Model: 3 Series
            </Cell>
            <Cell  span={4} >
              Year: 2022
            </Cell>
            <Cell  span={4} >
              Trim: M340i Sedan
            </Cell>
            <Cell  span={4} >
              Combined MPG_EPA: 9.4
            </Cell>
            <Cell  span={4} >
              Body Style: S
            </Cell>
            <Cell  span={4} >
              Body Type: SA
            </Cell>
            <Cell  span={4} >
              Doors: 4
            </Cell>
            <Cell  span={4} >
              Drive: S
            </Cell>
          </Grid>
          </Scrollbar>
        </Tab>
        
      </Tabs>
    </ElementRoot>
   
  )
}

export default IframeEditor;
