import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Body,
  Card,
  Icon,
  Left,
  ListItem,
  Right,
  List,
  Content,
  Text,
  H1,
  Fab,
} from "native-base";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function Itens(props) {
  const [ensumos, setEnsumos] = useState([]);

  const uid = auth().currentUser.uid;

  useEffect(() => {
    updateEnsumos();
  }, []);

  function updateEnsumos() {
    setEnsumos([]);
    firestore()
      .collection("ensumos")
      .where('usuarios', 'array-contains', uid)
      .get()
      .then(query => {
        setEnsumos(query.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
          }
        }));
      }).catch((e) => console.log(e));
  }
  function handleEdit(id, usuarios) {
    const newUsers = usuarios.filter((arr) => arr !== uid);
    const isEmpty = newUsers.length == 0;
    firestore()
      .collection("ensumos")
      .doc(id)
      .update({
        usuarios: newUsers,
        empty: isEmpty,
      })
      .then(() => {
        updateEnsumos();
        alert("Insumo removido com sucesso!");
      }).catch((e) => console.log(e));
  };

  const handleAdd = () => {
    props.navigation.navigate("Cadastrar Insumo");
  };

  const renderItens = ensumos.map((arr) => (
    <TouchableOpacity key={arr.id} onPress={() => handleEdit(arr.id, arr.usuarios)}>
      <Card style={{ backgroundColor: "#3ECA63" }} pointerEvents="none">
        <ListItem thumbnail>
          <Left>
            <Icon type="FontAwesome5" name="pills" style={{ fontSize: 18 }} />
          </Left>
          <Body>
            <Text>{arr.nome}</Text>
            <Text note>{arr.tipo}</Text>
          </Body>
          <Right style={{ alignItems: "flex-end" }}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text note>Clique para remover </Text>
              <Icon
                type="Feather"
                name="delete"
                style={{ fontSize: 18, color: "#254D79" }}
              />
            </View>
          </Right>
        </ListItem>
      </Card>
    </TouchableOpacity>
  ));

  return (
    <Content padder contentContainerStyle={{ height: "100%" }}>
      <List>
        <View style={{ padding: 5 }}>
          <H1
            style={{
              color: "#3ECA63",
              fontWeight: "600",
              backgroundColor: "#254D79",
              padding: 5,
              borderRadius: 15,
              textAlign: "center",
            }}
          >
            Insumos Cadastrados
        </H1>
        </View>
        {renderItens}
      </List>
      <Fab
        active={true}
        style={{ backgroundColor: "#254D79" }}
        position="bottomRight"
        onPress={handleAdd}
      >
        <Icon type="Feather" name="plus" style={{ color: "#3ECA63" }} />
      </Fab>
      <Fab
        active={true}
        style={{ backgroundColor: "#254D79" }}
        position="bottomLeft"
        onPress={updateEnsumos}
      >
        <Icon type="Feather" name="refresh-cw" style={{ color: "#3ECA63" }} />
      </Fab>
    </Content>
  );
}
