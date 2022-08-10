import React, {useEffect, useState} from 'react'
import { css } from 'emotion'
import { ElementRoot } from '@webiny/app-page-builder/render/components/ElementRoot'
import { PbEditorElement } from "@webiny/app-page-builder/types";
import { Tabs, Tab } from "@webiny/ui/Tabs";
import { Scrollbar } from "@webiny/ui/Scrollbar";
import { Grid, Cell } from "@webiny/ui/Grid";




const outerWrapper = css({
  boxSizing: 'border-box',
})

interface CarDisplayProps {
    element: PbEditorElement;
}

  const IFrame: React.FC<CarDisplayProps> = ({ element }) => {

    // const jatoToken = "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjhlMTBkNTU2LTE4MTMtNDc0My1iOTI4LTA5NTU5Y2UwOTJiOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ1cy5tb3RvcnRyZW5kIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiYWJjNThiZGMtOGFlOC00NGU5LWJiZDktMTc3MDJlZWNjY2RkIiwiaHR0cDovL3NjaGVtYXMuamF0by5jb20vd3MvMjAxNS8wNi9pZGVudGl0eS9jbGFpbXMvY2EvYWxsb3dlZGN1bHR1cmVzIjpbImVuLUNBIiwiZnItQ0EiXSwiaHR0cDovL3NjaGVtYXMuamF0by5jb20vd3MvMjAxOC8xMC9pZGVudGl0eS9jbGFpbXMvY2EvYWxsb3dlZHNwZWNzIjoidHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTYvMDYvaWRlbnRpdHkvY2xhaW1zL2NhL2FsbG93ZWRoaXN0b3JpY2FsIjoidHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTUvMDcvaWRlbnRpdHkvY2xhaW1zL2NhL2FsbG93ZWRpbmNlbnRpdmVzIjoidHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTUvMDgvaWRlbnRpdHkvY2xhaW1zL2NhL2FsbG93ZWR2aW5kZWNvZGluZyI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE1LzA2L2lkZW50aXR5L2NsYWltcy91cy9hbGxvd2VkY3VsdHVyZXMiOiJlbi1VUyIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTgvMTAvaWRlbnRpdHkvY2xhaW1zL3VzL2FsbG93ZWRzcGVjcyI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE2LzA2L2lkZW50aXR5L2NsYWltcy91cy9hbGxvd2VkaGlzdG9yaWNhbCI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE1LzA3L2lkZW50aXR5L2NsYWltcy91cy9hbGxvd2VkaW5jZW50aXZlcyI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE1LzA4L2lkZW50aXR5L2NsYWltcy91cy9hbGxvd2VkdmluZGVjb2RpbmciOiJ0cnVlIiwiaHR0cDovL3NjaGVtYXMuamF0by5jb20vd3MvMjAxNy8wNC9pZGVudGl0eS9jbGFpbXMvbXgvc3Vic2NyaXB0aW9ua2V5IjoiMDZmYmMxYWI4YTAxNDZkYjgwYTcxODdjZTgzNWMwMjMiLCJodHRwOi8vc2NoZW1hcy5qYXRvLmNvbS93cy8yMDE3LzA0L2lkZW50aXR5L2NsYWltcy91cy9zdWJzY3JpcHRpb25rZXkiOiIwNmZiYzFhYjhhMDE0NmRiODBhNzE4N2NlODM1YzAyMyIsImh0dHA6Ly9zY2hlbWFzLmphdG8uY29tL3dzLzIwMTcvMDQvaWRlbnRpdHkvY2xhaW1zL2NhL3N1YnNjcmlwdGlvbmtleSI6IjA2ZmJjMWFiOGEwMTQ2ZGI4MGE3MTg3Y2U4MzVjMDIzIiwiaHR0cDovL3NjaGVtYXMuamF0by5jb20vd3MvMjAxNy8wNC9pZGVudGl0eS9jbGFpbXMvYnIvc3Vic2NyaXB0aW9ua2V5IjoiMDZmYmMxYWI4YTAxNDZkYjgwYTcxODdjZTgzNWMwMjMiLCJuYmYiOjE2NTk1NDg4OTUsImV4cCI6MTY1OTYzNTI5NCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmphdG9mbGV4LmNvbSIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIn0.noCIZt5HB4xGamRaim_M839kdFGmqaIXkkXWosqsqR4"

    const [jatoToken, setJatoToken] = useState("");

    //useState Variables 

      //Main Features 
    const [manufactureCode,setManufactureCode] = useState("");  
    const [trim,setTrim] = useState("");
    const [combinedEpaMpg,setCombinedEpaMpg] = useState("");
    const [bodyStyle,setBodyStyle] = useState("");
    const [bodyType,setBodyType] = useState("");
    const [doors,setDoors] = useState("");
    const [drive,setDrive] = useState("");

    
      //Interior Dimension
    const [frontHeadRoom, setFrontHeadRoom] = useState("");
    const [rearHeadRoom, setRearHeadRoom] = useState("");
    const [rearLegRoom, setRearLegRoom] = useState("");
    const [frontLegRoom, setFrontLegRoom] = useState("");
    const [frontShoulderRoom, setFrontShoulderRoom] = useState("");
    const [rearShoulderRoom, setRearShoulderRoom] = useState("");

      //Exterior Dimension
    const [wheelBase,setWheelBase] = useState("");
    const [width,setWidth] = useState("");
    const [length,setLength] = useState("");
    const [height,setHeight] = useState("");
    const [groundClearance,setGroundClearance] = useState("");
    const [curbWeight,setCurbWeight] = useState("");

      //Capacity
    const [seatingCapacity, setSeatingCapacity] = useState("");
    const [gvwr, setGVWR] = useState("");
    const [cargoCapacity, setCargoCapacity] = useState("");
    const [payloadCapacity, setPayloadCapacity] = useState("");
    const [towingCapacity, setTowingCapacity] = useState("");
    const [fuelCapacity, setFuelCapacity] = useState("");
  
    //Drive Train Info
    const [engineName,setEngineName] = useState("");
    const [engineSize, setEngineSize] = useState("");
    const [horsePower, setHorsePower] = useState("");
    const [torque, setTorque] = useState("");
    const [cylinderConfiguration, setCylinderConfiguration] = useState("");
    const [numberOfCylinder, setNumberofCylinder] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [transmissionType, setTransmissionType] = useState("");
    const [transmissionSpeed, setTransmissionSpeed] = useState("");
    const [drivingRange, setDrivingRange] = useState("");

      //NHTSA
    const [ratingFrontDriver, setRatingFrontDriver] = useState("");
    const [ratingFrontPassenger, setRatingFrontPassenger] = useState("");
    const [ratingFrontSide, setRatingFrontSide] = useState("");
    const [ratingRearSide, setRatingRearSide] = useState("");
    const [ratingOverall, setRatingOverall] = useState("");
    const [ratingRollover, setRatingRollover] = useState("");

      //IIHS
    const [frontModerateOverlap, setFrontModerateOverlap] = useState("");
    const [overallSideCrash, setOverallSideCrash] = useState("");
    const [bestPick, setBestPick] = useState("");
    const [rearCrash, setRearCrash] = useState("");
    const [roofStrength, setRoofStrength] = useState("");
    const [frontSmallOverlap, setFrontSmallOverlap] = useState("");

      //Safety Features
    const [rearAirbag, setRearAirbag] = useState("");
    const [rearSideAirbag, setSideRearAirbag] = useState("");
    const [sideAirbag, setSideAirbag] = useState("");
    const [driverAirbag, setDriverAirbag] = useState("");
    const [passengerAirbag, setPassengerAirbag] = useState("");
    const [kneeAirbag, setKneeAirbag] = useState("");
    const [adjustablePedals, setAdjustablePedals] = useState("");
    const [brakeAssist, setBrakeAssist] = useState("");
    const [heatedWiperWashers, setHeatedWiperWashers] = useState("");
    const [parkingDistanceControl, setParkingDistanceControl] = useState("");
    const [limitedSlipDifferential, setLimitedSlipDifferential] = useState("");
    const [hillDescentControl, setHillDescentControl] = useState("");
    const [integratedChildSafetySeat, setIntegratedChildSafetySeat] = useState("");
    const [stabilityControl, setStabilityControl] = useState("");
    const [theftDeterrentSystem, setTheftDeterrentSystem] = useState("");

      //Warranty
    const [fullWarrantyMiles, setFullWarrantyMiles] = useState("");
    const [fullWarrantyMonths, setFullWarrantyMonths] = useState("");
    const [powertrainWarrantyMiles, setPowertrainWarrantyMiles] = useState("");
    const [powertrainWarrantyMonths, setPowertrainWarrantyMonths] = useState("");
    const [maintenanceWarrantyMiles, setMaintenanceWarrantyMiles] = useState("");
    const [maintenanceWarrantyMonths, setMaintenanceWarrantyMonths] = useState("");
    const [roadsideWarrantyMiles, setRoadsideWarrantyMiles] = useState("");
    const [roadsideWarrantyMonths, setRoadsideWarrantyMonths] = useState("");
    const [corrosionWarrantyMiles, setCorrosionWarrantyMiles] = useState("");
    const [corrosionWarrantyMonths, setCorrosionWarrantyMonths] = useState("");

      //Dropdowns
    const [makes, setMakes] = useState({results :  [{makeName : ''}]});
    const [models, setModels] = useState<any[]>([{modelBodyId : '', modelName: ''}]); 
    const [versions, setVersions] = useState<any[]>([{vehicleId: '',versionName : ''}]);
    const [selectedMake, setSelectedMake] = useState(undefined);
    const [selectedModelID, setSelectedModelID] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedVehicleID, setSelectedVehicleID] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');



    //use effects

    //fetching data from webiny based on vehicle ID
    useEffect(() => {
      const url = "https://d253he7xobk0g4.cloudfront.net/cms/read/en-US";
  
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
                  listJatoCarDataFerraris(where:{vehicleId: ${selectedVehicleID}}) {
                    data {
                      interiorDimension {
                        frontHeadRoom
                        rearHeadRoom
                        rearLegRoom
                        frontLegRoom
                        frontShoulderRoom
                        rearShoulderRoom
                      }
                      exteriorDimension {
                        wheelBase
                        width
                        length
                        height
                        groundClearance
                        curbWeight
                      }
                      drivetrainInfo {
                        engineName
                        engineSize
                        horsePower
                        torque
                        cylinderConfiguration
                        numberOfCylinder
                        fuelType
                        transmissionType
                        transmissionSpeed
                        drivingRange
                      }
                      mainFeatures {
                        doors
                        drive
                        manufactureCode
                        trim
                        bodyStyle
                        bodyType
                        combinedEpaMpg
                      }
                      capacity {
                        seatingCapacity
                        gvwr
                        cargoCapacity
                        payloadCapacity
                        towingCapacity
                        fuelCapacity
                      }
                      warranty {
                        fullWarrantyMonths
                        powertrainWarrantyMiles
                        powertrainWarrantyMonths
                        maintenanceWarrantyMiles
                        maintenanceWarrantyMonths
                        roadsideWarrantyMiles
                        roadsideWarrantyMonths
                        corrosionWarrantyMiles
                        corrosionWarrantyMonths
                        fullWarrantyMiles
                      }
                      nhtsa {
                        nhtsaRatingFrontDriver
                        nhtsaRatingFrontPassenger
                        nhtsaRatingFrontSide
                        nhtsaRatingRearSide
                        nhtsaRatingOverall
                        nhtsaRatingRollover
                      }
                      iihs{
                        iihsFrontModerateOverlap
                        iihsOverallSideCrash
                        iihsBestPick
                        iihsRearCrash
                        iihsRoofStrength
                        iihsFrontSmallOverlap
                      }
                      safetyFeatures {
                        theftDeterrentSystem
                        stabilityControl
                        integratedChildSafetySeat
                        hillDescentControl
                        hillDescentControl
                        limitedSlipDifferential
                        parkingDistanceControl
                        heatedWiperWashers
                        brakeAssist
                        adjustablePedals
                        passengerAirbag
                        kneeAirbag
                        sideAirbag
                        driverAirbag
                        rearAirbag
                        rearSideAirbag
                      }
                    }
                  }
              }`
              }),
            }
          );
          const json = await response.json();
         
          //Setting fetched data with useStates

          //Main Features 
          setManufactureCode(json.data.listJatoCarDataFerraris.data[0].mainFeatures.manufactureCode);
          setTrim(json.data.listJatoCarDataFerraris.data[0].mainFeatures.trim);
          setCombinedEpaMpg(json.data.listJatoCarDataFerraris.data[0].mainFeatures.combinedEpaMpg);
          setBodyStyle(json.data.listJatoCarDataFerraris.data[0].mainFeatures.bodyStyle);
          setBodyType(json.data.listJatoCarDataFerraris.data[0].mainFeatures.bodyType);
          setDoors(json.data.listJatoCarDataFerraris.data[0].mainFeatures.doors);
          setDrive(json.data.listJatoCarDataFerraris.data[0].mainFeatures.drive);

          //Interior Dimension
          setFrontHeadRoom(json.data.listJatoCarDataFerraris.data[0].interiorDimension.frontHeadRoom);
          setRearHeadRoom(json.data.listJatoCarDataFerraris.data[0].interiorDimension.rearHeadRoom);
          setRearLegRoom(json.data.listJatoCarDataFerraris.data[0].interiorDimension.rearLegRoom);
          setFrontLegRoom(json.data.listJatoCarDataFerraris.data[0].interiorDimension.frontLegRoom);
          setFrontShoulderRoom(json.data.listJatoCarDataFerraris.data[0].interiorDimension.frontShoulderRoom);
          setRearShoulderRoom(json.data.listJatoCarDataFerraris.data[0].interiorDimension.rearShoulderRoom);

          //Exterior Dimensions
          setWheelBase(json.data.listJatoCarDataFerraris.data[0].exteriorDimension.wheelBase);
          setWidth(json.data.listJatoCarDataFerraris.data[0].exteriorDimension.width);
          setLength(json.data.listJatoCarDataFerraris.data[0].exteriorDimension.length);
          setHeight(json.data.listJatoCarDataFerraris.data[0].exteriorDimension.height);
          setGroundClearance(json.data.listJatoCarDataFerraris.data[0].exteriorDimension.groundClearance);
          setCurbWeight(json.data.listJatoCarDataFerraris.data[0].exteriorDimension.curbWeight);
        
          //Capacity 
          setSeatingCapacity(json.data.listJatoCarDataFerraris.data[0].capacity.seatingCapacity);
          setGVWR(json.data.listJatoCarDataFerraris.data[0].capacity.gvwr);
          setCargoCapacity(json.data.listJatoCarDataFerraris.data[0].capacity.cargoCapacity);
          setPayloadCapacity(json.data.listJatoCarDataFerraris.data[0].capacity.payloadCapacity);
          setTowingCapacity(json.data.listJatoCarDataFerraris.data[0].capacity.towingCapacity);
          setFuelCapacity(json.data.listJatoCarDataFerraris.data[0].capacity.fuelCapacity);

          //Drive Train Info 
          setEngineName(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.engineName);
          setEngineSize(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.engineSize);
          setHorsePower(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.horsePower);
          setTorque(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.torque);
          setCylinderConfiguration(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.cylinderConfiguration);
          setNumberofCylinder(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.numberOfCylinder);
          setFuelType(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.fuelType);
          setTransmissionType(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.transmissionType);
          setTransmissionSpeed(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.transmissionSpeed);
          setDrivingRange(json.data.listJatoCarDataFerraris.data[0].drivetrainInfo.drivingRange);

          //NHTSA
          setRatingFrontDriver(json.data.listJatoCarDataFerraris.data[0].nhtsa.nhtsaRatingFrontDriver);
          setRatingFrontPassenger(json.data.listJatoCarDataFerraris.data[0].nhtsa.nhtsaRatingFrontPassenger);
          setRatingFrontSide(json.data.listJatoCarDataFerraris.data[0].nhtsa.nhtsaRatingFrontSide);
          setRatingRearSide(json.data.listJatoCarDataFerraris.data[0].nhtsa.nhtsaRatingRearSide);
          setRatingOverall(json.data.listJatoCarDataFerraris.data[0].nhtsa.nhtsaRatingOverall);
          setRatingRollover(json.data.listJatoCarDataFerraris.data[0].nhtsa.nhtsaRatingRollover);

          //IIHS
          setFrontModerateOverlap(json.data.listJatoCarDataFerraris.data[0].iihs.iihsFrontModerateOverlap);
          setOverallSideCrash(json.data.listJatoCarDataFerraris.data[0].iihs.iihsOverallSideCrash);
          setBestPick(json.data.listJatoCarDataFerraris.data[0].iihs.iihsBestPick);
          setRearCrash(json.data.listJatoCarDataFerraris.data[0].iihs.iihsRearCrash);
          setRoofStrength(json.data.listJatoCarDataFerraris.data[0].iihs.iihsRoofStrength);
          setFrontSmallOverlap(json.data.listJatoCarDataFerraris.data[0].iihs.iihsFrontSmallOverlap);

          //Safety
          setRearAirbag(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.rearAirbag);
          setSideRearAirbag(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.rearSideAirbag);
          setSideAirbag(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.sideAirbag);
          setDriverAirbag(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.driverAirbag);
          setPassengerAirbag(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.passengerAirbag);
          setKneeAirbag(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.kneeAirbag);
          setAdjustablePedals(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.adjustablePedals);
          setBrakeAssist(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.brakeAssist);
          setHeatedWiperWashers(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.heatedWiperWashers);
          setParkingDistanceControl(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.parkingDistanceControl);
          setLimitedSlipDifferential(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.limitedSlipDifferential);
          setHillDescentControl(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.hillDescentControl);
          setIntegratedChildSafetySeat(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.integratedChildSafetySeat);
          setStabilityControl(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.stabilityControl);
          setTheftDeterrentSystem(json.data.listJatoCarDataFerraris.data[0].safetyFeatures.theftDeterrentSystem);

          //Warranty
          setFullWarrantyMiles(json.data.listJatoCarDataFerraris.data[0].warranty.fullWarrantyMiles);
          setFullWarrantyMonths(json.data.listJatoCarDataFerraris.data[0].warranty.fullWarrantyMonths);
          setPowertrainWarrantyMiles(json.data.listJatoCarDataFerraris.data[0].warranty.powertrainWarrantyMiles);
          setPowertrainWarrantyMonths(json.data.listJatoCarDataFerraris.data[0].warranty.powertrainWarrantyMonths);
          setMaintenanceWarrantyMiles(json.data.listJatoCarDataFerraris.data[0].warranty.maintenanceWarrantyMiles);
          setMaintenanceWarrantyMonths(json.data.listJatoCarDataFerraris.data[0].warranty.maintenanceWarrantyMonths);
          setRoadsideWarrantyMiles(json.data.listJatoCarDataFerraris.data[0].warranty.roadsideWarrantyMiles);
          setRoadsideWarrantyMonths(json.data.listJatoCarDataFerraris.data[0].warranty.roadsideWarrantyMonths);
          setCorrosionWarrantyMiles(json.data.listJatoCarDataFerraris.data[0].warranty.corrosionWarrantyMiles);
          setCorrosionWarrantyMonths(json.data.listJatoCarDataFerraris.data[0].warranty.corrosionWarrantyMonths);

        }catch(error) {
          console.log('error', error);
        }
      };
      fetchData();
      
    }, [selectedVersion]);

    //Fetch JATO Auth Token Configs
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", "us.motortrend");
    urlencoded.append("password", "space3station");
    urlencoded.append("grant_type", "password");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };


    //Fetch makes and JATO Auth Token
    useEffect(() => {
      async function fetchMakes() {
          const jatoRes=  await fetch("https://auth.jatoflex.com/oauth/token", requestOptions)
          const res = await jatoRes.json();
         
          setJatoToken(res.access_token);
        const response = await fetch("https://api.jatoflex.com/api/en-us/makes?page=!1&pageSize=1000", {headers : {
          'authorization' :"Bearer "  + res.access_token,
          'Subscription-Key': '06fbc1ab8a0146db80a7187ce835c023'
        }});
        const fetchedMakes = await response.json();
        setMakes(fetchedMakes);
      }
      fetchMakes();
    }, []);
  
    //Fetch Models
    useEffect(() => {
      if(selectedMake)
      {
        async function fetchModels() {
          const response = await fetch(`https://api.jatoflex.com/api/en-us/filters/${selectedMake}/models`, {headers : {
            'authorization' : "Bearer " + jatoToken,
            'Subscription-Key': '06fbc1ab8a0146db80a7187ce835c023'
          }});
          
          // Find unique models and set in models state
          const fetched = await response.json();
     
          var modelArray:any[] = [];
          fetched.makeGroups[0].models.new.map((model: any) => {
            modelArray.push({modelName: model.modelBodyName, modelId : model.modelBodyId});
          });
          
          setModels(modelArray);
          
        }
        fetchModels();
      }
    }, [selectedMake]);
  
    //Fetch Version/VehicleID
    useEffect(() => {
   
      if(selectedModelID && selectedYear)
      {
        async function fetchVersions() {
          const response = await fetch(`https://api.jatoflex.com/api/en-us/filters/${selectedModelID}/${selectedYear}/versions`, {headers : {
            'authorization' : "Bearer " + jatoToken,
            'Subscription-Key': '06fbc1ab8a0146db80a7187ce835c023'
          }});
          
          const fetchedVersions = await response.json();
          var versionArray:any[]= [];
          fetchedVersions.map((version: any) => {
            versionArray.push({vehicleId : version.vehicleId, versionName: version.versionName})
          })
          
          setVersions(versionArray);
         
         
        }
        fetchVersions();
      }
     
    }, [selectedModelID,selectedYear]);

   
    
  const { data } = element
  // If the user didn't enter a URL, let's show a simple message.
  
    if (!data?.iframe?.url) {
    return <div>IFrame URL is missing.</div>
  }
 

  //Event handling
  function handleSelectMake(event:any) {
    setSelectedMake(event.target.value);
  }

  function handleSelectModelID(event:any) {
    setSelectedModelID(event.target.value);
  }
  function handleSelectYear(event:any) {
    setSelectedYear(event.target.value);
  }
  function handleSelectVersion(event:any) {
    const splitVal = event.target.value.split(',');
    setSelectedVersion(splitVal[1]);
    setSelectedVehicleID(splitVal[0]);
  }



  // Otherwise, let's render the iframe.
  return (
    <ElementRoot
      className={
        'webiny-pb-base-page-element-style webiny-pb-page-element-embed-iframe ' + outerWrapper
      }
      element={element}
    >
      
      <Grid>
        <Cell span={3}>
          
            <select value={selectedMake} onChange = {handleSelectMake} >
            
              {makes.results.map(name => <option key={name.makeName} value={name.makeName}>{name.makeName}</option>)} 

            </select>
       
        </Cell>
        <Cell span={3}>

        <select value={selectedModelID} onChange = {handleSelectModelID} >
            {models.map(model => <option key={model.modelName} value={model.modelId}>{model.modelName}</option>)}
          </select>
        </Cell>
        <Cell span={3}>
          <select value={selectedYear} onChange={handleSelectYear}>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
            <option>2016</option>
            <option>2015</option>
            <option>2014</option>
            <option>2013</option>
            <option>2012</option>
            <option>2011</option>
            <option>2010</option>
            <option>2009</option>
            <option>2008</option>
            <option>2007</option>
            <option>2006</option>
            <option>2005</option>
            <option>2004</option>
            <option>2003</option>
            <option>2002</option>
          </select>
        </Cell>
        <Cell span={3}>
          <select value={selectedVersion} onChange = {handleSelectVersion}>
            {versions.map(version => <option key ={version.vehicleId} value= {[version.vehicleId,version.versionName]}>{version.versionName}</option>)}
          </select>
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
            <Cell  span={6} >
              Manufacture Code: {manufactureCode}
            </Cell>
            <Cell  span={6} >
              Trim: {trim}
            </Cell>
            <Cell  span={6} >
              Combined MPG_EPA: {combinedEpaMpg}
            </Cell>
            <Cell  span={6} >
              Body Style: {bodyStyle}
            </Cell>
            <Cell  span={6} >
              Body Type: {bodyType} 
            </Cell>
            <Cell  span={6} >
              Doors: {doors}
            </Cell>
            <Cell  span={6} >
              Drive: {drive}
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
              Front Head Room: {frontHeadRoom}
            </Cell>
            <Cell  span={4} >
              Rear Head Room: {rearHeadRoom}
            </Cell>
            <Cell  span={4} >
              Rear Leg Room: {rearLegRoom}
            </Cell>
            <Cell  span={4} >
              Front Leg Room: {frontLegRoom}
            </Cell>
            <Cell  span={4} >
              Front Shoulder Room: {frontShoulderRoom}
            </Cell>
            <Cell  span={4} >
              Rear Shoulder Room: {rearShoulderRoom}
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
            <Cell  span={6}>
              Wheel Base: {wheelBase} 
            </Cell>
            <Cell  span={6} >
              Width: {width}
            </Cell>
            <Cell  span={6} >
              Length: {length}
            </Cell>
            <Cell  span={6} >
              Height: {height}
            </Cell>
            <Cell  span={6} >
              Ground Clearance: {groundClearance}
            </Cell>
            <Cell  span={6} >
              Curb Weight: {curbWeight}
            </Cell>
          </Grid>
          </Scrollbar>
        </Tab>
        
        <Tab label="Capacity">
           <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
           <Grid>
           <Cell span = {6}>
              Seating Capacity: {seatingCapacity}
            </Cell>
            <Cell span = {6}>
              GVWR: {gvwr}
            </Cell>
            <Cell span = {6}>
              Cargo Capacity: {cargoCapacity}           
            </Cell>
            <Cell span = {6}>
              Payload Capacity: {payloadCapacity}
            </Cell>
            <Cell span = {6}>
              Towing Capacity: {towingCapacity}
            </Cell>
            <Cell span = {6}>
              Fuel Capacity: {fuelCapacity}
            </Cell>
           </Grid>
            </Scrollbar>
        </Tab>
        <Tab label="Drivetrain Info">
           <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
           <Grid>
           <Cell span = {6}>
              Engine Name: {engineName}
            </Cell>
            <Cell span = {6}>
              Engine Size: {engineSize}
            </Cell>
            <Cell span = {6}>
              Horse Power: {horsePower}  
            </Cell>
            <Cell span = {6}>
              Torque: {torque}
            </Cell>
            <Cell span = {6}>
              Cylinder Configuration: {cylinderConfiguration}
            </Cell>
            <Cell span = {6}>
              Number of Cylinders: {numberOfCylinder}
            </Cell>
            <Cell span = {6}>
              Fuel Type: {fuelType}
            </Cell>
            <Cell span = {6}>
              Transmission Type: {transmissionType}
            </Cell>
            <Cell span = {6}>
              Transmission Speed:  {transmissionSpeed} 
            </Cell>
            <Cell span = {6}>
              Driving Range: {drivingRange}
            </Cell>
           </Grid>
            </Scrollbar>
        </Tab>
        <Tab label="NHTSA">
           <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
           <Grid>
           <Cell span = {6}>
              NHTSA Rating Front Driver:  {ratingFrontDriver}
            </Cell>
            <Cell span = {6}>
              NHTSA Rating Front Passenger:  {ratingFrontPassenger}
            </Cell>
            <Cell span = {6}>
               NHTSA Rating Front Side:  {ratingFrontSide}
            </Cell>
            <Cell span = {6}>
              NHTSA Rating Rear Side:  {ratingRearSide}
            </Cell>
            <Cell span = {6}>
              NHTSA Rating Overall:  {ratingOverall}
            </Cell>
            <Cell span = {6}>
             NHTSA Rating Rollover:  {ratingRollover}
            </Cell>
           </Grid>
            </Scrollbar>
        </Tab>
        <Tab label="IIHS">
           <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
           <Grid>
           <Cell span = {6}>
              IIHS Front Moderate Overlap: {frontModerateOverlap}
            </Cell>
            <Cell span = {6}>
              IIHS Overall Side Crash: {overallSideCrash}
            </Cell>
            <Cell span = {6}>
              IIHS Best Pick: {bestPick}
            </Cell>
            <Cell span = {6}>
              IIHS Rear Crash: {rearCrash}
            </Cell>
            <Cell span = {6}>
              IIHS Roof Stregnth: {roofStrength}
            </Cell>
            <Cell span = {6}>
              IIHS Front Small Overlap:  {frontSmallOverlap}
            </Cell>
           </Grid>
            </Scrollbar>
        </Tab>
        <Tab label="Safety Features">
           <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
           <Grid>
           <Cell span = {6}>
              Rear Airbag: {rearAirbag}
            </Cell>
            <Cell span = {6}>
             Rear SideAirbag: {rearSideAirbag}
            </Cell>
            <Cell span = {6}>
             Side Airbag: {sideAirbag}
            </Cell>
            <Cell span = {6}>
              Driver Airbag: {driverAirbag}
            </Cell>
            <Cell span = {6}>
              Passenger Airbag: {passengerAirbag}
            </Cell>
            <Cell span = {6}>
              Knee Airbag: {kneeAirbag}
            </Cell>
            <Cell span = {6}>
              Adjustable Pedals: {adjustablePedals}
            </Cell>
            <Cell span = {6}>
              Brake Assist: {brakeAssist}
            </Cell>
            <Cell span = {6}>
              Heated Wiper Washers: {heatedWiperWashers}
            </Cell>
            <Cell span = {6}>
              Parking Distance Control: {parkingDistanceControl}
            </Cell>
            <Cell span = {6}>
             Limited Slip Differential: {limitedSlipDifferential}
            </Cell>
            <Cell span = {6}>
              Hill Descent Control: {hillDescentControl}
            </Cell>
            <Cell span = {6}>
              Integrated Child Safety: {integratedChildSafetySeat}
            </Cell>
            <Cell span = {6}>
              Stability Control: {stabilityControl}
            </Cell>
            <Cell span = {6}>
              Theft Deterrent System: {theftDeterrentSystem}
            </Cell>
           </Grid>
            </Scrollbar>
        </Tab>
        <Tab label="Warranty">
           <Scrollbar
              style={
                {
                  height:300
                }
              }
            >
           <Grid>
           <Cell span = {6}>
              Full Warranty Miles: {fullWarrantyMiles}
            </Cell>
            <Cell span = {6}>
              Full Warranty Months: {fullWarrantyMonths}
            </Cell>
            <Cell span = {6}>
              Powertrain Warranty Miles: {powertrainWarrantyMiles}
            </Cell>
            <Cell span = {6}>
              Powertrain Warranty Months: {powertrainWarrantyMonths}
            </Cell>
            <Cell span = {6}>
              Maintenance Warranty Miles: {maintenanceWarrantyMiles}
            </Cell>
            <Cell span = {6}>
              Maintenance Warranty Months: {maintenanceWarrantyMonths}
            </Cell>
            <Cell span = {6}>
              Roadside Warranty Miles: {roadsideWarrantyMiles}
            </Cell> 
            <Cell span = {6}>
              Roadside Warranty Months: {roadsideWarrantyMonths}
            </Cell> 
            <Cell span = {6}>
              Corrosion Warranty Miles: {corrosionWarrantyMiles}
            </Cell> 
            <Cell span = {6}>
              Corrosion Warranty Months: {corrosionWarrantyMonths}
            </Cell> 
           </Grid>
            </Scrollbar>
        </Tab>
      </Tabs>
    </ElementRoot>
  )
}

export default IFrame
