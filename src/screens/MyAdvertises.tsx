import { useEffect } from "react";
import { VStack } from "native-base";

import { Header } from "@components/Header";

import { api } from "@services/api";

export function MyAdvertises() {

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      console.log(response.data);
    }

    getProducts();
  }, []);

  return (
    <VStack flex={1} safeAreaTop p={6}>
      <Header title="Meus anúncios" showAddButton={true} />

    </VStack>
  );
}
