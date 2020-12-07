import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Body, Card, Content, Icon, Left, List, ListItem, Right, Text } from "native-base";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default function requestReceptionHistory({ navigation }) {
    [requests, setRequests] = useState([]);
    const uid = auth().currentUser.uid;

    function updateRequests() {
        setRequests([])
        firestore()
            .collection("solicitacoes")
            .where('idReceptor', '==', uid)
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
                        <Text note style={{ color: '#254D79' }}>Doação de:</Text>
                        <Text style={{ color: '#254D79' }}>{request.nomeDoador}</Text>
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