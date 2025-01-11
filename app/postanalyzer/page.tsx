import PostAnalyzer from "../components/PostAnalyzer";


export default function postanalyzer() {
  return (
 <>
      <div className="items-center font-bold justify-center min-h-screen py-10">
        <section className="max-w-3xl mx-auto px-5">
          <p className="text-5xl font-bold text-red-500">Post Analyzer</p>
          <p className="text-xl mt-2 font-bold">
            
          </p>
        </section>
        <section className="max-w-3xl mt-10 mx-auto px-5">
          <PostAnalyzer/>
        </section>
      </div>
    </>
  );
}