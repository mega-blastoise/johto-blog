import { badgeSprites, sprites } from "@/assets/johto-gbc/sprites";
import copy from "@/content/en.json";

function AboutView() {
  return (
    <section className="page-intro page-intro--narrow">
      <p className="eyebrow">{copy.about.eyebrow}</p>
      <h1>{copy.about.title}</h1>
      <p>{copy.about.description}</p>
      <div className="trainer-card">
        <div className="trainer-card__header">
          <p className="trainer-card__title">{copy.about.card.title}</p>
          <dl className="trainer-card__identity">
            <div>
              <dt>{copy.about.card.idLabel}</dt>
              <dd>{copy.about.card.id}</dd>
            </div>
            <div>
              <dt>{copy.about.card.nameLabel}</dt>
              <dd>{copy.about.card.name}</dd>
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
        <p className="trainer-card__badges">{copy.about.card.badgesLabel}</p>
        <div className="protocol-list">
          {copy.about.principles.map((principle, index) => (
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

export default AboutView;
