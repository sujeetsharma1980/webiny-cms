import React from "react";
import { CmsEditorFieldRendererPlugin } from "@webiny/app-headless-cms/types";
import { Input } from "@webiny/ui/Input";
import DropdownTreeSelect from "react-dropdown-tree-select";

function concatDataHelper(dataContainer:any, element:any){
  let makeFound = false;
  if (dataContainer.length === 0) { // initial population
    //console.log('abcd');
    dataContainer.push({'label': element.mmy.make.toString(), value: "", children: [{'label': element.mmy.year.toString(), value: "", children: [{'label': element.mmy.model, value: ''}]}]});
  } else {
    for (let i = 0; i < dataContainer.length; i++){ // check if make already exists
      if (dataContainer[i].label.toString() === element.mmy.make.toString()) {
        makeFound = true;
        // check if year exists
        let yearFound = false;
        for (let j = 0; j < dataContainer[i].children.length; j++){ // check if year exists
          if (dataContainer[i].children[j].label === element.mmy.year.toString()){
            yearFound = true;
            // check if model exists
            let modelFound = false;
            for (let k = 0; k < dataContainer[i].children[j].children.length; k++){
              if (dataContainer[i].children[j].children[k].label === element.mmy.model){
                modelFound = true;
                break;
              }
            }
            // if model not found insert model
            if (!modelFound){
              dataContainer[i].children[j].children.push({'label': element.mmy.model.toString(), value: ''});
            }
            break;
          }
        }
        // if year not found insert year > model
        if (!yearFound){
          dataContainer[i].children.push({'label': element.mmy.year.toString(), value: '', children: [{'label': element.mmy.model.toString()}]});
        }
        break;
      }
    }
    // if make not found insert make > year > model
    if (!makeFound) {
      dataContainer.push({'label': element.mmy.make.toString(), value: "", children: [{'label': element.mmy.year.toString(), value: "", children: [{'label': element.mmy.model, value: ''}]}]});
    }

  }



}

const dataMap = new Map<String, any[]>();
const data:Array<any> = [];

const webinyData = {
  data: {
    "listJatoCarData": {
      "data": [
        {
          "mmy": {
            "make":"Porsche",
            "model":"911",
            "year":"2022"
          }
        },
        {
          "mmy": {
            "make":"Tesla",
            "model":"Model 3",
            "year":"2021"
          }
        },
        {
          "mmy": {
            "make":"Rivian",
            "model":"R1T",
            "year":"2021"
          }
        },
        {
          "mmy": {
            "make":"Porsche",
            "model":"Macan",
            "year":"2022"
          }
        },
        {
          "mmy": {
            "make":"Porsche",
            "model":"718",
            "year":"2021"
          }
        },
        {
          "mmy": {
            "make":"Chevrolet",
            "model":"Corvette",
            "year":"2023"
          }
        },
      ]
    }
  }
};

(webinyData.data.listJatoCarData.data).forEach(mmyObj => {
  concatDataHelper(data, mmyObj);
});

// https://d32jw21mvjpo6q.cloudfront.net/cms/manage/en-US
let treeSelection: Set<string> = new Set<string>();
const treeSelectionMap = new Map<string, Set<string>>();
//console.log("RUNNING KEY: ", Date.now().toString());

// api update request SEND
async function getFromWebiny() {
  console.log('button', Array.from(treeSelection).toString());
  // POST request using fetch with async/await
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'Content-Length': data.length,
      'Authorization': 'a9aaaafa0422b6458f4db81af54fd250df846c10978fb0b3', // token
      'User-Agent': 'dropdown-POC',
    },
    body: JSON.stringify({
      query: `mutation {
        updateDropdownModelPoc(revision: "${window.location.href.split("=")[1].replace("%23", "#")}", 
          data:{
            dropdownFieldPoc: "${Array.from(treeSelection).toString()}"
          }
        ){
        data {
            createdOn
          }
        }
      }
      `,
    })
  }
  const response = await fetch('https://d32jw21mvjpo6q.cloudfront.net/cms/manage/en-US', requestOptions);
  const webinyData = await response.json();
  console.log(webinyData);
  console.log(requestOptions.body);
  alert('saved to db');
}

// async function getRevisionId(){
//   return '62ec6ad91d87cb0009967b90#0001';
//   // const requestOptions = {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     //'Content-Length': data.length,
//   //     'Authorization': 'a9aaaafa0422b6458f4db81af54fd250df846c10978fb0b3', // token
//   //     'User-Agent': 'dropdown-POC',
//   //   },
//   //   body: JSON.stringify({
//   //     query: `{
//   //       listTestContentModelNames {
//   //         data {
//   //           id
//   //         }
//   //       }
//   //     }
//   //     `,
//   //   })
//   // }
//   // const response = await fetch('https://d32jw21mvjpo6q.cloudfront.net/cms/manage/en-US', requestOptions);
//   // const webinyData = await response.json();
//   // //alert(`revisionId=${webinyData.data.listTestContentModelNames.data[0].id}`);
//   // //console.log("revisionId= ", webinyData.data.listTestContentModelNames.data[0].id);
//   // return (webinyData.data.listTestContentModelNames.data[0].id);
//   // alert(window.location.href.split("=")[1].replace("%23", "#"));
//   // return window.location.href;
// }

async function populateDataJSONFromWebiny() {
  console.log('button', Array.from(treeSelection).toString());
  // POST request using fetch with async/await
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'Content-Length': data.length,
      'Authorization': 'a9aaaafa0422b6458f4db81af54fd250df846c10978fb0b3', // token
      'User-Agent': 'dropdown-POC',
    },
    body: JSON.stringify({
      query: `{
        listDropdownModelPocs {
          data {
            dropdownFieldPoc
            id
          }
        }
      }
      `,
    })
  }
  //let treeSelectionString = "";
  const response = fetch('https://d32jw21mvjpo6q.cloudfront.net/cms/manage/en-US', requestOptions);
  response.then(function(res) {
    res.json().then(function(resJSON) {
      console.log(JSON.stringify(resJSON));
      for (const cmsEntry of resJSON.data.listDropdownModelPocs.data) {
        const treeSelectionString = cmsEntry.dropdownFieldPoc;
        const currentId = cmsEntry.id;
        const dataCopy:any[] = Array.from(JSON.parse(JSON.stringify(data)));
        console.log("FROM DB treeSelectionString: ", treeSelectionString, "id=", currentId, dataCopy[0].checked);
        //const treeSelectionString = populateTreeFromWebiny;
        if (treeSelectionString === null) {
          console.log("NULL field, currentId=", currentId);
          dataMap.set(currentId, dataCopy);
          console.log(dataMap.get(currentId));
          continue;
        }
        //console.log("DATA: ", data.toString());
        const split = treeSelectionString.split(",");
        //console.log(split);
        treeSelectionMap.set(currentId, new Set());
        for (let i = 0; i < split.length; i++) {
          const e = split[i];
          //console.log(e);
          let found = false;
          for (let j = 0; j < dataCopy.length; j++){
            const makeObj = dataCopy[j];
            //console.log("data[j]: ", makeObj);
            if (found){
              break;
            }
            if (makeObj.label === e) {
              found = true;
              treeSelectionMap.get(currentId)?.add(e);
              makeObj.checked = true;
            }
            
            for (let k = 0; k < makeObj.children.length; k++){
              const yearObj = makeObj.children[k];
              //console.log("yearObj: ", yearObj);
              if (found){
                break;
              }
              if (yearObj.label === e) {
                //found = true;
                treeSelectionMap.get(currentId)?.add(e);
                yearObj.checked = true;
              }

              for (let L = 0; L < yearObj.children.length; L++){
                const modelObj = yearObj.children[L];
                //console.log("modelObj: ", modelObj);
                if (found){
                  break;
                }
                if (modelObj.label === e) {
                  found = true;
                  treeSelectionMap.get(currentId)?.add(e);
                  modelObj.checked = true;
                }
              }
            } 
          }   
        }
        dataMap.set(currentId, dataCopy);
      }
    });
  });
  return;
  //console.log("TEST: ", data[0]);
  //console.log("FROM DB: ", treePopulation);
  //return treePopulation;
  //console.log("tree population: ", response.json());
  //await new Promise(resolve => setTimeout(resolve, 10000)); // 3 sec
  //return (await webinyData.data.listTestContentModelNames.data[0].customLabel);
}

populateDataJSONFromWebiny();
// if (treeSelection.has("lmao123")) {
//   populateTreeFromWebiny;
// }


export default (): CmsEditorFieldRendererPlugin => ({
  type: "cms-editor-field-renderer",
  name: "cms-editor-field-renderer-secret-text",
  renderer: {
    rendererName: "secret-text",
    name: `Secret Text`,
    description: `Enter the text to encrypt`,
    canUse({ field }) {
      return field.type === "secret-text";
    },
    render({ field, getBind }) { // field,
      
      
      const Bind = getBind();

      //const [makes, setMakes] = useState('');
      //console.log(makes);

      const onChange = (currentNode:any, selectedNodes:any) => {
        console.log('onChange::', currentNode, selectedNodes);
        //setMakes(currentNode.label.toString());
        if (currentNode.checked) {
          treeSelection.add(currentNode.label.toString());
        } else {
          treeSelection.delete(currentNode.label.toString());
        }
        
        console.log(`treeSelection: [${Array.from(treeSelection).toString()}]`);
      }
      const onAction = (node:any, action:any) => {
        console.log('onAction::', action, node)
      }
      const onNodeToggle = (currentNode:any) => {
        console.log('onNodeToggle::', currentNode);
      }

      // prepare tree map

      //console.log("RENDERED AGAIN");
      // populateDataForRender()
      const currentId = window.location.href.split("=")[1].replace("%23", "#");
      // load treeSelection set
      treeSelection = treeSelectionMap.get(currentId) || new Set();
      console.log("tree at beginning: ", Array.from(treeSelection).toString());
      
      const displayDataArray:Array<any> = dataMap.get(currentId) || [];
      
      return (
        <div>
          <div>
            <button onClick={getFromWebiny}> Update Entry </button>
          </div>
          <link href="https://unpkg.com/react-dropdown-tree-select/dist/styles.css" rel="stylesheet" />
          
          <DropdownTreeSelect data={displayDataArray} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
          
          <div id="dropdownFieldId">
            <Bind>
              {bind => (
                <Input
                  {...bind}
                  label={"default??"} // field.label
                  placeholder={field.placeholderText}
                  description={field.helpText}
                />
              )}
            </Bind>
          </div>
          
        </div>
        
      );
    }
  }
});

/*<Input
                  {...bind}
                  label={"default??"} // field.label
                  placeholder={field.placeholderText}
                  description={field.helpText}
                />
                */


// function populateTreeSelections(){
//   populateTreeFromWebiny().then(function(treeSelectionString){
//     console.log("FROM DB: ", treeSelectionString);
//     //const treeSelectionString = populateTreeFromWebiny;
//     if (treeSelectionString === null) {
//       return;
//     }
//     //console.log("DATA: ", data.toString());
//     const split = treeSelectionString.split(",");
//     //console.log(split);
//     for (let i = 0; i < split.length; i++) {
//       const e = split[i];
//       //console.log(e);
//       let found = false;
//       for (let j = 0; j < data.length; j++){
//         const makeObj = data[j];
//         //console.log("data[j]: ", makeObj);
//         if (found){
//           break;
//         }
//         if (makeObj.label === e) {
//           found = true;
//           makeObj.checked = true;
//         }
        
//         for (let k = 0; k < makeObj.children.length; k++){
//           const yearObj = makeObj.children[k];
//           //console.log("yearObj: ", yearObj);
//           if (found){
//             break;
//           }
//           if (yearObj.label === e) {
//             //found = true;
//             yearObj.checked = true;
//           }

//           for (let L = 0; L < yearObj.children.length; L++){
//             const modelObj = yearObj.children[L];
//             //console.log("modelObj: ", modelObj);
//             if (found){
//               break;
//             }
//             if (modelObj.label === e) {
//               found = true;
//               modelObj.checked = true;
//             }

//           }
//         }
        
        
//       }
      
      
//     }
//   });
// }