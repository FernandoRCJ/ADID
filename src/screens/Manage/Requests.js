import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Body, Text, Button, Card, Content, Icon, Left, List, ListItem, Right, Fab } from "native-base";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Requests({ navigation }) {
    [requests, setRequests] = useState([]);

    const uid = auth().currentUser.uid;

    function updateRequests() {
        setRequests([]);
        firestore()
            .collection("solicitacoes")
            .where('idDoador', '==', uid)
            .where('situacao', '==', 'aberta')
            .get()
            .then(query => {
                setRequests(query.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    }
                }));
            }).catch((e) => console.log(e));
    }

    useEffect(() => {
        updateRequests()
    }, []);

    function handleOpen(request) {
        navigation.navigate('Aceitar Solicitação', { request });
    }

    const searchResults = requests.map(request => (
        <TouchableOpacity key={request.id} onPress={() => handleOpen(request)}>
            <Card style={{ backgroundColor: '#3ECA63' }} pointerEvents="none">
                <ListItem thumbnail>
                    <Left>
                        <Icon type="FontAwesome5" name="user-circle" style={{ fontSize: 18 }} />
                    </Left>
                    <Body>
                        <Text>{request.nomeReceptor}</Text>
                        <Text note style={{ color: '#254D79' }}>Solicitação de {request.nomeEnsumo}</Text>
                    </Body>
                    <Right style={{ alignItems: 'center' }}>
                        <Text note style={{ color: '#254D79' }}>Transações:</Text>
                        <Text note style={{ color: '#254D79' }}>3</Text>
                    </Right>
                </ListItem>
            </Card>
        </TouchableOpacity>
    ));

    return (
        <Content padder contentContainerStyle={{ height: '100%' }}>
            <List padder>
                {searchResults}
            </List>
            <Fab
                active={true}
                style={{ backgroundColor: "#254D79" }}
                position="bottomLeft"
                onPress={updateRequests}
            >
                <Icon type="Feather" name="refresh-cw" style={{ color: "#3ECA63" }} />
            </Fab>
        </Content>
    )
        ;
}