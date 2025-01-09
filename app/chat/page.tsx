import HaydenLLM from "@/app/components/HaydenLLM"
export default function Chat() {
  return (
    <>
      <div className="items-center font-bold justify-center min-h-screen py-10">
        <section className="max-w-3xl mx-auto px-5">
          <p className="text-5xl font-bold text-red-500">Chat with HaydenLLM</p>
        </section>
        <section className="max-w-3xl mt-10 mx-auto px-5">
          <HaydenLLM />
        </section>
      </div>
    </>
  );
}

