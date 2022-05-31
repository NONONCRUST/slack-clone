import fs from "fs";
import { UserDataType } from "../../types/user";

export const getUserList = () => {
  const usersBuffer = fs.readFileSync("data/users.json");
  const usersJSON = usersBuffer.toString();
  if (!usersJSON) return [];

  const userList = JSON.parse(usersJSON);

  return userList;
};

export const addUser = (users: UserDataType) => {
  const userList = getUserList();
  const newUserList = [...userList, users];

  fs.writeFileSync("data/users.json", JSON.stringify(newUserList));
};

// email로 유저 불러오기
export const findUser = (email: string) => {
  const userList = getUserList();
  const user = userList.find((user: UserDataType) => user.email === email);

  return user;
};

// email의 유저가 있는지 확인하기
export const userExist = (email: string) => {
  const userList = getUserList();
  return userList.some((user: UserDataType) => user.email === email);
};
