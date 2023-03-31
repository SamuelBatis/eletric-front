import Header from "@/components/Header";
import api from "@/services/api";
import { useEffect } from "react";

export default function Dashboard() {
  let data;
  async function getData() {
    data = await api.get("/conta-luz")
    return data
  }
  useEffect(() => {
    const response = async () => await getData()
    console.log(response.data)
  }, [])
  return (
    <>
      <h1>Dashboard</h1>;
    </>
  );
}
