import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'This Month (31.47)',
    uv: 31.47,
    pv: 2400,
    fill: '#6f5e08',
  },
  {
    name: 'This Year (26.69)',
    uv: 26.69,
    pv: 4567,
    fill: 'black',
  },
  {
    name: 'All (26.69)',
    uv: 15.69,
    pv: 1398,
    fill: '#3e9b57',
  },

];

const style = {
  // paddingTop: 200,
  top: 150,
  left: 10,
  transform: 'translate(0, -50%)',
  // lineHeight: '24px',,
};

export default class Example extends PureComponent {

  render() {
    return (
        <RadialBarChart width={200} height={120} cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={8} data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'outside', fill: 'white' }}
            // background
            clockWise
            dataKey="uv"
            width={'100%'}
            stroke='invisible'
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
    );
  }
}
