import {View, Text, Image, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';

import TopNavBar from '../../components/TopNavBar';
import Colors from '../../theme/Colors';
import Footer from "../../components/Footer"
import * as Storage from '../../services/Storage';
import {BACKEND_URL, COIN_PLACEHOLDER, COIN_LOGO} from '@env';

function Crypto({props, route}) {
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState('');
  const [coinLogo, setCoinLogo] = useState(COIN_PLACEHOLDER);
  const [symbol, setSymbol] = useState(route.params?.coin);
  const [coinInfo, setCoinInfo] = useState('');
  const [coinData, setCoinData] = useState({
    slug: '',
    symbol: '',
    circulating_supply: 0,
    quote: {
      USD: {price: 0, percent_change_24h: 0, volume_24h: 0, market_cap: 0},
    },
  });

  useEffect(() => {
    async function getCoinData() {
      try {
        const token = await Storage.TOKEN.get();
        const authHeader = {Authorization: 'JWT ' + token};
        const res = await axios.get(
          BACKEND_URL + '/api/crypto/data/' + symbol,
          {
            headers: authHeader,
          },
        );
        const data = res.data.cryptoData;
        console.log('data', data);
        setCoinData(data);
      } catch (err) {
        // navigate('/notfound');
      }
    }
    async function getBalance() {
      const token = await Storage.TOKEN.get();
      const authHeader = {Authorization: 'JWT ' + token};
      setToken(token);
      const res = await axios.get(BACKEND_URL + '/user/balance', {
        headers: authHeader,
      });
      const data = res.data;
      setBalance(data.balance);
    }
    getCoinData();
    getBalance();
  }, []);

  useEffect(() => {
    if (coinData.id) {
      const logoURL = COIN_LOGO + '/' + coinData.id + '.png';
      setCoinLogo(logoURL);
    }
  }, [coinData]);

  useEffect(() => {
    async function getCoinInfo() {
      try {
        const token = await Storage.TOKEN.get();
        const authHeader = {Authorization: 'JWT ' + token};
        const res = await axios.get(
          BACKEND_URL + '/api/crypto/info/' + symbol,
          {
            headers: authHeader,
          },
        );
        const data = res.data.cryptoInfo;
        // console.log("data", data);
        setCoinInfo(data.description);
      } catch (err) {
        console.log('Error fetching info');
        console.log(err);
      }
    }

    getCoinInfo();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopNavBar title="Analytics" balance={balance} />
      <View style={styles.container}>
        <View style={styles.contentView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.imageView}>
              <Image style={styles.coinImg} source={{uri: coinLogo}} />
            </View>
            <View style={styles.titleView}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={styles.title}>{coinData.name}</Text>
                <Text style={styles.symbol}>{coinData.symbol}</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={styles.text}>Price (USD)</Text>
                <Text style={styles.priceText}>
                  {coinData.quote.USD.price.toFixed(5)}
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={styles.text}>Change (1D)</Text>
                <Text style={styles.priceText}>
                  {(coinData.quote.USD.percent_change_24h / 100).toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15, display: 'flex', flexDirection: 'column'}}>
            <Text style={styles.marketTitle}>Market Stats</Text>
            
            <View style={{marginTop: 5}}>
                <Text style={styles.text}>
                    Trading Volume
                </Text>
                <Text style={styles.priceText}>
                    {coinData.quote.USD.volume_24h.toLocaleString('en-US')}
                </Text>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.text}>
                    Market Cap
                </Text>
                <Text style={styles.priceText}>
                    {coinData.quote.USD.market_cap.toLocaleString('en-US')}
                </Text>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.text}>
                    Circulating Supply
                </Text>
                <Text style={styles.priceText}>
                    {coinData.circulating_supply.toLocaleString('en-US')}
                </Text>
            </View>
            
            <Text style={styles.marketTitle}>More Info</Text>
            <Text style={styles.priceText}>{coinInfo}</Text>
          </View>
        </View>
      </View>
      <Footer/>
    </View>
  );
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
  imageView: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinImg: {
    width: 100,
    height: 100,
  },
  titleView: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    marginBottom: 3,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  symbol: {
    fontWeight: '400',
    marginBottom: 3,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    paddingRight: 10,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: '400',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    color: 'black',
  },
  priceText: {
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    paddingRight: 10,
  },
  marketTitle:{
    fontWeight: '600',
    marginBottom: 3,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  }
});
export default Crypto;
