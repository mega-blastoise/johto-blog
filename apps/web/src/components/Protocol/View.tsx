import copy from "@/content/en.json";

function ProtocolView() {
  return (
    <section className="page-intro page-intro--narrow">
      <p className="eyebrow">{copy.protocol.eyebrow}</p>
      <h1>{copy.protocol.title}</h1>
      <p>{copy.protocol.description}</p>
      <div className="protocol-list">
        {copy.protocol.principles.map((principle, index) => (
          <div key={principle.title}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span>
              <b>{principle.title}</b> {principle.description}
            </span>
          </div>
        ))}
      </div>
      <p className="fine-print">{copy.site.disclaimer}</p>
    </section>
  );
}

export default ProtocolView;
