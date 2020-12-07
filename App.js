// In App.js in a new project

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from "./src/screens/HomeScreen";
import Profile from "./src/screens/Account/Profile";
import AddItem from "./src/screens/Give/AddItem";
import Login from "./src/screens/Account/Login";
import SignUp from "./src/screens/Account/SignUp";
import Itens from "./src/screens/Give/Itens";
import SearchItem from "./src/screens/Get/SearchItem";
import RequestItem from "./src/screens/Get/RequestItem";
import PendingRequests from "./src/screens/Manage/PendingRequests";
import RequestingUserData from "./src/screens/Manage/UserData/RequestingUserData";
import RequestReceptionHistory from "./src/screens/Manage/RequestReceptionHistory";
import RequestDonationHistory from "./src/screens/Manage/RequestDonationHistory";
import PastUserData from "./src/screens/Manage/UserData/PastUserData";
import ContactUserData from "./src/screens/Manage/UserData/ContactUserData";
import Requests from "./src/screens/Manage/Requests";
import ManageHome from "./src/screens/Manage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import auth from "@react-native-firebase/auth";

import getTheme from "./native-base-theme/components";
import appColors from "./native-base-theme/variables/appColors";
import { StyleProvider, Container } from "native-base";
import commonColor from "./native-base-theme/variables/commonColor";
import GetItem from "./src/screens/Get/GetItem";

const headerStyle = {
  headerStyle: {
    backgroundColor: "#254D79",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const SignInStack = createStackNavigator();

function SignIn() {
  return (
    <SignInStack.Navigator screenOptions={headerStyle}>
      <SignInStack.Screen name="Login" component={Login} />
      <SignInStack.Screen name="Cadastro" component={SignUp} />
    </SignInStack.Navigator>
  );
}

const GetStack = createStackNavigator();

function Get() {
  return (
    <GetStack.Navigator screenOptions={headerStyle}>
      <GetStack.Screen name="Selecionar Insumo" component={GetItem} />
      <GetStack.Screen name="Selecionar Doador" component={SearchItem} />
      <GetStack.Screen name="Realizar Pedido" component={RequestItem} />
    </GetStack.Navigator>
  );
}

const GiveStack = createStackNavigator();

function Give() {
  return (
    <GiveStack.Navigator screenOptions={headerStyle}>
      <GiveStack.Screen name="Minhas Doações - Inventário" component={Itens} />
      <GiveStack.Screen name="Cadastrar Insumo" component={AddItem} />
    </GiveStack.Navigator>
  );
}

const PendingStack = createStackNavigator();

function Request() {
  return (
    <PendingStack.Navigator screenOptions={headerStyle} headerMode={"none"}>
      <PendingStack.Screen
        name="Solicitações de Contato"
        component={Requests}
      />
      <PendingStack.Screen
        name="Aceitar Solicitação"
        component={RequestingUserData}
      />
    </PendingStack.Navigator>
  );
}

const PendingRequestStack = createStackNavigator();

function PendingRequest() {
  return (
    <PendingRequestStack.Navigator
      screenOptions={headerStyle}
      headerMode={"none"}
    >
      <PendingRequestStack.Screen
        name="Solicitações Pendentes"
        component={PendingRequests}
      />
      <PendingRequestStack.Screen
        name="Informações de Contato"
        component={ContactUserData}
      />
    </PendingRequestStack.Navigator>
  );
}

const HistoryStack = createStackNavigator();

function ReceptionHistory() {
  return (
    <HistoryStack.Navigator screenOptions={headerStyle} headerMode={"none"}>
      <HistoryStack.Screen
        name="Histórico de Recepções"
        component={RequestReceptionHistory}
      />
      <HistoryStack.Screen
        name="Informações do Usuário"
        component={PastUserData}
      />
    </HistoryStack.Navigator>
  );
}
function DonationHistory() {
  return (
    <HistoryStack.Navigator screenOptions={headerStyle} headerMode={"none"}>
      <HistoryStack.Screen
        name="Histórico de Doações"
        component={RequestDonationHistory}
      />
      <HistoryStack.Screen
        name="Informações do Usuário"
        component={PastUserData}
      />
    </HistoryStack.Navigator>
  );
}

const ManageStack = createStackNavigator();

function Manage() {
  return (
    <ManageStack.Navigator screenOptions={headerStyle}>
      <ManageStack.Screen name="Solicitações" component={ManageHome} />
      <ManageStack.Screen name="Solicitações de Contato" component={Request} />
      <ManageStack.Screen
        name="Solicitações Pendentes"
        component={PendingRequest}
      />
      <ManageStack.Screen
        headerShown={false}
        name="Histórico de Recepções"
        component={ReceptionHistory}
      />
      <ManageStack.Screen
        headerShown={false}
        name="Histórico de Doações"
        component={DonationHistory}
      />
      <ManageStack.Screen name="REMOVER" component={SignIn} />
    </ManageStack.Navigator>
  );
}

const TabNavigator = createBottomTabNavigator();

function Tab() {
  return (
    <TabNavigator.Navigator
      name="Tab"
      tabBarOptions={{
        activeTintColor: "#fff",
        activeBackgroundColor: "#254D79",
        inactiveTintColor: "#254D79",
        inactiveBackgroundColor: "#E2E2E2",
        showIcon: "false",
      }}
    >
      <TabNavigator.Screen name="Procurar Doação" component={Get} />
      <TabNavigator.Screen name="Minhas Doações" component={Give} />
      <TabNavigator.Screen name="Solicitações" component={Manage} />
    </TabNavigator.Navigator>
  );
}

const AppStack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <NavigationContainer>
            <AppStack.Navigator headerMode={"none"}>
              <AppStack.Screen name="SignIn" component={SignIn} />
            </AppStack.Navigator>
          </NavigationContainer>
        </Container>
      </StyleProvider>
    );
  }

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container>
        <NavigationContainer>
          <AppStack.Navigator headerMode={"none"}>
            <AppStack.Screen name="Tab" component={Tab} />
          </AppStack.Navigator>
        </NavigationContainer>
      </Container>
    </StyleProvider>
  );
}

export default App;
