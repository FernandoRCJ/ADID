import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Body, Card, Content, Icon, Left, List, ListItem, Right, H3 } from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";
import firestore from "@react-native-firebase/firestore";

export default function GetItem({ navigation }) {
    const [itens, setItens] = useState([]);
    useEffect(() => {
        updateEnsumos();
    });

    function updateEnsumos() {
        firestore()
            .collection("ensumos")
            .where('empty', '==', false)
            .get()
            .then(query => {
                setItens(query.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    }
                }));
            }).catch((e) => console.log(e));
    }

    function handleSelect(ensumo) {
        navigation.navigate("Selecionar Doador", { ensumo })
    }

    const searchResults = itens.map(arr => (
        <TouchableOpacity key={arr.id} onPress={() => handleSelect(arr)}>
            <Card style={{ backgroundColor: '#3ECA63' }} pointerEvents="none">
                <ListItem thumbnail>
                    <Left>
                        <Icon type="FontAwesome5" name="pills" style={{ fontSize: 18 }} />
                    </Left>
                    <Body>
                        <Text>{arr.nome}</Text>
                        <Text note>{arr.tipo}</Text>
                    </Body>
                </ListItem>
            </Card>
        </TouchableOpacity>
    ));

    return (
        <Content padder>
            <List marginTop={20}>
                <View style={{ padding: 5 }}>
                    <H3 style={{
                        color: "#3ECA63",
                        fontWeight: "600",
                        backgroundColor: "#254D79",
                        padding: 5,
                        borderRadius: 15,
                        textAlign: "center",
                    }}>
                        Insumos Disponiveis
                    </H3>
                </View>
                {searchResults}
            </List>
        </Content>
    );
}