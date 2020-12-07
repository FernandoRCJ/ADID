import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Content, List, ListItem, Text, Left, Body, Right, Card, Icon, H3 } from 'native-base';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function SearchItem({ route, navigation }) {
    const { ensumo } = route.params;
    const [doadores, setDoadores] = useState([]);

    const uid = auth().currentUser.uid;

    useEffect(() => {
        usdateDoadores();
    }, [route]);

    function usdateDoadores() {
        setDoadores([]);
        firestore()
            .collection("usuarios")
            .where('ensumos', 'array-contains', ensumo.id)
            .get()
            .then(query => {
                setDoadores(query.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    }
                }));
            }).catch((e) => console.log(e));
    }

    const handleOpen = (doador) => {
        navigation.navigate('Realizar Pedido', { doador, ensumo });
    }

    const listDoadores = doadores.map(arr => (
        <TouchableOpacity key={arr.id} onPress={() => handleOpen(arr)}>
            <Card style={{ backgroundColor: '#3ECA63' }} pointerEvents="none" >
                <ListItem thumbnail>
                    <Left>
                        <Icon type="FontAwesome5" name="user-circle" style={{ fontSize: 18 }} />
                    </Left>
                    <Body>
                        <Text>{arr.nome}</Text>
                        <Text note style={{ color: '#254D79' }}>{arr.cidade}, {arr.estado}</Text>
                    </Body>
                    <Right style={{ alignItems: 'center' }}>
                        <Text note style={{ color: '#254D79' }}>Transações:</Text>
                        <Text note style={{ color: '#254D79' }}>{arr.transacoes}</Text>
                    </Right>
                </ListItem>
            </Card>
        </TouchableOpacity>
    ));

    return (
        <Content padder>
            <View style={{ padding: 5 }}>
                <H3 style={{
                    color: "#3ECA63",
                    fontWeight: "600",
                    backgroundColor: "#254D79",
                    padding: 5,
                    borderRadius: 15,
                    textAlign: "center",
                }}>
                    Selecione o doador desejado
                    </H3>
            </View>
            <View>
                <List>
                    {listDoadores}
                </List>
            </View>
        </Content>
    )
        ;
}
