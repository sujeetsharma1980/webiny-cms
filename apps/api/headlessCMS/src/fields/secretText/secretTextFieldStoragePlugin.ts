import { StorageTransformPlugin } from "@webiny/api-headless-cms/plugins/StorageTransformPlugin";


const plugin = new StorageTransformPlugin({
    fieldType: "secret-text",
    toStorage: async ({ value, field } : {value: any, field: any}) => { // where does value come from?
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