import copy from "@/content/en.json";

function Loader() {
  return (
    <div className="query-loader" role="status">
      <span className="query-loader__signal" aria-hidden="true" />
      <span>{copy.common.loading}</span>
    </div>
  );
}

export default Loader;
