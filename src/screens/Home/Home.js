import {View, Text, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
// import Toast from 'react-native-toast-message';


import NewsFeed from "../../components/NewsFeed/NewsFeed"
import Footer from '../../components/Footer';
import TopNavBar from '../../components/TopNavBar';
import Colors from '../../theme/Colors';
import * as Storage from '../../services/Storage';
import {BACKEND_URL} from '@env';

function Home(props) {
  const [allocations, setAllocations] = useState([]);
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState('');
  useEffect(() => {
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
    getBalance();
  }, []);
  // useEffect(() => {
  //   async function getAllocations() {
  //     const token = await Storage.TOKEN.get();
  //     const authHeader = {Authorization: 'JWT ' + token};
  //     const res = await axios.get(BACKEND_URL + '/user/assets', {
  //       headers: authHeader,
  //     });
  //     const data = res.data.assetsPrice;
  //     const assets = res.data.assets;
  //     const isEmpty = Object.keys(data).length === 0;
  //     const assetSum = Object.values(data).reduce(
  //       (sum, current) => sum + current,
  //       0,
  //     );
  //     setPrice(assetSum);
  //     const formattedData = Object.keys(data).reduce(
  //       (result, current, index) => {
  //         const entry = {};
  //         entry.name = current;
  //         entry.value = parseFloat(Object.values(data)[index]);
  //         // entry.value = parseFloat((Object.values(data)[index] / assetSum).toFixed(2));
  //         result.push(entry);
  //         return result;
  //       },
  //       [],
  //     );
  //     const symbols = Object.keys(data);
  //     var tempData = [];
  //     for (var i = 0; i < symbols.length; i++) {
  //       const url =
  //         BACKEND_URL + '/api/crypto/graph/' + symbols[i] + '?interval=30';
  //       const resAxios = await getAxios(url);
  //       console.log('===', resAxios);
  //       resAxios.data.graphData.values.map((item, index) => {
  //         if (i === 0) {
  //           var tempArray = {
  //             timestamp: item.timestamp,
  //             // open: item.open * assets[symbols[i]],
  //             close: parseInt(item.close) * assets[symbols[i]],
  //             price: assetSum,
  //           };
  //           tempData.push(tempArray);
  //         } else {
  //           var temp = tempData[index];
  //           tempData[index] = {
  //             timestamp: item.timestamp,
  //             // open: temp.open+ item.open * assets[symbols[i]],
  //             close: temp.close + parseInt(item.close) * assets[symbols[i]],
  //             price: assetSum,
  //           };
  //         }
  //       });
  //       setLastPrice(tempData[tempData.length - 1].close);
  //       setRate(
  //         ((tempData[tempData.length - 1].close / assetSum) * 100).toFixed(2),
  //       );
  //       setChartData(tempData);
  //       setMinTick(getDataMin(tempData));
  //       setMaxTick(getDataMax(tempData));
  //       console.log(tempData);
  //     }
  //   }
  //   getAllocations();
  // });
  return (
    <View style={{flex: 1}}>
      <TopNavBar title="Home" balance={balance} />
      <View style={styles.container}>
        <View style={styles.contentView}>
          <Text style={styles.questionTitle}>Total Invested: ${price}</Text>
          <NewsFeed/>
        </View>
        <View style={styles.contentView}>
          
        </View>
      </View>
      <Footer/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentView: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  questionTitle: {
    fontWeight: '400',
    marginBottom: 3,
    fontSize: 20,
    color: 'black'
  },
  navigateButton: {
    // marginTop: 25,
    // width: '95%',
  },
});
export default Home;
