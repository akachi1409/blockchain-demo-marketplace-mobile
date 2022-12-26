import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {FlatList} from 'react-native-bidirectional-infinite-scroll';

import TopNavBar from '../../components/TopNavBar';
import Footer from "../../components/Footer"
import Colors from '../../theme/Colors';
import ExploreCard from "../../components/ExploreCard/ExploreCard";
import * as Storage from '../../services/Storage';
import {BACKEND_URL} from '@env';

function Explore(props) {
    const [balance, setBalance] = useState(0);
    const [token, setToken] = useState('');
    const [selected, setSelected] = useState('')
    const [cryptos, setCryptos] = useState([]);
    const [symbols, setSymbols] = useState([])

    useEffect(() => {
        async function getBalance() {
            const token = await Storage.TOKEN.get();
            const authHeader = {Authorization: 'JWT ' + token};
            setToken(token);
            const res = await axios.get(BACKEND_URL + '/user/balance', {
                headers: authHeader,
            });
            const data = res.data;
            const resCrypto = await axios.get(BACKEND_URL + '/api/crypto/explore?limit=10', {
                headers: authHeader,
            });
            const dataCrypto = resCrypto.data.cryptos;
            // const tempSymbol = [];
            // dataCrypto.map((data) => {
            //     tempSymbol.push(data.symbol)
            // })
            setSelected(dataCrypto[0].symbol)
            // setSymbols(tempSymbol);
            setCryptos(dataCrypto);
            setBalance(data.balance);
        }
        getBalance();
    }, []);
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavBar title="Explore"  balance={balance} />
            <View style={styles.container}>
                <View style={styles.contentView}>
                    <Text style={styles.title}>Search Crypto</Text>
                    {/* <FormInput
                        type="dropdown"
                        label="Select Font:"
                        data={cryptos}
                        placeholder={""}
                        value={selected}
                        onChangeText={(text)=>{setSelected(text)}}
                    /> */}
                    <View style={styles.flatView}>
                        <FlatList 
                            data={cryptos} 
                            inverted 
                            renderItem = {(props)=><ExploreCard {...props}/>} 
                            />
                    </View>
                    
                </View>
            </View>
            <Footer/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    //   borderTopLeftRadius: 25,
    //   borderTopRightRadius: 25,
    },
    contentView: {
      paddingTop: 30,
      paddingHorizontal: 30,
    },
    title: {
      fontWeight: '400',
      marginBottom: 3,
      fontSize: 20,
      color: 'black',
      textAlign: 'center'
    },
    flatView:{
        borderColor: 'black',
        borderRadius: 3,
        borderWidth: 1,
        marginVertical: 20,
        height: '90%', 
        paddingVertical: 10
    }
  });
export default Explore;