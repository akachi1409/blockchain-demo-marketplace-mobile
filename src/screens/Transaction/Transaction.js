import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {useState, useEffect} from 'react';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import axios from 'axios';

import TopNavBar from '../../components/TopNavBar';
import Colors from '../../theme/Colors';
import Footer from "../../components/Footer"
import * as Storage from '../../services/Storage';
import {BACKEND_URL, COIN_PLACEHOLDER, COIN_LOGO} from '@env';

function Transaction (){
    let [ data, setData ] = useState([])
    let [ firstLoad, setFirstLoad] = useState(true)
    const [balance, setBalance] = useState(0);
    const [tableHead, setTableHead] = useState(['Date', 'Symbol', 'Quantity', 'Price', 'Action'])
    const [width, setWidth] = useState([120, 80, 80, 80, 80])
    useEffect(() => {
        async function getBalanceAndHistory() {
            const token = await Storage.TOKEN.get();
            const authHeader = {Authorization: 'JWT ' + token};
            const res = await axios.get(BACKEND_URL + '/user/balance', {
                headers: authHeader,
            });
            const data = res.data;
            const resHistory = await axios.get(BACKEND_URL + '/user/history', {
                headers: authHeader,
            })
            const dataHistory = resHistory.data.historys;
            const temp = []
            for ( var i = 0; i< dataHistory.length; i++){
                const date = dataHistory[i].date
                const price = dataHistory[i].price
                // console.log("dataHistory: " + [dataHistory[i].date, dataHistory[i].symbol, dataHistory[i].amount, dataHistory[i].price, dataHistory[i].action])
                temp.push(
                    [
                    date.substring(5,7)+ "/" + date.substring(8,10)+ "/" + date.substring(0, 4) + " " + date.substring(11, 19), 
                    dataHistory[i].symbol, 
                    dataHistory[i].amount, 
                    price.toString().split(".")[0]+"." + price.toString().split(".")[1].substring(0,2), 
                    dataHistory[i].action
                ])
            }
            setData(temp);
            setBalance(data.balance);
        }
        getBalanceAndHistory();
    }, []);
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavBar title="Explore"  balance={balance} />
            <View style={styles.container}>
                <View style={styles.contentView}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row data = {tableHead} widthArr={width} style={styles.headStyle}/>
                    </Table>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        {data?
                        data.map((rowData, index)=>(
                            <Row key={index} data={rowData} widthArr={width} style={styles.bodyStyle} />
                        )
                        ): (<></>)
                    }
                    </Table>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.pageColor,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    contentView: {
        paddingTop: 30,
        paddingHorizontal: 30,
      },
    headStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#808B97',
        textAlign: 'center'
    },
    bodyStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#FFF1C1',
        textAlign: 'center'
    }
})
export default Transaction;