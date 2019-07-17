let loader: Craft.ElementThumbLoader | null = null;

export default function getThumbLoader(): Craft.ElementThumbLoader {
  if (loader === null) {
    loader = new Craft.ElementThumbLoader();
  }

  return loader;
}
