import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Body, Card, Content, Icon, Left, List, ListItem, Right, H3 } from "native-base";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Col, Grid, Row } from "react-native-easy-grid";

export default function AddItem({ navigation }) {
    const [itens, setItens] = useState([]);
    const [ensumos, setEnsumos] = useState([]);
    const uid = auth().currentUser.uid;
    useEffect(() => {
        updateEnsumos();
    }, []);

    function updateEnsumos() {
        firestore()
            .collection("ensumos")
            .get()
            .then(query => {
                setItens(query.docs
                    .filter(doc => !(doc.data().usuarios.includes(uid)))
                    .map(doc => {
                        return {
                            ...doc.data(),
                            id: doc.id,
                        }
                    }));
            }).catch((e) => console.log(e));
    }

    function updateEnsumosCadastrados() {
        firestore()
            .collection("ensumos")
            .where('usuarios', 'array-contains', uid)
            .get()
            .then(query => {
                firestore()
                    .collection("usuarios")
                    .doc(uid)
                    .update({
                        ensumos: query.docs.map(doc => doc.id),
                    })
                    .then(() => {
                        alert("Insumo adicionado com sucesso!");
                    }).catch((e) => console.log(e));
            }).catch((e) => console.log(e));
    }

    function handleAdd(id, usuarios) {
        let userArray = [];
        if (usuarios !== undefined) {
            userArray = usuarios;
        }
        console.log(userArray);
        firestore()
            .collection("ensumos")
            .doc(id)
            .update({
                usuarios: [...userArray, uid],
                empty: false,
            })
            .then(() => {
                updateEnsumos();
                updateEnsumosCadastrados();
                navigation.goBack();
            }).catch((e) => console.log(e));
    }

    const searchResults = itens.map(arr => (
        <TouchableOpacity key={arr.id} onPress={() => handleAdd(arr.id, arr.usuarios)}>
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
                        Selecione um insumo para adicionar
                    </H3>
                </View>
                {searchResults}
            </List>
        </Content>
    );
}