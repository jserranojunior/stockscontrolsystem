export function dateUStoJs(value: string): Date | string {
  const validation = value.slice(-3, 1);
  if (value && validation === "-") {
    const date: Date = new Date(value);
    return date;
  } else {
    return value;
  }
}

export function datePtBrToUs(data: string): string | undefined {
  if (data) {
    const dia = data.split("/")[0];
    const mes = data.split("/")[1];
    const ano = data.split("/")[2];

    return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  } else {
    return data;
  }
}
export function dateUsToPtBr(data: string): string | undefined {
  if (data) {
    const dia = data.split("-")[2];
    const mes = data.split("-")[1];
    const ano = data.split("-")[0];

    return ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + ano;
  }
}
