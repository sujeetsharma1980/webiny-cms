import React from "react";
import { CmsEditorFieldTypePlugin } from "@webiny/app-headless-cms/types";

const TextIcon: React.FunctionComponent = () => <i>dropdown select</i>;

const plugin: CmsEditorFieldTypePlugin = {
  type: "cms-editor-field-type",
  name: "cms-editor-field-type-dropdown",
  field: {
    type: "dropdown",
    label: "Dropdown Select",
    description: "Used for selecting mmy and stores into DB.",
    icon: <TextIcon />,
    allowMultipleValues: false,
    allowPredefinedValues: false,
    multipleValuesLabel: "Use as a list of text values",
    createField() {
      return {
        type: "dropdown",
        validation: [],
        renderer: {
          name: ""
        }
      };
    }
  }
};

export default plugin;