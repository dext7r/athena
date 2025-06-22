import { PageProps } from "fresh";

export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
