import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";

interface Props {
  scrollX: Animated.Value;
}

const imagenes = [
  "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2425&q=80",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
  "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80",
  "https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
];

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

const BackDrop = ({ scrollX }: Props) => {
  return (
    <View
      style={[
        { height: ALTURA_BACKDROP, width, position: "absolute", top: 0 },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];

        const outputRange = [0, 1, 0];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange,
        });

        return (
          <Animated.Image
            blurRadius={7}
            source={{ uri: imagen }}
            style={{
              height: ALTURA_BACKDROP,
              width,
              position: "absolute",
              top: 0,
              opacity,
            }}
            key={index}
          />
        );
      })}

      <LinearGradient
        colors={["transparent", "white"]}
        style={{ height: ALTURA_BACKDROP, width, position: "absolute", top: 0 }}
      />
    </View>
  );
};

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        data={imagenes}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: ESPACIO_CONTENEDOR,
        }}
        decelerationRate={0}
        snapToInterval={ANCHO_CONTENEDOR}
        scrollEventThrottle={16}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ANCHO_CONTENEDOR,
            index * ANCHO_CONTENEDOR,
            (index + 1) * ANCHO_CONTENEDOR,
          ];

          const outputRange = [0, -50, 0];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange,
          });

          return (
            <View style={{ width: ANCHO_CONTENEDOR }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: 4,
                  borderRadius: 30,
                  backgroundColor: "white",
                  alignItems: "center",
                  transform: [{ translateY }],
                }}
              >
                <Image source={{ uri: item }} style={styles.posterImage} />
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  posterImage: {
    width: "100%",
    height: ANCHO_CONTENEDOR * 1.2,
    resizeMode: "cover",
    borderRadius: 26,
    margin: 0,
    marginBottom: 10,
  },
});
