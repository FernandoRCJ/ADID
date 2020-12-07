import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Content, H2, Text } from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";
import firestore from "@react-native-firebase/firestore";

export default function RequestingData({ route, navigation }) {
    [requestingUser, setRequestingUser] = useState({});
    const { request } = route.params;
    function updateRequestingUser() {
        setRequestingUser({});
        firestore()
            .collection("usuarios")
            .doc(request.idReceptor)
            .get()
            .then(doc => {
                setRequestingUser({
                    ...doc.data(),
                    id: doc.id,
                });
            }).catch((e) => console.log(e));
    }

    function handleAction(status) {
        console.log(status);
        firestore()
            .collection("solicitacoes")
            .doc(request.id)
            .update({
                situacao: status,
            })
            .then(() => {
                alert("Solicitação de contato aceita");
                navigation.goBack();
            }).catch((e) => console.log(e));
    }

    useEffect(() => { updateRequestingUser() }, []);

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
            alignItems: 'center',
            height: '100%',
            width: '100%',
            justifyContent: 'flex-end',
            alignSelf: 'center',
        }
    });

    return (
        <Content padder contentContainerStyle={{ height: '100%' }}>
            <Grid style={styles.grid}>
                <Row size={1} style={styles.title}>
                    <H2 style={styles.titleText}>
                        Dados do Solicitante
                        </H2>
                </Row>
                <Col size={8} style={styles.info}>
                    <Col style={styles.dataPiece}>
                        <Text style={styles.label}>Nome Completo:</Text>
                        <Text style={styles.data}>{requestingUser.nome}</Text>
                    </Col>
                    <Row>
                        <Col style={styles.dataPiece}>
                            <Text style={styles.label}>Estado:</Text>
                            <Text style={styles.data}>{requestingUser.uf}</Text>
                        </Col>
                        <Col style={styles.dataPiece}>
                            <Text style={styles.label}>Cidade:</Text>
                            <Text style={styles.data}>{requestingUser.cidade}</Text>
                        </Col>
                    </Row>
                    <Col style={styles.dataPiece}>
                        <Text style={styles.label}>Data de Nascimento:</Text>
                        <Text style={styles.data}>{requestingUser.dataNascimento}</Text>
                    </Col>
                    <Col style={styles.dataPiece}>
                        <Text style={styles.label}>Insumo Solicitado</Text>
                        <Text style={styles.data}>{request.nomeEnsumo}</Text>
                    </Col>
                    <Col size={2} style={styles.button}>
                        <Col>
                            <Button primary rounded title='login'
                                onPress={() => handleAction('contato')}>
                                <Text>Aceitar Solicitação</Text>
                            </Button>
                        </Col>
                        <Col style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Button block danger rounded title='login'
                                onPress={() => handleAction('recusada')}>
                                <Text>Recusar</Text>
                            </Button>
                        </Col>
                    </Col>
                </Col>
            </Grid>
        </Content>
    );
}
