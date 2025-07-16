import br from "./br";

const data = {
  br,
};

export default function (key, locale = "br") {
  if (!(locale in data)) {
    locale = "br";
  }
  return data[locale][key] || key;
}
