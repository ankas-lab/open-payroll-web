import Image from "next/image";

import Text from "../components/generals/text";
import Button from "../components/generals/button";
import Nav from "../components/nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <Text type="h1" text="Text" />
      <Text type="h2" text="Text" />
      <Text type="h3" text="Text" />
      <Text type="h4" text="Text" />
      <Text type="h5" text="Text" />
      <Text type="h6" text="Text" />
      <Text type="overline" text="Text" />
      <Text type="caption" text="Text" />
      <Text type="caption" text="Text" />
      <Button type="active" text="button" icon="" />
      <Button type="disabled" text="button" icon="" />
      <Button type="outlined" text="button" icon="" />
      <Button type="text" text="button" icon="" />
      <Button type="danger" text="button" icon="" />
    </main>
  );
}
