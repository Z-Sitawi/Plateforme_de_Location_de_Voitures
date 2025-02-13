import Navigation from "./Navigation";

export default function User() {
  return (
    <div
      style={{ position: "relative", minHeight: "100vh" }}
      className="py-3 px-2"
    >
      <Navigation type="user" />
    </div>
  );
}
