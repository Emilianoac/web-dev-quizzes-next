import jwt from "jsonwebtoken";

const secret = process.env.SECRET_JWT_FAVORITES ?? "";

function createJWT(data: string) {
  try {
    return jwt.sign(data, secret)
  } catch(e) {
    console.log(e);
  }
}

function checkJWT(jwtData: string) {
  try {
    return jwt.verify(jwtData, secret);
  } catch(e) {
    console.log(e);
  }
}

function decodeJWT(jwtData: string) {
  try {
    return jwt.decode(jwtData);
  } catch(e) {
    console.log(e);
  }
}

export { createJWT, checkJWT, decodeJWT };