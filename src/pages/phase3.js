import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
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
            upColor = '#26a69a',
            downColor = '#ef5350'
		} = {},
	} = props;

	const chartContainerRef = useRef();
	let newSeries;
    let chart;
	let handleResize;

    const [resolution, setResolution] = useState("1");
    
    useEffect(()=>{
        socket.emit('phase3', {message: resolution});
    }, [resolution]);

    useEffect(()=>{
		socket.on('receive_data', (data)=>{
			newSeries.update(data);
		})
	},[socket]);

	useEffect(
		() => {
			handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			    chart = createChart(chartContainerRef.current, {
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

			newSeries = chart.addBarSeries({upColor: upColor, downColor: downColor });

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
            Phase III: OHLC
            </div>
            <div
                ref={chartContainerRef}
                className="w-4/5 h-full mt-10"
            />
			
			<div className='mt-2'>
                <label className='text-xl font-semibold'>
                    Choose resolution :&nbsp;
                    <select onChange= {(event)=>{
						setResolution(event.target.value);
					}}>
                        <option value="1">1 min</option>
                        <option value="5">5 min</option>
                        <option value="30">30 min</option>
                        <option value="60">60 min</option>
                    </select>
                </label>
			</div>

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
