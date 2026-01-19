import React from 'react';
import ReactECharts from 'echarts-for-react';

const TestGraph1 = () => {
  const rawData = [
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T23%3A45%3A00",
    "value": "29.77",
    "time": "2022-10-25T23:45:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T23%3A30%3A00",
    "value": "29.78",
    "time": "2022-10-25T23:30:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T23%3A15%3A00",
    "value": "29.78",
    "time": "2022-10-25T23:15:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T23%3A00%3A00",
    "value": "29.77",
    "time": "2022-10-25T23:00:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T22%3A45%3A00",
    "value": "29.8",
    "time": "2022-10-25T22:45:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T22%3A30%3A00",
    "value": "29.72",
    "time": "2022-10-25T22:30:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T22%3A15%3A00",
    "value": "29.79",
    "time": "2022-10-25T22:15:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T22%3A00%3A00",
    "value": "29.73",
    "time": "2022-10-25T22:00:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T21%3A45%3A00",
    "value": "29.77",
    "time": "2022-10-25T21:45:00"
  },
  {
    "subject": "http://example.com/observations/73617010/2022-10-25T21%3A30%3A00",
    "value": "29.77",
    "time": "2022-10-25T21:30:00"
  }
];

  // 1. Sort by time (ascending) and parse values
  const processedData = [...rawData]
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .map(item => ({
      time: item.time,
      value: parseFloat(item.value)
    }));

  // 2. Define ECharts options
  const options = {
    title: {
      text: 'Observation Values Over Time',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const data = params[0];
        return `${new Date(data.name).toLocaleTimeString()}<br/>Value: <b>${data.value}</b>`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: processedData.map(d => d.time),
      axisLabel: {
        formatter: (value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    },
    yAxis: {
      type: 'value',
      min: (value) => (value.min - 0.05).toFixed(2), // Dynamic scaling to see small variations
    },
    series: [
      {
        data: processedData.map(d => d.value),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#5470c6'
        },
        areaStyle: {
          color: 'rgba(84, 112, 198, 0.2)'
        }
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default TestGraph1;