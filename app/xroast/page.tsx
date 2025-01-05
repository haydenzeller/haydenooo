import Roaster from "../components/Roaster";

export default function XRoast() {
  return (
    <>
      <div className="items-center font-bold justify-center min-h-screen py-10">
        <section className="max-w-3xl mx-auto px-5">
          <p className="text-5xl font-bold text-red-500">XRoast</p>
          <p className="text-xl mt-2 font-bold">
            Have your X (the everything app) profile analyzed and roasted by an
            all powerful AI.
          </p>
        </section>
        <section className="max-w-3xl mt-10 mx-auto px-5">
          <Roaster />
        </section>
      </div>
    </>
  );
}
