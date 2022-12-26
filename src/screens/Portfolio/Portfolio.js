import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import { Table, Row } from 'react-native-table-component';
import Snackbar from 'react-native-snackbar';
import { LineChart } from "react-native-chart-kit"
import axios from 'axios';

import TopNavBar from '../../components/TopNavBar';
import Colors from '../../theme/Colors';
import Footer from "../../components/Footer"
import * as Storage from '../../services/Storage';
import {BACKEND_URL} from '@env';

function Portfolio (){
    const INTERVAL_OPTIONS = [10];
    let [ data, setData ] = useState({})
    const [balance, setBalance] = useState(0);
    const [width, setWidth] = useState([80, 80, 80, 80, 120])
    const [tableHead, setTableHead] = useState(['Asset', 'Quantity', 'Market Price', 'Total Value', 'Profit/Loss'])
    const [cryptos, setCryptos] = useState([]);
    const [assets, setAssets] = useState({});
    const [assetsPrice, setAssetsPrice] = useState({})
    const [interval, setInterval] = useState(INTERVAL_OPTIONS[0]);
    const [symbol, setSymbol] = useState('');
    const [symbols, setSymbols] = useState([]);
    const [linedata, setLinedata] = useState([])
    useEffect(()=>{
        async function getBalance(){
            const token = await Storage.TOKEN.get();
            const authHeader = {Authorization: 'JWT ' + token};
            const res = await axios.get(BACKEND_URL + '/user/balance', {
                headers: authHeader,
            });
            const data = res.data;
            setBalance(data.balance);
        }
        async function getAssets() {
            const token = await Storage.TOKEN.get();
            const authHeader = {Authorization: 'JWT ' + token};
            const res = await axios.get(BACKEND_URL + '/user/assets', {
                headers: authHeader,
            });
            console.log("assets", res.data.assets)
            setAssets(res.data.assets);
            setAssetsPrice(res.data.assetsPrice)
        }
        getBalance();
        getAssets();
    },[])
    useEffect(() => {
        async function getCryptos() {
            try{
                const resCrypto = await axios.get(BACKEND_URL + '/api/crypto/explore?limit=30')
                const dataCrypto = resCrypto.data.cryptos;
                const tempData = []
                dataCrypto.map((item, index) =>{
                    if (assets[item.symbol]>0){
                        var price = item.price.toString().split(".")[0] +"." + item.price.toString().split(".")[1].substring(0,2)
                        // console.log("price", price, assetsPrice[item.symbol],item.price, item.symbol);
                        var percent =  ((
                            (
                                parseFloat(assetsPrice[item.symbol]) - parseFloat(item.price)* parseFloat(assets[item.symbol])
                            ))
                            /parseFloat(price* assets[item.symbol])*100).toString()
                        console.log("percent", percent)
                        var volumnP;
                        if (percent === 0){
                            volumnP = "0%";
                        }
                        else{
                            volumnP= percent.split(".")[0] + "." + percent.split(".")[1].substring(0, 2)+ "%"
                        }
                        const temp = [
                            item.symbol,
                            assets[item.symbol],
                            price,
                            price* assets[item.symbol],
                            percent.split(".")[0] + "." + percent.split(".")[1].substring(0, 2)+ "%"
                        ]
                        tempData.push(temp)
                    }
                })
                console.log("tempData", tempData)
                setCryptos(tempData);
            } catch (err) {
                Snackbar.show({
                    text: "Error fetching cryptos" + err,
                    duration: Snackbar.LENGTH_SHORT,
                })
            }
        }
        getCryptos();
    }, [assetsPrice]);

    useEffect(() => {
        setSymbols(Object.keys(assets));
    }, [assets]);
    
    useEffect(() => {
        setSymbol(symbols[0]);
    }, [symbols]);

    useEffect(() => {
        if (!symbol | !interval) {
          return;
        }
        async function getData() {
          try {
            const res = await axios.get(BACKEND_URL +"/api/crypto/graph/" +symbol + "?interval=" + interval);
            const data = res.data.graphData.values;
            const labels=[]
            const reduceData = []
            data.map((item)=>{
                labels.push(item.timestamp)
                reduceData.push(item.open)
            })
            // console.log(labels, reduceData);
            setData(
                {
                    labels: labels,
                    datasets:[{
                        data: reduceData
                    }]
                }
          );
            // setMinTick(data.min);
            // setMaxTick(data.max);
          } catch (err) {
            console.log('Error fetching ticker data');
            console.log(err);
          }
        }
        getData();
    }, [symbol, interval]);
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavBar title="Portfolio"  balance={balance} />
            <View style={styles.container}>
                <View style={styles.contentView}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row data = {tableHead}style={styles.headStyle}/>
                    </Table>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        {cryptos?
                        cryptos.map((rowData, index)=>(
                            <Row key={index} data={rowData} style={styles.bodyStyle} />
                        )
                        ): (<></>)
                    }
                    </Table>
                    {/* {Object.keys(data).length !== 0?
                    (
                        <LineChart
                            data={data}
                            width={Dimensions.get("window").width*0.9} // from react-native
                            height={220}
                            yAxisLabel="$"
                            yAxisInterval={0.1} // optional, defaults to 1
                            chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                            }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
                    ):(<></>)}
                     */}
                </View>
            </View>
            <Footer />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    contentView: {
        paddingTop: 30,
        paddingHorizontal: 30,
      },
    headStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: 'white',
        textAlign: 'center'
    },
    bodyStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: 'white',
        textAlign: 'center'
    }
})
export default Portfolio