import Footer from "@/shared/components/footer";
import Header from "@/shared/components/header";
import Hero from "./components/hero/hero";
import Products from "./components/products/products";

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <Hero />
        <Products />
      </main>
      <Footer />
    </>
  );
}
