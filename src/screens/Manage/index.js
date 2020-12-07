import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { View } from "react-native";
import { Button, Content, Text } from "native-base";
import auth from '@react-native-firebase/auth';


export default class Sample extends React.Component {
  render() {
    return (
      <Content padder contentContainerStyle={{ width: "100%", height: "100%" }}>
        <Grid
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Row size={1}>
            <Text> </Text>
          </Row>
          <Col
            size={1}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col
              size={1}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Button
                full
                info
                rounded
                title="solicitacao-contato"
                style={{ width: "100%" }}
                onPress={() =>
                  this.props.navigation.navigate("Solicitações de Contato")
                }
              >
                <Text>Solicitações de Contato</Text>
              </Button>
            </Col>
            <Col
              size={1}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Button
                full
                primary
                rounded
                title="solicitacao-historico-doacao"
                style={{ width: "70%" }}
                onPress={() =>
                  this.props.navigation.navigate("Histórico de Doações")
                }
              >
                <Text>Histórico de Doações</Text>
              </Button>
            </Col>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 4,
                height: 25,
              }}
            />
            <Col
              size={1}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Button
                full
                info
                rounded
                title="solicitacao-pendente"
                style={{ width: "100%" }}
                onPress={() =>
                  this.props.navigation.navigate("Solicitações Pendentes")
                }
              >
                <Text>Solicitações Pendentes</Text>
              </Button>
            </Col>
            <Col
              size={1}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Button
                full
                primary
                rounded
                title="solicitacao-historico-recepcao"
                style={{ width: "70%" }}
                onPress={() =>
                  this.props.navigation.navigate("Histórico de Recepções")
                }
              >
                <Text>Histórico de Recepções</Text>
              </Button>
            </Col>
          </Col>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 4,
              height: 60,
            }}
          />
          <Row size={1}>
            <Text> </Text>
            <Button
              full
              warning
              rounded
              title="sair"
              style={{ width: "40%" }}
              onPress={() =>
                auth()
                  .signOut()
                  .then(() => console.log("User signed out!"))
              }
            >
              <Text>Sair</Text>
            </Button>
          </Row>
        </Grid>
      </Content>
    );
  }
}
