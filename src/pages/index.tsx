import Image from "next/image";
import Text from "../components/generals/text";
import Nav from "../components/nav";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useInkathon } from "@scio-labs/use-inkathon";
import { Archivo, Podkova } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { isConnected, disconnect, activeAccount } = useInkathon();
  useEffect(() => {
    isConnected === true ? router.push("/contracts") : router.push("/");
  }, [isConnected]);
  return (
    <main
      className={
        isConnected
          ? `flex flex-col md:flex-row ${archivo.className}`
          : `flex flex-col ${archivo.className}`
      }
    >
      <Nav />
      <div className="w-8/12 mx-auto flex flex-col gap-[40px] mt-[100px]">
        <div className="mx-auto">
          <Text type="h2" text="Please, connect your wallet to continue" />
        </div>
      </div>
    </main>
  );
}
