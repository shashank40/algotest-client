import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3001');


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
	let newSeries;

    useEffect(()=>{

		socket.emit('phase2', {message: "phase2"});

		socket.on('receive_data', (data)=>{
			console.log(data);
			newSeries.update(data);
		})
	},[socket]);

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

			newSeries = chart.addLineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });

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
            Phase II: Live Price (Websockets)
            </div>
            <div
                ref={chartContainerRef}
                className="w-4/5 h-full mt-10"
            />
        </main>
        </>
	);
};
export default function App() {
    const props = {}
	const initialData = {}
	return (
        <>
		<ChartComponent {...props} data={initialData}></ChartComponent>
        </>
	);
}
