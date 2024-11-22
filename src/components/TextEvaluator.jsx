import React, { useState, useEffect } from "react";

const TextEvaluator = () => {
  const [text, setText] = useState("");
  const [word, setWord] = useState("");
  const [occurrences, setOccurrences] = useState(0);
  const [mirror, setMirror] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleWordBlur = () => {
    if (word.trim() !== "") {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      const matches = text.match(regex);
      setOccurrences(matches ? matches.length : 0);
    }
  };

  const updateMirror = (reverse = false) => {
    const mirroredText = reverse ? text.split("").reverse().join("") : text;
    setMirror(mirroredText);
    const now = new Date();
    setTimestamp(
      `${String(now.getDate()).padStart(2, "0")}/${String(
        now.getMonth() + 1
      ).padStart(2, "0")}/${now.getFullYear()} ${String(now.getHours()).padStart(
        2,
        "0"
      )}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}`
    );
  };

  useEffect(() => {
    if (text) updateMirror();
  }, [text]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Avaliação de Textos</h1>
      <div className="card p-4 shadow-lg">
        <div className="mb-3">
          <label htmlFor="text-input" className="form-label">
            Texto:
          </label>
          <textarea
            id="text-input"
            className="form-control"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite ou cole o texto aqui"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="word-input" className="form-label">
            Palavra a ser encontrada:
          </label>
          <input
            id="word-input"
            type="text"
            className="form-control"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onBlur={handleWordBlur}
            placeholder="Digite a palavra"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Ocorrências da palavra:{" "}
            <span className="badge bg-primary">{occurrences}</span>
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Espelho do texto:</label>
          <div className="alert alert-secondary">{mirror || "Nenhum texto"}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Última atualização:</label>
          <div className="alert alert-info">{timestamp || "Nenhuma"}</div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => updateMirror(true)}
        >
          Gerar Espelho (Reverso)
        </button>
      </div>
    </div>
  );
};

export default TextEvaluator;
