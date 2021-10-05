import React, {useEffect, useLayoutEffect} from 'react'
import { FlatList, StyleSheet } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import CustomHeaderButton from '../components/HeaderButton'
import { loadPlaces } from '../store/places.actions';
import PlaceItem from '../components/PlaceItem';

const PlaceListScreen = ({navigation}) => {
    const  dispatch = useDispatch();
    const places = useSelector(state => state.places.places);
    
    //const list = useSelector(state => state.places.places)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                    title="Nueva"
                    iconName="md-add"
                    onPress ={()=> navigation.navigate('Nuevo')} 
                    />
                </HeaderButtons>
            )
        })
    }, [navigation])

    useEffect(() => {
        dispatch(loadPlaces());
    }, []);

    const renderItem = (data) => (
        <PlaceItem
            title={data.item.title}
            image={data.item.image}
            address={data.item.address}
            onSelect={() => navigation.navigate('Detalle')}
        />
    )

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
