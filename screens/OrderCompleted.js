import {View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Lottieview from 'lottie-react-native'
import { colRef } from '../firebase'
import { limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import MenuItems from '../components/restaurantDetail/MenuItems'

export default function OrderCompleted() {
    const [lastOrder, setLastOrder] = useState({
        items: [
            {
                title: 'Bologna',
                description: 'Tasty',
                price: '$13.5',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-vJ5TKTMzcW9M7oXmYNYoAdvf2pwnp-JSKQ&usqp=CAU'
            }
        ]
    })
    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems)
    const total = items.map((item) => Number(item.price.replace('$', ''))).reduce((prev, curr) => prev + curr, 0)
    const totalUSD = total.toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
    })

    useEffect(() => {
        onSnapshot(query(colRef, orderBy('createdAt', 'desc'), limit(1)), (snapshot) => {
            snapshot.docs.map((doc) => setLastOrder(doc.data()))
        })
    }, [])

  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'white'
    }}>
        <View style={{
            margin: 15,
            alignItems: 'center',
            height: '100%'
        }}>
        <Lottieview style={{
            height: 100,
            alignSelf: 'center',
            marginBottom: 30
        }}
        source={require('../assets/animations/check-mark.json')}
        autoPlay
        speed={0.5}
        loop={false}
        />
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold'
      }}>Your order at {restaurantName} has been placed for {totalUSD}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      <MenuItems foods={lastOrder.items} hideCheckbox={true} marginLeft={10}/>
      <Lottieview style={{
            height: 200,
            alignSelf: 'center',
            marginBottom: 30
        }}
        source={require('../assets/animations/cooking.json')}
        autoPlay
        speed={0.5}
        loop={false}
        />
        </ScrollView>
        </View>
    </SafeAreaView>
  )
}