import {View, Text, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {FlatList} from 'react-native-bidirectional-infinite-scroll';

import {BACKEND_URL} from '@env';
import Colors from '../../theme/Colors';
import ArticleSmall from "../ArticleSmall/ArticleSmall"

function NewsFeed() {
    const [articles, setArticles] = useState([]);
    const [minShown, setMinShown] = useState(0);
    const [numShown, setNumShown] = useState(0);

    useEffect(() => {
        async function getArticles() {
            const res = await axios.get(BACKEND_URL + "/api/news/feed?limit=10");
            // console.warn(
            //     "res", res.data
            // );
            var tempArticle = []
            res.data.articles.map((item)=>{
              var article = {
                "title":item.title,
                "imageUrl": item.imageUrl,
                "summary": item.summary
              }
              tempArticle.push(article);
            })
            
            setArticles(tempArticle);
        }
        getArticles();
    }, []);
    return(
        <View style={styles.contentView}>
            <Text style={styles.questionTitle}>News</Text>
            <FlatList data={articles} inverted renderItem={ArticleSmall}/>
        </View>
    )
}
const styles = StyleSheet.create({
    contentView: {
      paddingVertical: 30,
      // paddingHorizontal: 30,
    },
    questionTitle: {
      fontWeight: '400',
      marginBottom: 3,
      fontSize: 20,
      color: 'white'
    },
});

export default NewsFeed;