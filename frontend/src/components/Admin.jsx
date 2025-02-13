import Navigation from "./Navigation";

export default function Admin() {
  return (
    <div
      style={{ position: "relative", minHeight: "100vh" }}
      className="py-3 px-2"
    >
      <Navigation type="admin" />
    </div>
  );
}
