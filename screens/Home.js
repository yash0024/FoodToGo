import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import RestaurantItems from '../components/home/RestaurantItems'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'

const YELP_API_KEY = 'vp-wDyF5X44G-HVxefOT5k9J709_KF7J_lXqNaC-oD6GAoiPc9hKTYXhaTIP1TSRueVhm0lxNtQ4mzbktSO4kNJsot_1YLIyuUCS1VWMFCklwunyVqZSofedHdzbYnYx'

export default function Home({ navigation }) {
    const [restaurantData, setRestaurantData] = useState([])
    const [city, setCity] = useState('Los Angeles')
    const [activeTab, setActiveTab] = useState('Delivery')

    const getRestaurantFromYelp = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`
    

    const apiOptions = {
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`
            }
        }

        return fetch(yelpUrl, apiOptions)
        .then(res => res.json())
        .then(json => setRestaurantData(json.businesses.filter(
            (business) => business.transactions.includes(activeTab.toLowerCase())
        )))
    } 

useEffect(() => {
    getRestaurantFromYelp()
}, [city, activeTab])

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
        <View style={{backgroundColor: 'white', padding: 15}}>
            <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <SearchBar cityHandler={setCity}/> 
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Categories />
            <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
        </ScrollView>
        <Divider width={1} />
        <BottomTabs />
    </SafeAreaView>
  )
}