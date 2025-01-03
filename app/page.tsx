import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <section className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Image
          src="/hayden.jpg"
          alt="ProfilePicture"
          width={200}
          height={200}
          className="mb-8 rounded-full"
        />
        <h1>Hayden.</h1>
      </section>
    </div>
  );
}
