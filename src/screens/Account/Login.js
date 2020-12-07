import React, { useState } from "react";
import { Content, Form, Item, Input, H1, Button, Text } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import auth from "@react-native-firebase/auth";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Usuário logado");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("Email já cadastrado");
        }

        if (error.code === "auth/invalid-email") {
          alert("Endereço de Email inválido");
        }
        alert(error);
      });
  }

  return (
    <Content
      padder={true}
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Grid style={{ width: "80%" }}>
        <Row style={{ justifyContent: "center", alignItems: "flex-end" }}>
          <H1>ADID</H1>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Form
            style={{
              alignItems: "stretch",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Item rounded>
              <Input
                placeholder="Usuário"
                textContentType="username"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Senha"
                textContentType="password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </Item>
          </Form>
        </Row>
        <Col style={{ alignItems: "center" }}>
          <Row size={1}>
            <Button primary rounded title="login" onPress={handleLogin}>
              <Text>Entrar</Text>
            </Button>
          </Row>
          <Row size={1}>
            <Button
              full
              info
              rounded
              title="login"
              onPress={() => props.navigation.navigate("Cadastro")}
            >
              <Text>Criar Conta</Text>
            </Button>
          </Row>
          <Row>
            <Text> </Text>
          </Row>
        </Col>
      </Grid>
    </Content>
  );
}
