import { UnownWord } from "@/components/UnownWord";
import copy from "@/content/en.json";

function FooterView() {
  return (
    <footer className="site-footer">
      <div>
        <UnownWord word={copy.site.unownWord} />
        <strong>{copy.site.footerTitle}</strong>
        <span>{copy.site.footerTagline}</span>
      </div>
      <p>{copy.site.disclaimer}</p>
    </footer>
  );
}

export default FooterView;
