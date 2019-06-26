import React from 'react';
import './App.css';
import TextEcg from  './component/electrocardiogram/index';

const App: React.FC = () => {
  let ecg=[134,133,133,133,133,134,133,133,133,133,133,133,133,132,131,130,129,128,127,127,126,126,126,126,
    127,127,128,129,130,132,133,133,133,133,134,134,133,133,133,133,133,133,133,133,133,133,133,133,133,133,
    134,134,135,136,136,132,125,114,102,90,83,82,94,107,122,133,141,144,143,141,139,138,136,134,133,133,133,133,
    133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,132,132,
    130,129,127,126,124,123,121,119,117,116,115,114,113,112,112,111,111,110,110]
   let option =[
      {color:'#50E473',coordinateY:250,isLine:true,maxValue:350,minValue:15,length:1900},// ECG画脉搏
      // {color:'#FCFDFD',coordinateY:80,isLine:true,maxValue:270,minValue:10}, // NIBP画血压
      // {color:'#FE1E1E',coordinateY:80,isLine:true,maxValue:254,minValue:20}, // SPO2画血氧饱和度
      // {color:'#F1E881',coordinateY:80,isLine:true,maxValue:120,minValue:0},// RESP画呼吸频率
      // {color:'#11E1E8',coordinateY:80,isLine:true,maxValue:50,minValue:0} // TEMP画体温
  ]
  return (
    <div className="App">
      <TextEcg 
      data={ecg}
      option={option}
      />
    </div>
  );
}

export default App;
