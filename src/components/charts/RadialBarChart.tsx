import React, { PureComponent, useState } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { ColorPicker } from 'antd';


const style = {
  // paddingTop: 200,
  top: 150,
  left: 10,
  transform: 'translate(0, -50%)',
  // lineHeight: '24px',,
};

const Example = () => {
  const [colors, setColors] = useState({
    colorInner: "",
    colorMiddle: "",
    colorOuter: ""
  });

  const data = [
    {
      name: `This Month ${colors.colorInner}`,
      uv: 31.47,
      pv: 2400,
      fill: 'rgb(121, 111, 73)',
    },
    {
      name: `This Year ${colors.colorMiddle}`,
      uv: 26.69,
      pv: 4567,
      fill: `rgb(166, 139, 72)`,
    },
    {
      name: `All ${colors.colorOuter}`,
      uv: 15.69,
      pv: 1398,
      fill: 'rgb(186, 179, 134)',
    },
  ];

  const handleColorChange = (name, event) => {
    console.log('colorPicker event:', event.metaColor)
    const { r, g, b } = event.metaColor;
    const newColor = `rgb(${r}, ${g}, ${b})`
    console.log('setting new color:', newColor)
    if (event) {
      setColors({ ...colors, [name]: newColor })
    }
  }



  return (
    <div>
      <RadialBarChart width={200} height={120} cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={8} data={data}>
        <RadialBar
          // minAngle={15}
          label={{ position: 'outside', fill: 'white' }}
          // background
          // clockWise
          dataKey="uv"
          width={'100%'}
          stroke='invisible'
        />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
      {/* <div style={{ paddingTop: 100}}>
        <ColorPicker onChange={(e) => handleColorChange('colorInner', e)} />
        <ColorPicker onChange={(e) => handleColorChange('colorMiddle', e)} />
        <ColorPicker onChange={(e) => handleColorChange('colorOuter', e)} />
      </div> */}
    </div>
  );
}

export default Example;
