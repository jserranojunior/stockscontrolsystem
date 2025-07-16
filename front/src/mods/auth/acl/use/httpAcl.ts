import ClassUseApiConnect from "../../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

function checkStateToken(token: any) {
  if (
    !token ||
    token == "" ||
    token == undefined ||
    token == "undefined" ||
    token == "null" ||
    token == null ||
    token.length == 0
  ) {
    return false;
  } else {
    return true;
  }
}

export const httpAcl = () => {
  async function getUserAcl() {
    const token = localStorage.getItem("token");

    if (checkStateToken(token)) {
      return ApiConnect.get("checkniveldeacesso")
        .then((response: any) => {
          let aclRotas = [] as any;
          if (response.data == 0) {
            aclRotas = {
              data: [
                {
                  ID: 0,
                  Name: "Public",
                  Routes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 19],
                },
              ],
            };
          } else if (response.data == 1) {
            aclRotas = {
              data: [
                {
                  ID: 1,
                  Name: "Logged",
                  Routes: [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 19, 75, 38, 11, 3, 96,
                    104,
                  ],
                },
              ],
            };
          } else if (response.data == 2) {
            aclRotas = {
              data: [
                {
                  ID: 2,
                  Name: "Administrador",
                  Routes: [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
                    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
                    62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
                    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91,
                    92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
                    105, 106, 107, 108, 109.11, 111, 112,
                  ],
                },
              ],
            };
          }

          return aclRotas;
        })
        .catch((err) => {
          localStorage.setItem("token", "");
          console.error(err);
        });
    } else {
      let aclRotas = [] as any;
      aclRotas = {
        data: [
          {
            ID: 0,
            Name: "Public",
            Routes: [0, 1, 2],
          },
        ],
      };

      return aclRotas;
    }
  }
  return { getUserAcl };
};
