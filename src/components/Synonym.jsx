import React, { useState } from "react";

function Typing() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Tracks if a search has been made

  function setSynonymsLoading(data) {
    setSynonyms(data); // Update synonyms state
    setLoading(false);
    setHasSearched(true);
  }

  function fetchSynonyms(word) {
    setLoading(true); // Set loading to true before fetching
    fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then((response) => response.json())
      .then((data) => setSynonymsLoading(data))
      .catch(() => setLoading(false));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchSynonyms(word);
  }

  function handleSynonymClicked(newWord) {
    setWord(newWord);
    fetchSynonyms(newWord);
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-stone-950 to-stone-900">
      <h1 className="mt-8 text-4xl font-bold tracking-wide text-center text-stone-400">
        Synonym Finder
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center flex-grow px-4 space-y-6">
        <label
          htmlFor="Words"
          className="text-2xl font-semibold text-stone-300">
          Words
        </label>
        <input
          onChange={(e) => setWord(e.target.value)}
          value={word}
          id="Words"
          type="text"
          className="w-full max-w-md p-3 text-lg transition-all border rounded-lg bg-stone-800 text-stone-100 border-stone-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a word..."
        />
        <button
          className="px-8 py-3 text-lg font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit">
          Submit
        </button>
      </form>
      <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4 lg:grid-cols-5">
        {!loading &&
          hasSearched &&
          synonyms.length > 0 &&
          synonyms.map((synonym) => (
            <button
              key={synonym.word}
              onClick={() => handleSynonymClicked(synonym.word)}
              className="p-3 text-sm font-medium transition-colors border rounded-lg text-stone-200 bg-stone-800 hover:bg-stone-700 border-stone-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {synonym.word}
            </button>
          ))}
        {!loading && hasSearched && synonyms.length === 0 && (
          <p className="text-lg text-center col-span-full text-stone-400">
            No synonyms found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Typing;
