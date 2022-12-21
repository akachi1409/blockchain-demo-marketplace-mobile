import {View, Text, Image, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import Colors from '../../theme/Colors';
function ArticleSmall(item) {
    return(
        <View style={styles.articleView}>
            <Text style={styles.titleView}>{item.item.title}</Text>
            <View style={styles.contentView}>
                <Image
                    style={styles.articleImage}
                    source={{uri:item.item.imageUrl}}
                />
            </View>
            <View style={styles.contentView}>
                <Text>
                    {item.item.summary}
                </Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    articleView:{
        paddingBottom: 3,
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 3,
        color: 'white',
        backgroundColor: 'white'
    },
    titleView: {
        flex: 1,
        alignItems: 'center',
        color: 'black',
        fontSize: 20,
    },
    articleImage: {
        width: 300,
        height: 245,
        resizeMode: 'contain',
        borderRadius: 3,
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
    },
    contentView: {
        flex: 1,
        alignItems: 'center',
    }
})
export default ArticleSmall;