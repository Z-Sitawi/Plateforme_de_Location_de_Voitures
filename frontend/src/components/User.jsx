import Navigation from "./Navigation";

export default function User() {
  const navs = [{ title: "test", id: 0 }];
  return (
    <div style={{ position: "relative", minHeight: "100vh" }} className="">
      <Navigation type="user" navs={navs} />
    </div>
  );
}
