import badgeHive from "./badge-hive.png";
import badgePlain from "./badge-plain.png";
import badgeZephyr from "./badge-zephyr.png";
import chikorita from "./chikorita.png";
import cyndaquil from "./cyndaquil.png";
import hoOh from "./ho-oh.png";
import lugia from "./lugia.png";
import pokeBall from "./poke-ball.png";
import suicune from "./suicune.png";
import totodile from "./totodile.png";
import unownA from "./unown-a.png";
import unownE from "./unown-e.png";
import unownI from "./unown-i.png";
import unownL from "./unown-l.png";
import unownM from "./unown-m.png";
import unownO from "./unown-o.png";
import unownP from "./unown-p.png";
import unownR from "./unown-r.png";
import unownS from "./unown-s.png";
import unownT from "./unown-t.png";
import unownZ from "./unown-z.png";

// Bun emits asset paths relative to the chunk that imports them, so resolve
// them here once against this module's URL to get root-stable image sources.
const resolve = (path: string): string => new URL(path, import.meta.url).href;

export const sprites = {
  chikorita: resolve(chikorita),
  cyndaquil: resolve(cyndaquil),
  hoOh: resolve(hoOh),
  lugia: resolve(lugia),
  pokeBall: resolve(pokeBall),
  suicune: resolve(suicune),
  totodile: resolve(totodile),
};

export const starterSprites = [
  sprites.chikorita,
  sprites.cyndaquil,
  sprites.totodile,
];

export const badgeSprites = [
  resolve(badgeZephyr),
  resolve(badgeHive),
  resolve(badgePlain),
];

export const unownGlyphs: Readonly<Record<string, string>> = {
  a: resolve(unownA),
  e: resolve(unownE),
  i: resolve(unownI),
  l: resolve(unownL),
  m: resolve(unownM),
  o: resolve(unownO),
  p: resolve(unownP),
  r: resolve(unownR),
  s: resolve(unownS),
  t: resolve(unownT),
  z: resolve(unownZ),
};
