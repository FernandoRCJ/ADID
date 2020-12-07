import React, { useState, useEffect } from "react";
import { Button, Content, Form, H1, Input, Item, Text } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function SignUp() {
  const [email, setEmail] = useState("asdasdasd");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [celular, setCelular] = useState("");
  const [nasc, setNasc] = useState("");

  const userCollection = firestore().collection("usuarios");

  useEffect(() => {
    const userSubscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        userCollection
          .doc(user.uid)
          .set({
            email: email,
            nome: nome,
            celular: celular,
            cidade: cidade,
            cpf: cpf,
            uf: estado,
            dataNascimento: nasc,
            transacoes: 0,
            dataEntrada: new Date(),
            doacoes: [],
            ensumos: [],
            recepcoes: [],
          })
          .catch(console.error);
      }
    });
    return userSubscriber;
  }, [email, password, nome, cpf, estado, cidade, celular, nasc]);

  handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Usuário criado e logado");
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
  };

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
                placeholder="Nome Completo"
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="CPF"
                value={cpf}
                onChangeText={(text) => setCpf(text)}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Estado"
                value={estado}
                onChangeText={(text) => setEstado(text)}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Cidade"
                value={cidade}
                onChangeText={(text) => setCidade(text)}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Celular"
                value={celular}
                onChangeText={(text) => setCelular(text)}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Data de nascimento"
                value={nasc}
                onChangeText={(text) => setNasc(text)}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Email"
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
            <Button
              info
              rounded
              title="signUp"
              block
              onPress={this.handleSignUp}
            >
              <Text>Cadastrar</Text>
            </Button>
          </Form>
        </Row>
      </Grid>
    </Content>
  );
}
