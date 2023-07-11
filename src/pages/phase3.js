import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import {io} from 'socket.io-client';

const socket = io('https://algo-server-xk7g.onrender.com');


const ChartComponent = props => {
	const {_,
            colors: {
			backgroundColor = 'white',
			textColor = 'black',
            upColor = '#26a69a',
            downColor = '#ef5350'
		} = {},
	} = props;

	var chartContainerRef = useRef();
	var newSeries;
    var chart;
	var handleResize;
    const [resolution, setResolution] = useState("1");

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
					lockVisibleTimeRangeOnResize: true,
				  },
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			newSeries = chart.addCandlestickSeries({
				upColor: upColor, downColor: downColor, borderVisible: false,
				wickUpColor: upColor, wickDownColor: downColor,
			});
			window.addEventListener('resize', handleResize);
			socket.emit('phase3', {message: resolution});

			 return () => {
			 	window.removeEventListener('resize', handleResize);

				chart.remove();
			 };
		}, [resolution]
	);

	useEffect(()=>{
		socket.on('receive_data', ({newData, oldData, resolutionIncoming})=>{
			// if(resolutionIncoming==resolution){}
			console.log(resolutionIncoming)
			if(oldData.length>0)  newSeries.setData(oldData);
			newData!=null?newSeries.update(newData):console.log("No new data");
			 
		})
	},[resolution, socket]);

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
						chart.removeSeries(newSeries);
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
