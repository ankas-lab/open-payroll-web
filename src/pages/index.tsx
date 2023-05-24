import { useRouter } from "next/router";
import Text from "../components/generals/text";
import Nav from "../components/nav";
import { Archivo } from "next/font/google";
import { useWallet } from "useink";
import { useEffect } from "react";
const archivo = Archivo({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { account } = useWallet();
  useEffect(() => {
    account ? router.push("/contracts") : router.push("/");
  }, [account]);
  return (
    <main
      className={
        account
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
