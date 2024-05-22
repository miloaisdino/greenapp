import Header from "../component/header";

export default function withAuthLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
