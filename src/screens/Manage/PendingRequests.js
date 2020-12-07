import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Body,
  Card,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Button,
  Text,
  Fab
} from "native-base";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function PendingRequests({ navigation }) {

  [requests, setRequests] = useState([]);
  [donations, setDonations] = useState([]);

  const uid = auth().currentUser.uid;

  function updateRequests() {
    setDonations([]);
    setRequests([]);
    firestore()
      .collection("solicitacoes")
      .where('idReceptor', '==', uid)
      .where('situacao', '==', 'contato')
      .get()
      .then(query => {
        setRequests(query.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
          }
        }));
      })
      .catch((e) => console.log(e));
    firestore()
      .collection("solicitacoes")
      .where('idDoador', '==', uid)
      .where('situacao', '==', 'contato')
      .get()
      .then(query => {
        setDonations(query.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
          }
        }));
      }).catch((e) => console.log(e));
  }

  useEffect(() => { updateRequests() }, []);

  function handleOpen(request, userId) {
    navigation.navigate("Informações de Contato", { request, userId });
  };

  const listRequests = requests.map((request) => (
    <TouchableOpacity key={request.id} onPress={() => handleOpen(request, request.idDoador)}>
      <Card
        style={{ backgroundColor: "#3ECA63" }}
        pointerEvents="none"
      >
        <ListItem thumbnail>
          <Left>
            <Icon
              type="FontAwesome5"
              name="user-circle"
              style={{ fontSize: 18 }}
            />
          </Left>
          <Body>
            <Text>Doador :</Text>
            <Text>{request.nomeDoador}</Text>
            <Text note style={{ color: "#254D79" }}>
              Solicitação de {request.nomeEnsumo}
            </Text>
          </Body>
          <Right>
            <Text note>Clique para finalizar </Text>
          </Right>
        </ListItem>
      </Card>
    </TouchableOpacity>
  ));

  const listDonations = donations.map((donation) => (
    <TouchableOpacity key={donation.id} onPress={() => handleOpen(donation, donation.idReceptor)}>
      <Card
        style={{ backgroundColor: "#3ECA63" }}
        pointerEvents="none"
      >
        <ListItem thumbnail>
          <Left>
            <Icon
              type="FontAwesome5"
              name="user-circle"
              style={{ fontSize: 18 }}
            />
          </Left>
          <Body>
            <Text>Receptor :</Text>
            <Text>{donation.nomeReceptor}</Text>
            <Text note style={{ color: "#254D79" }}>
              Solicitação de {donation.nomeEnsumo}
            </Text>
          </Body>
          <Right>
            <Text note>Clique para finalizar </Text>
          </Right>
        </ListItem>
      </Card>
    </TouchableOpacity>
  ));

  return (
    <Content padder contentContainerStyle={{ height: '100%' }}>
      <List padder>
        {listRequests}
      </List>
      <List padder>
        {listDonations}
      </List>
      <Fab
        active={true}
        style={{ backgroundColor: "#254D79" }}
        position="bottomLeft"
        onPress={updateRequests}
      >
        <Icon type="Feather" name="refresh-cw" style={{ color: "#3ECA63" }} />
      </Fab>
    </Content>
  );
}

