import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

import objectData from 'json/data1.json';



const ChartComponent = props => {
	const {data,
            colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				timeScale: {
					timeVisible: true,
					secondsVisible: true,
					fixRightEdge: true,
				  },
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addLineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (<>
        <main className="h-full m-auto flex flex-col items-center justify-around mt-10">
            <div className="text-2xl font-bold">
            Phase I: Lightweight charts (Single Instrument)
            </div>
            <div
                ref={chartContainerRef}
                className="w-4/5 h-full mt-10"
            />
        </main>
        </>
	);
};

function convertData(){
	const newData = objectData.map((data)=>{
    const dateArr = Math.floor(Date.parse(data[0])/1000);
		return {time:dateArr, value:data[1]/1000};
	})
	return newData;
}

export default function App() {
	const initialData = convertData();
    const props = {}
	return (
        <>
		<ChartComponent {...props} data={initialData}></ChartComponent>
        </>
	);
}
