import React from "react";
import { useEffect , useRef, useState} from 'react'

import { CandlestickSeries, createChart  } from 'lightweight-charts';
import axios from 'axios';
import SignIn from "./signinn";

export function Trade() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [price , setPrice] = useState()
  const [buyPrice , setBuyPrice] = useState()
  const [qty , setQty ] = useState<number>(0.01)
  const [leverage , setLeverage] = useState<number>(1)
  const [balance ,setBalance ] = useState<number>()
  const [openOrders , setOpenOrders] = useState<any[]>([])
  useEffect(()=> {
     const token = localStorage.getItem('token')
     axios.get("http://localhost:3000/balance" , { 
        headers : { 
            'authorization' : token
        }
     }).then((res)=> { 
        const data = res.data; 
        setBalance(data.balance)
     })
     async function  openOrder() {
        const token = localStorage.getItem('token')
        await axios.get("http://localhost:3000/order/open" , { 
        headers : { 
            'authorization' : token
        }
     }).then((res)=> { 
        const data = res.data['open orders']; 
        setOpenOrders(data)
     })
    }
    openOrder()
   })
  useEffect(()=> {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen= () => { 
      console.log("connected to ws"); 
    }
    ws.onmessage =  ((data)=>{ 
      const hehe = JSON.parse(data.data)
    //   console.log(JSON.stringify(hehe.priceBTC))
      // const message = JSON.parse(price.data);
      setPrice(hehe.priceBTC)
      setBuyPrice(hehe.buyPriceBTC)
    })
   },[])
  useEffect(()=> {
    
    //@ts-ignore
    
    const chart = createChart(chartRef.current , { 
      width : 800 ,
      height : 500 , 
      layout : { 
        // background : { color :'#000000' }, 
        // textColor : '#d1d4dc' , 
      }, 
      timeScale: { 
        timeVisible: true, 
        secondsVisible : true 
      },
    });
    chart.applyOptions({
      timeScale: {
      timeVisible: true,
      secondsVisible: true,
      tickMarkFormatter: (time :any,) => {
        // `time` is UNIX seconds
        const date = new Date(time * 1000);
        return date.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",   // 👈 force IST
          hour: "2-digit",
          minute: "2-digit",
          });
        },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries ,{
    upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
    wickUpColor: '#26a69a', wickDownColor: '#ef5350',
} )

    const fetchData  = async () => { 
      const {data} = await axios.get("http://localhost:3000/candles/1m"); 
       const formattedData = data.map((candle: any) => ({
          time: Math.floor(new Date(candle.bucket).getTime() / 1000), // UNIX seconds
          open: Number(candle.open),
          high: Number(candle.high),
          low: Number(candle.low),
          close: Number(candle.close),
        }))
        .sort((a:any,b:any)=>a.time - b.time);
        // lightweight-charts wants data sorted by time ASCq
        candleSeries.setData(formattedData);
    }
    fetchData(); 
    //  candleSeries.setData([
    //   { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    //   { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
    //   { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    //   { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
    //   { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
    //   { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
    //   { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
    //   { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
    //   { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
    //   { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    // ]);
    
    return () => chart.remove();

  } , [])
  async function buyOrder(){ 
    console.log("reached till here")
    const token = localStorage.getItem('token')
    if(!token){ 
        alert ("sign in firsst ")
        return
    }
    if(leverage == 1) { 
        console.log(" here too"); 
        await axios.post("http://localhost:3000/order/open" ,  { 
            qty : 0.01 , 
            asset : "btc" , 
            type : "buy" , 
            leverage : false , 
            l : 1
        } , { 
        headers : { 
            'authorization' : token
        }, 

        }  
    ).then((res)=> { 
        const data = res.data; 
        console.log(data)
    })}
    else if(leverage > 1) { 
        await axios.post("http://localhost:3000/order/open" ,  { 
            qty : qty , 
            asset : "BTC" , 
            type : "buy" , 
            leverage : true , 
            l : leverage
        } , { 
        headers : { 
            'authorization' : token
        }, 

        }  
    )}
    }
    async function sellOrder() { 
        const token = localStorage.getItem('token'); 
        if(!token){ 
            alert("sign in/up first");
            return
        }
        if(leverage == 1) { 

            await axios.post("http://localhost:3000/trade/sell" ,  { 
            qty : 0.01 , 
            asset : "btc" , 
            type : "buy" , 
            leverage : false , 
            l : 1
        } , { 
        headers : { 
            'authorization' : token
        }, 

        }  
    ).then((res)=> { 
        const data = res.data; 
        console.log(data)
    })}
    else if(leverage > 1) { 
        await axios.post("http://localhost:3000/trade/sell" ,  { 
            qty : qty , 
            asset : "BTC" , 
            type : "buy" , 
            leverage : true , 
            l : leverage
        } , { 
        headers : { 
            'authorization' : token
        }, 

        }  
    )}
        
    }
  
async function closeTheOrder(orderId : any , tradetype :any , quantity : any , leverage : any , buyPrice :any , l:any){ 
    const token = localStorage.getItem('token') ; 
    console.log( orderId , quantity , leverage , buyPrice)
    if(tradetype=='buy'){ 
        console.log("reached til; here")
        await axios.post("http://localhost:3000/order/open" , { 
            orderId : orderId , 
            asset : "btc" , 
            type : "sell" , 
            qty : quantity , 
            leverage : leverage, 
            buyPrice : buyPrice,
            l : l
            
        } , {headers :{ 
            'authorization' : token
        }}).then((res)=>  {
            const data = res.data;
            console.log(data)
        }
        )
    }
    else if(tradetype == 'sell'){ 
        await axios.post("http://localhost:3000/trade/sell" , { 
            orderId : orderId , 
            asset : "btc" , 
            type : "sell" , 
            qty : quantity , 
            leverage : leverage, 
            buyPrice : buyPrice,
            l : l
            
        } , {headers :{ 
            'authorization' : token
        }}).then((res)=>  {
            const data = res.data;
            console.log(data)
        }
        )
    }
}
    
  return (
    <>
    <div className="w-screen h-screen bg-slate-950">
            <header className="w-full flex justify-between px-10">
                <h1 className="h1 flex text-4xl w-4/5 font-bold text-white items-start p-5 bg-slate-950">EXNESS</h1>
                <div className="flex flex-col justify-center items-center p-2  m-2">
                    <h3 className="text-white">balance</h3>
                    <p className="text-white text-2xl  font-extrabold">{balance?.toFixed(2)}</p>
                </div>
                <button className="text-white text-xl font-bold rounded-xl my-4 bg-indigo-400 px-8 mx-2"> user </button>
                <button className=" text-amber-50 bg-amber-100 px-12 rounded-xl my-4 mx-2 bg-indigo-400">Add $$$$</button>
            </header>
            <div className="w-full flex  ">
                <div className="bg- flex flex-col w-1/4 items-center justify-start  mr-2 p-5 border-2 border-amber-200 rounded-xl">
                  <div className="flex justify-between w-full text-white font-bold">
                    <h3 className="text-xl m-2  w-1/3"> SYMBOL</h3>
                    <h3 className="text-xl m-2"> BID</h3>
                    <h3 className="text-xl m-2"> ASK</h3>
                  </div>
                  <div className="flex justify-between w-full text-white font-bold">
                    <h3 className="text-xl m-2  w-1/3"> BTC</h3>
                    <h3 className="m-2"> {price}</h3>
                    <h3 className="m-2"> {buyPrice}</h3>
                  </div>

                </div>
                <div className=" bg-amber-500 flex items-start justify-end overflow-hidden rounded-xl">
                    <div id='container' ref = {chartRef} className=' bg-amber-400 '></div>
                </div>
                <div className="w-1/5 ml-4 m-2 border-2 border-amber-200 rounded-xl" >
                    <div className="flex items-center ">
                        <button onClick={sellOrder} className="text-white py-5 px-8 border-2 border-red-800 rounded-xl m-1.5 flex flex-col">SELL
                            <br />
                            {(Number(price)).toFixed(2)}

                        </button>
                        <button onClick={buyOrder} className="text-white py-5 px-8 border-2 border-indigo-500 rounded-xl m-1.5 flex flex-col">BUY
                            <br />
                            {(Number(buyPrice)).toFixed(2)}
                        </button>                
                    </div>
                    <div className="flex flex-col ">
                        <p className="text-2xl text-white font-bold p-1 m-2">Volume</p>
                        <input  className='py-2 px-6 m-2 border-2 rounded-xl text-white  border-zinc-700' value={qty} onChange={(e)=> {setQty(Number(e.target.value))}} type="number" placeholder='qty'/>
                    </div> 
                    <div className="flex flex-col ">
                        <p className="text-2xl text-white font-bold p-1 m-2">Leverage</p>
                        <input  className='py-2 px-6 m-2 border-2 rounded-xl text-white  border-zinc-700' value={leverage} onChange={(e)=>{setLeverage(Number(e.target.value))}} type="number" placeholder='leverage' />
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h2 className=" p-2 m-2 font-bold text-white "> ASSET TPYE QUANTITY OPENPRICE CURRENTPRICE  PROFIT/LOSS </h2>
                <ul className="text-white text-md">
                    
                    {openOrders.map(d=>(<li key={d.orderId} className="p-2 m-2 font-bold text-large">btc {d.tradeType} {d.quantity} {(Number(d.buyPrice/d.quantity)).toFixed(2)} {(Number(price)).toFixed(2)} {d.tradeType =='buy' ?  (d.l > 1  ? (Number((price*d.quantity*d.l)-(d.buyPrice*d.l))).toFixed(2) :((Number((price*d.quantity)-d.buyPrice)).toFixed(2))) :( d.l > 1  ? (Number((d.buyPrice*d.l)-(buyPrice*d.quantity*d.l))).toFixed(2) :((Number(d.buyPrice -(buyPrice*d.quantity))).toFixed(2)))} <button onClick={()=>closeTheOrder(d.orderId , d.tradeType , d.quantity , d.leverage  , d.buyPrice , d.l)}>close order</button> </li>))}
                </ul>
            </div>
                
                
            {/* <div> 
                sell price : {price}
                <br></br>
                buy Price : {buyPrice}
                <br />
                <br />

                volume
                <input  className='p-2 m-2' value={qty} onChange={(e)=> {setQty(Number(e.target.value))}} type="number" placeholder='qty'/>
                leverage
                <input  className='p-2 m-2' value={leverage} onChange={(e)=>{setLeverage(Number(e.target.value))}} type="number" placeholder='leverage' />
                <button onClick={buyOrder} className='p-2 m-2' >Buy</button>
                <button onClick={sellOrder} className='p-2 m-2' >sell</button>
                <div>
                    <h1 className=' text-7xl font-bold'>
                    Balance  : {(balance)?.toFixed(2)}
                    </h1>
                </div>
            </div> */}

                {/* <div>
                    <h2 className=" p-2 m-2 font-bold "> ASSET TPYE QUANTITY OPENPRICE CURRENTPRICE  PROFIT/LOSS </h2>
                    <ul>               
                        
                        {openOrders.map(d=>(<li key={d.orderId} className="p-2 m-2 font-bold text-large">btc {d.tradeType} {d.quantity} {(Number(d.buyPrice/d.quantity)).toFixed(2)} {(Number(price)).toFixed(2)} {d.tradeType =='buy' ?  (d.l > 1  ? (Number((price*d.quantity*d.l)-(d.buyPrice*d.l))).toFixed(2) :((Number((price*d.quantity)-d.buyPrice)).toFixed(2))) :( d.l > 1  ? (Number((d.buyPrice*d.l)-(buyPrice*d.quantity*d.l))).toFixed(2) :((Number(d.buyPrice -(buyPrice*d.quantity))).toFixed(2)))} <button onClick={()=>closeTheOrder(d.orderId , d.tradeType , d.quantity , d.leverage  , d.buyPrice , d.l)}>close order</button> </li>))}
                    
                    </ul>              
                    
                </div> */}
      </div>
    </>
  )
}

export default Trade