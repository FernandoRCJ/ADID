import React, { useEffect, useReducer, useState } from 'react';

import { StyleSheet } from 'react-native';
import { Row, Col, Grid } from "react-native-easy-grid";
import { Text, Content, H2, H3, Button } from "native-base";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";


export default function RequestItem({ route, navigation }) {
    [myName, setMyName] = useState("abc");

    const uid = auth().currentUser.uid;
    const { doador, ensumo } = route.params;

    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }

    const dataEntrada = formatDate(doador.dataEntrada.toDate());

    const styles = StyleSheet.create({
        title: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#254D79',
            width: '100%',
            paddingTop: 9,
        },
        titleText: {
            fontWeight: "bold",
            color: "#3ECA63",
            borderBottomWidth: 2.5,
            borderColor: "#3ECA63",
        },
        grid: {
            borderWidth: 30,
            borderColor: "#254D79",
        },
        info: {
            backgroundColor: '#3ECA63',
            borderColor: "#254D79",
            padding: 20,

        },
        dataPiece: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        data: {
            fontSize: 21,
        },
        label: {
            color: "#254D79"
        },
        button: {
            alignItems: 'flex-end',
            justifyContent: 'center',
        }
    });


    function getMyName() {
        firestore()
            .collection("usuarios")
            .doc(uid)
            .get()
            .then((doc) => {
                setMyName(doc.data().nome);

            })
            .catch(console.error);;
    }

    useEffect(() => {
        getMyName();
    }, []);


    function handleRequest() {
        firestore()
            .collection("solicitacoes")
            .add({
                idDoador: doador.id,
                nomeDoador: doador.nome,
                idReceptor: uid,
                nomeReceptor: myName,
                idEnsumo: ensumo.id,
                nomeEnsumo: ensumo.nome,
                situacao: "aberta",
            })
            .then(() => {
                alert("Insumo Requisitado");
                navigation.goBack();
            })
            .catch(console.error);;
    }

    return (
        <Content padder contentContainerStyle={{ height: '100%' }}>
            <Grid style={styles.grid}>
                <Row size={1} style={styles.title}>
                    <H2 style={styles.titleText}>
                        Informações do Doador
                    </H2>
                </Row>
                <Col size={8} style={styles.info}>
                    <Col style={styles.dataPiece}>
                        <Text style={styles.label}>Nome Completo:</Text>
                        <Text style={styles.data}> {doador.nome}</Text>
                    </Col>
                    <Row>
                        <Col style={styles.dataPiece}>
                            <Text style={styles.label}>Estado:</Text>
                            <Text style={styles.data}>{doador.uf}</Text>
                        </Col>
                        <Col style={styles.dataPiece}>
                            <Text style={styles.label}>Cidade:</Text>
                            <Text style={styles.data}>{doador.cidade}</Text>
                        </Col>
                    </Row>
                    <Col style={styles.dataPiece}>
                        <Text style={styles.label}>Data de Nascimento:</Text>
                        <Text style={styles.data}>{doador.dataNascimento}</Text>
                    </Col>
                    <Row>
                        <Col style={styles.dataPiece}>
                            <Text style={styles.label}>No app des de:</Text>
                            <Text style={styles.data}>{dataEntrada}</Text>
                        </Col>
                        <Col style={styles.dataPiece}>
                            <Text style={styles.label}>Transações Realizadas:</Text>
                            <Text style={styles.data}>{doador.transacoes}</Text>
                        </Col>
                    </Row>
                    <Row size={1} style={styles.button}>
                        <Button primary rounded title='realizar pedido'
                            onPress={handleRequest}>
                            <Text>Fazer Solicitação</Text>
                        </Button>
                    </Row>
                </Col>
            </Grid>
        </Content>
    );
}