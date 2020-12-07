import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Body, Card, Content, Icon, Left, List, ListItem, Right, Text } from "native-base";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default function requestDonationHistory({ navigation }) {
    [requests, setRequests] = useState([]);
    const uid = auth().currentUser.uid;

    function updateRequests() {
        setRequests([])
        firestore()
            .collection("solicitacoes")
            .where('idDoador', '==', uid)
            .where('situacao', '==', 'concluida')
            .get() 
            .then(query => {
                setRequests(query.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    }
                }));
            })
            .catch((e) => console.log(e));
    }

    useEffect(() => { updateRequests() }, []);

    const searchResults = requests.map(request => (
        <TouchableOpacity key={request.id}>
            <Card style={{ backgroundColor: '#3ECA63' }} pointerEvents="none">
                <ListItem thumbnail>
                    <Left>
                        <Icon type="FontAwesome5" name="user-circle" style={{ fontSize: 18 }} />
                    </Left>
                    <Body>
                        <Text note style={{ color: '#254D79' }}>Doação para:</Text>
                        <Text style={{ color: '#254D79' }}>{request.nomeReceptor}</Text>
                        <Text note style={{ color: '#254D79' }}>Ensumo:</Text>
                        <Text style={{ color: '#254D79' }}>{request.nomeEnsumo}</Text>
                    </Body>
                    <Right style={{ alignItems: 'center' }}>

                    </Right>
                </ListItem>
            </Card>
        </TouchableOpacity>
    ));

    return (
        <Content padder>
            <List padder>
                {searchResults}
            </List>
        </Content>
    )
        ;
}