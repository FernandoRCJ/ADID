import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Content, H2, Text } from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";
import firestore from "@react-native-firebase/firestore";

export default function ContactUserData({ route, navigation }) {
  [contact, setContact] = useState({});
  const { request, userId } = route.params;

  function updateContact() {
    setContact({});
    firestore()
      .collection("usuarios")
      .doc(userId)
      .get()
      .then(doc => {
        setContact({
          ...doc.data(),
          id: doc.id,
        });
      }).catch((e) => console.log(e));
  }

  function handleAction(status) {
    firestore()
      .collection("solicitacoes")
      .doc(request.id)
      .update({
        situacao: status,
      })
      .then(() => {
        alert(`Solicitação ${status}`);
        navigation.goBack();
      }).catch((e) => console.log(e));
  }

  useEffect(() => { updateContact() }, []);

  const styles = StyleSheet.create({
    title: {
      alignItems: "flex-start",
      justifyContent: "center",
      backgroundColor: "#254D79",
      width: "100%",
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
      backgroundColor: "#3ECA63",
      borderColor: "#254D79",
      padding: 20,
    },
    dataPiece: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    data: {
      fontSize: 21,
    },
    label: {
      color: "#254D79",
    },
    button: {
      alignItems: "center",
      width: "80%",
      alignSelf: "center",
    },
    buttonContainer: {
      justifyContent: "space-between",
    },
  });

  return (
    <Content padder contentContainerStyle={{ height: "100%" }}>
      <Grid style={styles.grid}>
        <Row size={1} style={styles.title}>
          <H2 style={styles.titleText}>Dados de Contato</H2>
        </Row>
        <Col size={8} style={styles.info}>
          <Col style={styles.dataPiece}>
            <Text style={styles.label}>Nome Completo:</Text>
            <Text style={styles.data}>{contact.nome}</Text>
          </Col>
          <Row>
            <Col style={styles.dataPiece}>
              <Text style={styles.label}>Estado:</Text>
              <Text style={styles.data}>{contact.uf}</Text>
            </Col>
            <Col style={styles.dataPiece}>
              <Text style={styles.label}>Cidade:</Text>
              <Text style={styles.data}>{contact.cidade}</Text>
            </Col>
          </Row>
          <Col style={styles.dataPiece}>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.data}>{contact.dataNascimento}</Text>
          </Col>
          <Col style={styles.dataPiece}>
            <Text style={styles.label}>Insumo Solicitado</Text>
            <Text style={styles.data}>request.nomeEnsumo</Text>
          </Col>
          <Col style={styles.dataPiece}>
            <Text style={styles.label}>N° Telefone</Text>
            <Text style={styles.data}>{contact.celular}</Text>
          </Col>
          <Col style={styles.dataPiece}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.data}>{contact.email}</Text>
          </Col>
          <Row style={styles.buttonContainer}>
            <Col style={styles.dataPiece}>
              <Button
                rounded
                block
                style={{ marginBottom: 10 }}
                primary
                title={"encerrar"}
                style={styles.button}
                onPress={() => handleAction('concluida')}
              >
                <Text>Concluir</Text>
              </Button>
            </Col>
            <Col style={styles.dataPiece}>
              <Button
                rounded
                block
                primary
                title={"cancelar"}
                style={styles.button}
                onPress={() => handleAction('cancelada')}
              >
                <Text>Cancelar</Text>
              </Button>
            </Col>
          </Row>
        </Col>
      </Grid>
    </Content>
  );
}
