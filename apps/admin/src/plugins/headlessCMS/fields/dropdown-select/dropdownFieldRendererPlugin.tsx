/*import React, { useEffect, useState } from "react";
import { CmsEditorFieldRendererPlugin } from "@webiny/app-headless-cms/types";
import { Input } from "@webiny/ui/Input";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { useLocation } from "react-router-dom";
*/

import React from "react";
import { CmsEditorFieldRendererPlugin } from "@webiny/app-headless-cms/types";
import { AutoComplete } from "@webiny/ui/AutoComplete";

export default (): CmsEditorFieldRendererPlugin => ({
  type: "cms-editor-field-renderer",
  name: "cms-editor-field-renderer-secret-text",
  renderer: {
    rendererName: "dropdown",
    name: `Dropdown Select`,
    description: `Select MMY`,
    canUse({ field }) {
      return field.type === "dropdown";
    },
    render({ field, getBind }) {
      const Bind = getBind();

      return (
        <Bind>
          {bind => (
            <AutoComplete {...bind} placeholder={field.placeholderText}
              options={[
                { name: "Honda Civic 2020", id: "honda-civic-2020" },
                { name: "Honda Civic 2021", id: "honda-civic-2021" },
                { name: "Honda Civic 2022", id: "honda-civic-2022" },
                { name: "Honda Accord 2020", id: "honda-accord-2020" },
                { name: "Honda Accord 2021", id: "honda-accord-2021" },
                { name: "Honda Accord 2022", id: "honda-accord-2022" },
                { name: "Honda Accord 2019", id: "honda-accord-2019" },
                { name: "Honda Accord 2018", id: "honda-accord-2018" },
              ]}
              label="MMY"
              disabled={false}
              description="Choose your MMY."
            />
          )}
        </Bind>
      )
    }
  }
})

/*export default (): CmsEditorFieldRendererPlugin => (
  {
  type: "cms-editor-field-renderer",
  name: "cms-editor-field-renderer-dropdown",
  renderer: {
    rendererName: "dropdown",
    name: `Dropdown Select`,
    description: `Select MMY`,
    canUse({ field }) {
      return field.type === "dropdown";
    },
    render({ field, getBind }) {
      const Bind = getBind();

      // define api token and graphQL endpoints.
      const API_token = 'a9aaaafa0422b6458f4db81af54fd250df846c10978fb0b3';
      const manage_API_endpoint = 'https://d32jw21mvjpo6q.cloudfront.net/cms/manage/en-US';
      const modelID = "DropdownPoCv2s"; // webiny content model's model ID. first letter must be capitalized.
      const fieldName = "dropdownPoCv2Field"; // webiny content model's fieldName
  

      // // for caching data of each entry in content model

      //const data:Array<any> = []; // for react-dropdown-tree

      const [dataMap, setDataMap] = useState<Map<String, any[]>>();
      const [treeSelection, setTreeSelection] = useState<Set<string>>(); // keeps track of current tree selection
      const [isButtonClicked, setIsButtonClicked] = useState(false);

      useEffect(() => {
        const webinyData = {
          data: {
            "listJatoCarData": {
              "data": [
                {
                  "mmy": {
                    "make": "Porsche",
                    "model": "911",
                    "year": "2022"
                  }
                },
                {
                  "mmy": {
                    "make": "Tesla",
                    "model": "Model 3",
                    "year": "2021"
                  }
                },
                {
                  "mmy": {
                    "make": "Rivian",
                    "model": "R1T",
                    "year": "2021"
                  }
                },
                {
                  "mmy": {
                    "make": "Porsche",
                    "model": "Macan",
                    "year": "2022"
                  }
                },
                {
                  "mmy": {
                    "make": "Porsche",
                    "model": "718",
                    "year": "2021"
                  }
                },
                {
                  "mmy": {
                    "make": "Chevrolet",
                    "model": "Corvette",
                    "year": "2023"
                  }
                },
              ]
            }
          }
        };

        const dataArr: Array<any> = [];

        webinyData.data.listJatoCarData.data.forEach(mmyObj => {
          const data = concatDataHelper(mmyObj);
          dataArr.push(data);
        });

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'Content-Length': data.length,
            'Authorization': API_token, // token
            'User-Agent': 'dropdown-POC',
          },
          body: JSON.stringify({
            query: `{
        list${modelID} {
          data {
            ${fieldName}
            id
          }
        }
      }
      `,
          })
        }

        const response = fetch(manage_API_endpoint, requestOptions);
        response.then(function (res) {
          res.json().then(function (resJSON) {
            const treeSelectionMap = new Map<string, Set<string>>();
            const dataMap = new Map<String, any[]>();
            //console.log(JSON.stringify(resJSON));
            for (const cmsEntry of resJSON.data.listDropdownPoCv2s.data) { // replace with resJson.data.modelID.data
              const treeSelectionString = cmsEntry.dropdownPoCv2Field; // replace with cmsEntry.${fieldName}
              const currentId = cmsEntry.id;
              const dataCopy: any[] = Array.from(JSON.parse(JSON.stringify(dataArr)));
              //console.log("FROM DB treeSelectionString: ", treeSelectionString, "id=", currentId, dataCopy[0].checked);
              //const treeSelectionString = populateTreeFromWebiny;
              if (treeSelectionString === null) {
                //console.log("NULL field, currentId=", currentId);
                dataMap.set(currentId, dataCopy);
                //console.log(dataMap.get(currentId));
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
                for (let j = 0; j < dataCopy.length; j++) {
                  const makeObj = dataCopy[j];
                  //console.log("data[j]: ", makeObj);
                  if (found) {
                    break;
                  }
                  if (makeObj.label === e) {
                    found = true;
                    treeSelectionMap.get(currentId)?.add(e);
                    makeObj.checked = true;
                  }

                  if (makeObj.children) {


                    for (let k = 0; k < makeObj.children.length; k++) {
                      const yearObj = makeObj.children[k];
                      //console.log("yearObj: ", yearObj);
                      if (found) {
                        break;
                      }
                      if (yearObj.label === e) {
                        //found = true;
                        treeSelectionMap.get(currentId)?.add(e);
                        yearObj.checked = true;
                      }

                      for (let L = 0; L < yearObj.children.length; L++) {
                        const modelObj = yearObj.children[L];
                        //console.log("modelObj: ", modelObj);
                        if (found) {
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
              }
              dataMap.set(currentId, dataCopy);
            }
            setDataMap(dataMap)
          });
        });

      }, []);



      // caches tree selection of each entry displayed on page.

      
      const concatDataHelper = (element: any): [] => {
        const dataContainer: any = []
        let makeFound = false;
        if (dataContainer.length === 0) { // initial population
          //console.log('abcd');
          dataContainer.push({ 'label': element.mmy.make.toString(), value: "", children: [{ 'label': element.mmy.year.toString(), value: "", children: [{ 'label': element.mmy.model, value: '' }] }] });
        } else {
          for (let i = 0; i < dataContainer.length; i++) { // check if make already exists
            if (dataContainer[i].label.toString() === element.mmy.make.toString()) {
              makeFound = true;
              // check if year exists
              let yearFound = false;
              for (let j = 0; j < dataContainer[i].children.length; j++) { // check if year exists
                if (dataContainer[i].children[j].label === element.mmy.year.toString()) {
                  yearFound = true;
                  // check if model exists
                  let modelFound = false;
                  for (let k = 0; k < dataContainer[i].children[j].children.length; k++) {
                    if (dataContainer[i].children[j].children[k].label === element.mmy.model) {
                      modelFound = true;
                      break;
                    }
                  }
                  // if model not found insert model
                  if (!modelFound) {
                    dataContainer[i].children[j].children.push({ 'label': element.mmy.model.toString(), value: '' });
                  }
                  break;
                }
              }
              // if year not found insert year > model
              if (!yearFound) {
                dataContainer[i].children.push({ 'label': element.mmy.year.toString(), value: '', children: [{ 'label': element.mmy.model.toString() }] });
              }
              break;
            }
          }
          // if make not found insert make > year > model
          if (!makeFound) {
            dataContainer.push({ 'label': element.mmy.make.toString(), value: "", children: [{ 'label': element.mmy.year.toString(), value: "", children: [{ 'label': element.mmy.model, value: '' }] }] });
          }

        }
        return dataContainer;
      }

      // modifies entry in database with Post request
      useEffect(() => {
        if (isButtonClicked && treeSelection) {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //'Content-Length': data.length,
              'Authorization': API_token, // token
              'User-Agent': 'dropdown-POC',
            },
            body: JSON.stringify({
              query: `mutation {
        update${modelID.substring(0, modelID.length - 1)}(revision: "${window.location.href.split("=")[1].replace("%23", "#")}",
          data:{
            ${fieldName}: "${Array.from(treeSelection).toString()}"
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
          const effect = async () => {
            await fetch('https://d32jw21mvjpo6q.cloudfront.net/cms/manage/en-US', requestOptions);
          };

          effect();

          //const webinyData = await response.json();
          //console.log(webinyData);
          //console.log(requestOptions.body);
          alert('saved to db');
        }
      }, [isButtonClicked])

      const onChange = (currentNode: any, selectedNodes: any) => { // runs when a node is checked/unchecked.
        console.log('onChange::', currentNode, selectedNodes);
        // updates set to keep track of selections made in dropdown nodes
        if (currentNode.checked) {
          const temp = treeSelection;
          if (temp) {
            temp?.add(currentNode.label.toString())
            setTreeSelection(temp)
          }
        } else {
          const temp = treeSelection;
          if (temp) {
            temp?.delete(currentNode.label.toString())
            setTreeSelection(temp)
          }
        }
        // will print currently selected nodes, specific to selected entry.
        // console.log(`treeSelection: [${Array.from(treeSelection).toString()}]`);
      }

      const onAction = (node: any, action: any) => {
        console.log('onAction::', action, node)
      }
      const onNodeToggle = (currentNode: any) => { // runs when nodes are expanded/hidden
        console.log('onNodeToggle::', currentNode);
      }

      // currently selected entry's revisionID
      //const currentId = window.location.href.split("=")[1].replace("%23", "#");
      const search = useLocation().search;
      const id = new URLSearchParams(search).get("id");
      let displayDataArray: Array<any> = []
      if (dataMap) {
        if (id) {
          displayDataArray = dataMap.get(id) || [];
        } else {
          const [firstKey] = dataMap.keys();
          displayDataArray = dataMap.get(firstKey) || [];
        }
      }
      console.log('displayDataArray -- ' + displayDataArray);
      return (
        <div>
          <div>
            <button onClick={() => setIsButtonClicked(true)}> Update Entry </button>
          </div>
          <link href="https://unpkg.com/react-dropdown-tree-select/dist/styles.css" rel="stylesheet" />

          <DropdownTreeSelect data={displayDataArray} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />

          <div id="dropdownFieldId">
            <Bind>
              {bind => (
                <Input
                  {...bind}
                  label={"placeholder text"}
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
}); */
