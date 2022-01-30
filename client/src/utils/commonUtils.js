export const noop = () => {};

export const getLanguageMUI = (resolvedLanguage, locales) => {
  if (resolvedLanguage) {
    const allKeysMUI = Object.keys(locales);
    for (const key of allKeysMUI) {
      if (key.startsWith(resolvedLanguage)) {
        return locales[key];
      }
    }
  }

  return locales.enUS;
};
