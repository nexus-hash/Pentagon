export default async function verifyToken() {
  if (!localStorage.getItem("token")) {
    return false;
  }
  var authtoken = localStorage.getItem("token");
  await fetch(process.env.REACT_APP_API + "auth/verifytoken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: authtoken,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (
        data.message === "Token is not valid" ||
        data.message === "Internal server error"
      ) {
        return false;
      }else if(data.message === "Token is valid"){
        return true;
      }
    })
    .catch((err) => {
      return false;
    });
    return true;
}