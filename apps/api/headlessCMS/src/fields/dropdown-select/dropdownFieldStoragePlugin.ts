import { StorageTransformPlugin } from "@webiny/api-headless-cms/plugins/StorageTransformPlugin";


const plugin = new StorageTransformPlugin({
    fieldType: "dropdown",
    toStorage: async ({ value, field } : {value: any, field: any}) => { 
      //const encryptText = new cryptr("myTotallySecretKey").encrypt(value);
      console.log("toStorage{value}: ", value, ", field: ", field);
      return {
        value: value
      };
    },
    fromStorage: async ({ value, field } : {value: any, field: any}) => {
      console.log("fromStorage{value}: ", value, ", field: ", field);
      return value.value;
    }
  });
  
  export default () => {
    return plugin;
  };