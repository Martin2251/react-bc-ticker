import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { Wrapper } from "./styles/App.styles";

type BitcoinData = {
  "15m": number;
  buy:number;
  last:number;
  sell:number;
  symbol:string;
}

type Currencies = {
  [key: string] : BitcoinData
}

const getBCData = async ():Promise <Currencies> => 
await(await fetch('https://blockchain.info/ticker')).json();



const INTERVAL_TIME = 30000; // 30 SECONDS

const App =() => {
  const [currency, setCurrency] = useState('USD');
  const {data, isLoading, error, refetch} = useQuery<Currencies>('bc-data', getBCData)


  const handleCurrencySelection = (e:any) => {
    setCurrency(e.target.value)
  }

  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME);
    return () => clearInterval(interval)
  }, [refetch])



  if(isLoading) return<div>...Is Loading</div>
  if(error) return<div>something went wronf</div>
  return (
  <Wrapper>
    <>
    <h2>Bitcoin Price</h2>
    <select value={currency} onChange={handleCurrencySelection}>
{data && Object.keys(data).map(currency => (
  <option key={currency} value={currency}>
    {currency}
  </option>
))}

    </select>
    <div>
      <h2>
        {data && data[currency].symbol}
        {data && data[currency].last}
      </h2>
    </div>
    </>
    </Wrapper>


  );
}

export default App;
