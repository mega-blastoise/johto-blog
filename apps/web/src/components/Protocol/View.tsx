import { badgeSprites, sprites } from "@/assets/johto-gbc/sprites";
import copy from "@/content/en.json";

function ProtocolView() {
  return (
    <section className="page-intro page-intro--narrow">
      <p className="eyebrow">{copy.protocol.eyebrow}</p>
      <h1>{copy.protocol.title}</h1>
      <p>{copy.protocol.description}</p>
      <div className="trainer-card">
        <div className="trainer-card__header">
          <p className="trainer-card__title">{copy.protocol.card.title}</p>
          <dl className="trainer-card__identity">
            <div>
              <dt>{copy.protocol.card.idLabel}</dt>
              <dd>{copy.protocol.card.id}</dd>
            </div>
            <div>
              <dt>{copy.protocol.card.nameLabel}</dt>
              <dd>{copy.protocol.card.name}</dd>
            </div>
          </dl>
          <img
            alt=""
            aria-hidden="true"
            className="trainer-card__sprite"
            height={56}
            src={sprites.suicune}
            width={56}
          />
        </div>
        <p className="trainer-card__badges">{copy.protocol.card.badgesLabel}</p>
        <div className="protocol-list">
          {copy.protocol.principles.map((principle, index) => (
            <div key={principle.title}>
              <strong>
                <img
                  alt=""
                  aria-hidden="true"
                  className="protocol-list__badge"
                  height={40}
                  src={badgeSprites[index % badgeSprites.length]}
                  width={40}
                />
                {String(index + 1).padStart(2, "0")}
              </strong>
              <span>
                <b>{principle.title}</b> {principle.description}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="fine-print">{copy.site.disclaimer}</p>
    </section>
  );
}

export default ProtocolView;
