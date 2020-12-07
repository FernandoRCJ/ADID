import React from "react";
import { View, StyleSheet } from "react-native";
import { Content, H2, Icon, Text } from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";

export default function PastUserData({ route, navigation }) {
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

  useEffect(() => { updateRequestingUser() }, []);
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
    rate: {
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <Content padder contentContainerStyle={{ height: "100%" }}>
      <Grid style={styles.grid}>
        <Row size={1} style={styles.title}>
          <H2 style={styles.titleText}>Dados do Solicitante</H2>
        </Row>
        <Col size={8} style={styles.info}>
          <Col style={styles.dataPiece}>
            <Text style={styles.label}>Nome Completo:</Text>
            <Text style={styles.data}>João da Silva</Text>
          </Col>
          <Row>
            <Col style={styles.dataPiece}>
              <Text style={styles.label}>Estado:</Text>
              <Text style={styles.data}>SP</Text>
            </Col>
            <Col style={styles.dataPiece}>
              <Text style={styles.label}>Cidade:</Text>
              <Text style={styles.data}>Sorocaba</Text>
            </Col>
          </Row>
          <Col style={styles.dataPiece}>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.data}>16/04/2002</Text>
          </Col>
          <Col style={styles.dataPiece}>
            <Text style={styles.label}>Insumo Solicitado</Text>
            <Text style={styles.data}>[NOME DO INSUMO]</Text>
          </Col>
        </Col>
      </Grid>
    </Content>
  );
}
