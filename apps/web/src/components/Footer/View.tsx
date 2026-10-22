import { EnergySymbol, energyTypes } from "@/components/EnergySymbol";
import copy from "@/content/en.json";

function FooterView() {
  return (
    <footer className="site-footer">
      <div className="site-footer__slate">
        <strong>{copy.site.footerTitle}</strong>
        <span>{copy.site.footerTagline}</span>
      </div>
      <div className="site-footer__energy" aria-hidden="true">
        {energyTypes.map((type) => (
          <EnergySymbol key={type} type={type} />
        ))}
      </div>
      <p>{copy.site.disclaimer}</p>
    </footer>
  );
}

export default FooterView;
