// import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="items-center justify-center h-screen w-screen py-10">
      <section className="max-w-3xl mx-auto px-5">
        <p className="text-5xl font-bold">Hayden.</p>
        <p className="text-xl mt-2 font-bold">
          Computer science student from{" "}
          <span className=" text-red-500">Canada</span>.
        </p>
        {/* <div className="flex flex-row mt-1 gap-5">
          <Link
            href="https://x.com/haydendevs"
            className="link hover:text-red-500 text-xl font-bold"
          >
            X
          </Link>
        </div> */}
      </section>
      <section className="max-w-3xl mx-auto px-5 mt-5"></section>
      <Footer />
    </div>
  );
}
